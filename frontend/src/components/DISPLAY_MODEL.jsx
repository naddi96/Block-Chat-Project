import React from "react";


class DISPLAY_MODEL extends React.Component{
 
    render() {    
      let item= this.props.item
      if (item==null){
        return ("");
      

      
      } 





      if (!item.full){
        return(
        <div key={item.nome+item.creatore}>
        <div className="card" style={{marginTop:20}} >
        <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/062.jpg" className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{ item.nome}</h5>
          
          <div className="card-text"><div className="text-secondary">creato da:
          </div>{item.creatore }</div>
   
          <div className="card-text"><div className="text-secondary">indirizzo contratto:
          </div>{item.contract}</div>
   
        </div>
           <div className="card-body">
          <a href={"./contract_nft?nft="+item.contract} className="card-link">Dettagli</a>
         
        </div>
        </div></div>

        )

      }





      if (item.full) {return (
        <div key={item.nome+item.creatore}>
        <div className="card" style={{marginTop:20}} >
        <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/062.jpg" className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{ item.nome}</h5>
          
          <div className="card-text"><div className="text-secondary">creato da:
          </div>{item.creatore }</div>
   
          <div className="card-text"><div className="text-secondary">indirizzo contratto:
          </div>{item.contract}</div>
   
        </div>
        <ul className="list-group list-group-flush">
         
         
          <li className="list-group-item">
         <div className="text-secondary" style={{display:"inline"}} >Comprati:</div>
          <div style={{display:"inline"}}>{item.lastid}</div> 
            </li>
         
   
         
          <li className="list-group-item">
          <div className="text-secondary" style={{display:"inline"}}>Limite messaggi:</div>
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
          <div style={{display:"inline"}}>{item.grisp.toString()}</div>
   
          </li>  
        </ul>
        <div className="card-body">
          <a href="#" className="card-link">Compra</a>
          <a href="#" className="card-link">Another link</a>
        </div>
      </div>
      </div>
     
   
      )}


      }
    
    }
   
        
export default DISPLAY_MODEL;
   