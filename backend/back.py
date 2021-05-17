from flask import Flask,request ,make_response

import json
import random
app = Flask(__name__)
import string

login_session={}
pre_login={}

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



'''
/prelogin?address=0xfsfs...
'''
@app.route('/prelogin',methods=["GET"])
def rando():
    addres = request.args.get('address')
    rand=randString(30)
    pre_login[addres]=rand
    return rand



def is_logged(address,cookie):
    if cookie in login_session:
        if address == login_session[cookie]:
            return True
    return False


def check_signed(address,signed_string):
    #to do
    pass

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
    
    if (pre_login[address] != rand_string): return "login error"
    if(check_signed(address,signed_string)):
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
load mex from db return list
to do
'''
def getmex_db():
    pass






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
        if(check_vincoli(id_nft,nft_contract,address)):
            return getmex_db(address,id_nft,nft_contract)
    return "not logged"
        




if __name__ == '__main__':
    app.run()