import axios from 'axios';

const endpoint="http://localhost/"

async function realLogin(address,rand_string,signed_string){
    return await axios.post(endpoint+"login",{
        address: address,
        signed_string:signed_string,
        rand_string:rand_string
    },
    {withCredentials: 'True'})

}


export async function login(address,web3){
    //show progress bar
     // fetch repos with axios
         let res=await axios
         .get(endpoint+`prelogin?address=`+address , {withCredentials: 'True'})
         .then(async result => {
            console.log(web3)
            let msg = result.data
            let msgHash1 = web3.utils.sha3(msg)
            let sig1 = await web3.eth.sign(msgHash1, address);
            return realLogin(address,msg,sig1).then(result => {
                if( result.data==="loggin error"){
                    alert("Problema con il login")
                    return false
                }
                if(result.data==="login completato"){
                    return true
                }
                return false          
              }).catch(thrown => {
                  console.log(thrown)
                  alert("Problema con il login")
                  return false
                });
              
        }).catch(thrown => {
            alert("probelma con la firma")
            return false
          });
       return res
}

export async function sendmex(mex,address,id_nft,nft_contract){
    return await axios.post(endpoint+"sendmex",{
        mex:mex,
        address:address,
        id_nft:id_nft,
        nft_contract:nft_contract
    },
    {withCredentials: 'True'})
    .then(async result => {
        return result.data
    })
    
    .catch(thrown => {
        alert("problema con interno messaggio non inviato")
        return false
    });
}


export async function getmex(address,id_nft,nft_contract){
    
    return await axios.post(endpoint+"getmex",{
        address:address,
        id_nft:id_nft,
        nft_contract:nft_contract
    },
    {withCredentials: 'True'}).then(result => {
        if( result.data==="not logged"){
            console.log(address,id_nft,nft_contract)
            alert("non sei logatto o non nft non è di tua proprietà")
            return []
        }else{
            return result.data
        }

    })


}