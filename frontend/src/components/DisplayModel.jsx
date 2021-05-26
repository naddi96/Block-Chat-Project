import React from "react";


class DisplayModel extends React.Component{
 
    render() {    
      let item= this.props.item
      if (item==null){
        return ("");


      
      } 

      if (!item.full){
        return(
        <div key={item.nome+item.creatore}>
        <div className="card" style={{marginTop:20}} >
        <img src="https://pbs.twimg.com/profile_images/1280515721286619136/r35mYqRK.jpg" className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{ item.nome}</h5>
          
          <div className="card-text"><div className="text-secondary">creato da:
          </div>{item.creatore}</div>
   
          <div className="card-text"><div className="text-secondary">indirizzo contratto:
          </div>{item.contract}</div>
   
        </div>
           <div className="card-body">
          <a href={"./buyNft?nft="+item.contract} className="card-link">Dettagli</a>
        
        </div>
        </div></div>

        )

      }
      if (item.full) {return (
        <div key={item.nome+item.creatore}>
        <div className="card" style={{marginTop:20}} >
        <img src="https://pbs.twimg.com/profile_images/1280515721286619136/r35mYqRK.jpg" className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{ item.nome}</h5>
          
          <div className="card-text"><div className="text-secondary">creato da:
          </div>{item.creatore }</div>
   
          <div className="card-text"><div className="text-secondary">indirizzo contratto:
          </div>{item.contract}</div>
   
        </div>
        <ul className="list-group list-group-flush">
        <li className="list-group-item">
         <div className="text-secondary" style={{display:"inline"}} >Numero di NFT totali:</div>
          <div style={{display:"inline"}}>{item.limiteMint}</div> 
            </li>
         
         
          <li className="list-group-item">
         <div className="text-secondary" style={{display:"inline"}} >Comprati:</div>
          <div style={{display:"inline"}}>{item.lastid}</div> 
            </li>
         
   
         
          <li className="list-group-item">
          <div className="text-secondary" style={{display:"inline"}}>Limite messaggi:</div>
          <div style={{display:"inline"}}>{item.limiteMessaggi}</div> 
            </li>
        
          
            <li className="list-group-item">
         <div className="text-secondary" style={{display:"inline"}} >Costo:</div>
          <div style={{display:"inline"}}>{item.costo}</div>
   
          </li>
   
   
   
          
          <li className="list-group-item">
         <div className="text-secondary" style={{display:"inline"}} >Minuti di blocco:</div>
          <div style={{display:"inline"}}>{item.minBlocco}</div>
   
          </li>
   
   
                       
          <li className="list-group-item">
         <div className="text-secondary" style={{display:"inline"}} >Garanzia risposta:</div>
          <div style={{display:"inline"}}>{item.gRisp.toString()}</div>
   
          </li>  
        </ul>

      </div>
      </div>
     
   
      )}


      }
    
    }
   
        
export default DisplayModel;
   