import axios from 'axios';



async function realLogin(address,rand_string,signed_string){
    return await axios.post("http://127.0.0.1:5000/login",{
        address: address,
        signed_string:signed_string,
        rand_string:rand_string
    })

}


export async function login(address,web3){
    //show progress bar
     // fetch repos with axios
         let res=await axios
         .get(`http://127.0.0.1:5000/prelogin?address=`+address)
         .then(async result => {
            console.log(web3)
            let msg = result.data
            let msgHash1 = web3.utils.sha3(msg)
            let sig1 = await web3.eth.sign(msgHash1, address);
            return realLogin(address,msg,sig1).then(result => {
                if( result.data=="loggin error"){
                    alert("Problema con il login")
                }
                if(result.data=="login completato"){
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

