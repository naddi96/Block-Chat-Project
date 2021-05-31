import axios from 'axios';



async function realLogin(address,rand_string,signed_string){
    return await axios.post("http://localhost/login",{
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
         .get(`http://localhost/prelogin?address=`+address , {withCredentials: 'True'})
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
    await axios.post("http://localhost/sendmex",{
        mex:mex,
        address:address,
        id_nft:id_nft,
        nft_contract:nft_contract
    },
    {withCredentials: 'True'})
    .then(async result => {
        console.log(result)
    })
    .catch(thrown => {
        alert("problema con il messaggio")
        return false
    });
}
