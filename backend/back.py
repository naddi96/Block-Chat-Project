from flask import Flask,request ,make_response
import json
import random
from datetime import datetime, time
app = Flask(__name__)
import string
from web3 import Web3
from hexbytes import HexBytes

login_session={}
pre_login={"0x45b73Aec479f33324f2529d6DbAAbe5b51f08973":"Some dataa"}
w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545')) 

f = open('../smartcontract/build/contracts/NFT_MODEL.json')
nft_model = json.load(f)
abi = nft_model["abi"]






def randString(length):
    return ''.join(random.choices(string.letters, k=length))




def check_vincoli(id_nft,nft_contract,address,scrittura):

    contract = Web3.eth.contract(abi=abi, address=nft_contract)
    owner = contract.functions.ownerOf(id_nft)

    mex_list = getmex_db()

    minuti_blocco = contract.functions.getMinutiBlocco()
    limite_messaggi = contract.functions.getLimiteMex()
    tempo_validita =  contract.functions.getTempoValidita()   
    timestamp_creation = contract.functions.getTimestampCreation()

    now = datetime.now()
    timestamp = datetime.timestamp(now)
    if mex_list[-1]["string"]+minuti_blocco*60 < timestamp:
        return False
    
    if tempo_validita+timestamp_creation < timestamp:
        return False
    
    if scrittura:
        if len(mex_list) >= limite_messaggi:
            return False
    
    return True
    
def save_mex_db(mex,id_nft,nft_contract,address):
    try:
        db=json.load(open("db.json","r"))
        if nft_contract in db:
            if id_nft in db[nft_contract]:
                db[nft_contract][id_nft].append({
                                    "sender":address,
                                    "mex":mex})
            else:
                db[nft_contract][id_nft]={
                                    "sender":address,
                                    "mex":mex}
        else:
            db[nft_contract]={id_nft:{
                                    "sender":address,
                                    "mex":mex} }
        stri=json.dumps(db)
        open("db.json","w").write(stri)
        return True
    except:
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
@app.route('/prelogin',methods=["GET"])
def rando():
    addres = request.args.get('address')
    rand=randString(30)
    pre_login[addres]=rand
    return rand




'''
nel body della richiesta (request.data) c'è:
{"address":"0x...","signed_string":"....","rand_tring":"..."}
'''
@app.route('/login',methods=["POST"])
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
        return resp

    return "loggin error"    



'''
nel body della richiesta (request.data) c'è:
{"mex":"blabla","address":"0x000","id_nft:"3","nft_contract":"0x000"}
'''
@app.route('/sendmex',methods=["POST"])
def receive_mex():
    try:
        data=json.loads(request.data)
        id_nft=data['id_nft']
        mex=data['mex']
        address=data['address']
        nft_contract=data['nft_contract']
        cookie = request.cookies.get('login')
        
        if is_logged(address,cookie):
            if(check_vincoli(id_nft,nft_contract,address,True)):
                save_mex_db(mex,id_nft,nft_contract,address)
                return "message saved"
        return "vincoli non soddisfatti"
        #print(j)
        #richiesta=dict(request.body)
    except:
        return "richiesta mal formata"




'''
nel body della richiesta (request.data) c'è:
{"address":"0x000","id_nft:"3","nft_contract":"0x000"}
'''
@app.route('/getmex',methods=["POST"])
def get_mex():
    data=json.loads(request.data)
    id_nft=data['id_nft']
    address=data['address']
    nft_contract=data['nft_contract']
    cookie = request.cookies.get('login')
    if is_logged(address,cookie):
        if(check_vincoli(id_nft,nft_contract,address,False)):
            return getmex_db(address,id_nft,nft_contract)
    return "not logged"
        




if __name__ == '__main__':
    #app.run()
    print("ss")
    x=check_signed("0x45b73Aec479f33324f2529d6DbAAbe5b51f08973","0x1d6cdd4f43f78cd4bf07772778028353bd38a9409c2617ddae500646dc03bb155ad09830db03ced2539da6630531c4b3d9214b24e486604d35ce5d141c686a611b","Some dataa")
    print(x)
    save_mex_db("bla bla","id","contractAddress","indirizzoprova")
    
    print(getmex_db("id","contractAddress"))
    print(check_signed("","",""))