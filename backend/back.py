from flask import Flask,request ,make_response
import json
import random
from datetime import datetime, time

import string
from web3 import Web3
from hexbytes import HexBytes
from datetime import datetime
from flask_cors import CORS, cross_origin

    
info = {"nome_modello" : 0,
        "last_id" : 1,
        "pub_key_creatore": 2,
        "minuti_blocco": 3,
        "limite_messaggi": 4,
        "limite_mint": 5,
        "costo": 6,
        "tempo_validita": 7, 
        "timestamp_creation": 8
        }




config={}
with open("config.json", "r") as read_file:
    config = json.load(read_file)

app = Flask(__name__)

if config['useCorse']:
    CORS(app, origins=[config["pubblic_frontend_endpoint"]], headers=['Content-Type'], expose_headers=['Access-Control-Allow-Origin'], supports_credentials=True)


login_session={}
pre_login={"0x45b73Aec479f33324f2529d6DbAAbe5b51f08973":"Some dataa"}
w3 = Web3(Web3.HTTPProvider(config["blockchain_endpoint"])) 
f = open('../smartcontract/build/contracts/NFT_MODEL.json')
nft_model = json.load(f)
abi = nft_model["abi"]


def randString(length):
    return ''.join(random.choices(string.ascii_letters, k=length))



def get_mex_buyer(creatore,mex_list):
    li=[]
    for mex in mex_list:
        if mex["sender"]!=creatore:
            li.append(mex)
    return li

def check_vincoli_sendmex_getmex(id_nft,nft_contract,cookie,scrittura):
    contract = w3.eth.contract(abi=abi, address=nft_contract)    
    info_tupla = contract.functions.getNftInfo().call()
    owner = contract.functions.ownerOf(int(id_nft)).call()
    creatore = info_tupla[info["pub_key_creatore"]]

    # print(mex_list)
    minuti_blocco = info_tupla[info["minuti_blocco"]]
    limite_messaggi = info_tupla[info["limite_messaggi"]]
    tempo_validita =  info_tupla[info["tempo_validita"]]
    timestamp_creation = info_tupla[info["timestamp_creation"]]
    #print(minuti_blocco,limite_messaggi,tempo_validita,timestamp_creation)
    now = datetime.now()
    timestamp = datetime.timestamp(now)
    if scrittura:
           
        if tempo_validita+timestamp_creation < timestamp:
            return "nfst scaduto non si può più inviare messaggi"

        if creatore == login_session[cookie]:
            return True
        
        mex_list = getmex_db(id_nft,nft_contract)
        mex_list= get_mex_buyer( creatore,mex_list)
        if len(mex_list)>0:
            if mex_list[-1]["timestamp"]+minuti_blocco*60 > timestamp and minuti_blocco != 0:
                return "messaggio bloccato per vincolo su minuti blocco"
        
        if len(mex_list) >= limite_messaggi and limite_messaggi != 0:
            return "limite messaggi raggiunto non puoi più inviare messaggi"
        

    if owner == login_session[cookie]:
        return True
    if creatore == login_session[cookie]:
        return True
    return "non sei l'owner o il creatore di questo nft"


def save_mex_db(mex,id_nft,nft_contract,address):
    try:
        now = datetime.now()
        timestamp = datetime.timestamp(now)

        db=json.load(open("db.json","r"))
        if nft_contract in db:
            if id_nft in db[nft_contract]:
                db[nft_contract][id_nft].append({
                                    "sender":address,
                                    "mex":mex,
                                    "timestamp":timestamp
                                    })
            else:
                db[nft_contract][id_nft]=[{
                                    "sender":address,
                                    "mex":mex,
                                    "timestamp":timestamp}]
        else:
            db[nft_contract]={id_nft:[{
                                    "sender":address,
                                    "mex":mex,
                                    "timestamp":timestamp}] }
        stri=json.dumps(db)
        open("db.json","w").write(stri)
        return True
    except:
        return False



def is_creatore(address,nft):
    contract = w3.eth.contract(abi=abi, address=nft)
    
    info_tupla = contract.functions.getNftInfo().call()
     
    creatore = info_tupla[info["pub_key_creatore"]]
    if address == creatore:
        return True
    return False


def is_logged(address,cookie):
    if cookie in login_session:
        if address == login_session[cookie]:
            return True
    return False


def check_signed(address,signed_string,mex):
    try:
        hashmex=Web3.sha3(text=mex)
        if(pre_login[address] != mex):
            return False

        signingAddress = w3.eth.account.recoverHash(hashmex, signature=signed_string)

        if signingAddress == address:
            return True
        return False
    except:
        return False


'''
load mex from db return  mex list
to do
'''


def getmex_db(id_nft,nft_contract):
    db=json.load(open("db.json","r"))
    try:
        return db[nft_contract][id_nft]
    except:
        return []



'''
/prelogin?address=0xfsfs...
'''
@app.route('/api/prelogin',methods=["GET"])
def rando():
    addres = request.args.get('address')
    rand=randString(30)
    pre_login[addres]=rand
    return rand



@app.route('/api/upload_img', methods=['POST'])
def upload_file():
    if "image" in request.files and 'nft' in request.form and 'account' in request.form:
        file1 = request.files['image']
        if  file1.filename[-4:] in [".png"]:
            cookie = request.cookies.get('login')
            address=request.form['account']
            if is_logged(address,cookie):
                if  is_creatore(address,request.form['nft']) :
                    
                    
                    path = "./static/img/"+request.form['nft'] +".png"
                    file1.save(path)
                    print(path)
                    return 'ok'
                return "non sei il creatore di questo nft"
            return "non sei loggato"
    return "richiesta malformata o file non valido"




'''
nel body della richiesta (request.data) c'è:
{"address":"0x...","signed_string":"....","rand_tring":"..."}
'''
@app.route('/api/login',methods=["POST"])
def login():
    data=json.loads(request.data)
    address=data['address']
    signed_string=data['signed_string']
    rand_string=data['rand_string']
    
    if(check_signed(address,signed_string,rand_string)):
        cookie=randString(100)
        resp = make_response("login completato")
        resp.set_cookie('login', cookie)
        login_session[cookie]=address
        del pre_login[address]
        return resp

    return "loggin error"    



'''
nel body della richiesta (request.data) c'è:
{"mex":"blabla","address":"0x000","id_nft:"3","nft_contract":"0x000"}
'''
@app.route('/api/sendmex',methods=["POST"])
def receive_mex():
    #try:
        data=json.loads(request.data)
        id_nft=data['id_nft']
        mex=data['mex']
        address=data['address']
        nft_contract=data['nft_contract']
        cookie = request.cookies.get('login')
        if is_logged(address,cookie):
            result_vincoli=check_vincoli_sendmex_getmex(id_nft,nft_contract,cookie,True)
            if(result_vincoli==True):
                save_mex_db(mex,id_nft,nft_contract,address)
                return "message saved"
        return result_vincoli
        #print(j)
        #richiesta=dict(request.body)
    #except  Exception as e:
#        print(e)
 #       return "richiesta mal formata"




'''
nel body della richiesta (request.data) c'è:
{"address":"0x000","id_nft:"3","nft_contract":"0x000"}
'''
@app.route('/api/getmex',methods=["POST"])
def get_mex():
    data=json.loads(request.data)
    id_nft=data['id_nft']
    address=data['address']
    nft_contract=data['nft_contract']
    cookie = request.cookies.get('login')
    if is_logged(address,cookie):
        result_vincoli=check_vincoli_sendmex_getmex(id_nft,nft_contract,cookie,False)

        if(result_vincoli==True):
            return json.dumps (getmex_db(id_nft,nft_contract))
    return "not logged"
        

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
   # check_vincoli("",)
    
    #print("ss")
   # x=check_signed("0x45b73Aec479f33324f2529d6DbAAbe5b51f08973","0x1d6cdd4f43f78cd4bf07772778028353bd38a9409c2617ddae500646dc03bb155ad09830db03ced2539da6630531c4b3d9214b24e486604d35ce5d141c686a611b","Some dataa")
    #save_mex_db("bla bla","id","contractAddress","indirizzoprova")
    
    #print(check_vincoli(1,"0xfE3Ed8a70822f3768C3002679F4Bea430e02b5fe","0xf472a171dc35fD30a2462dD5CDCF5F39b26dc390",False))

