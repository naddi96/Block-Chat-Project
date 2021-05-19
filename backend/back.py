from flask import Flask,request ,make_response
import json
import random
app = Flask(__name__)
import string
from web3 import Web3
from hexbytes import HexBytes

login_session={}
pre_login={"0x45b73Aec479f33324f2529d6DbAAbe5b51f08973":"Some dataa"}
w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))  

def randString(length):
    return ''.join(random.choices(string.letters, k=length))




def check_vincoli(id_nft,nft_contrat,address):
    pass
    '''
    to do: return true se i vcoli nella blockchain sono soddisfatti 
    '''

def save_mex_db(mex,id_nft,nft_contract,address):
    #to do
    pass



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


def getmex_db(address,id_nft,nft_contract):
    pass




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
            if(check_vincoli(id_nft,nft_contract,address)):
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
        #if(check_vincoli(id_nft,nft_contract,address)):
        return getmex_db(address,id_nft,nft_contract)
    return "not logged"
        




if __name__ == '__main__':
    #app.run()
    print("ss")
    x=check_signed("0x45b73Aec479f33324f2529d6DbAAbe5b51f08973","0x1d6cdd4f43f78cd4bf07772778028353bd38a9409c2617ddae500646dc03bb155ad09830db03ced2539da6630531c4b3d9214b24e486604d35ce5d141c686a611b","Some dataa")
    print(x)
    
    print(check_signed("","",""))