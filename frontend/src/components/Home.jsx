import React from "react";



class NFT_MODELS extends React.Component {
  render() {
      return (
        <ul>
          {this.props.animals.map(item => (
           
           <div className="card" style={{ marginTop:20}} >
           <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/062.jpg" className="card-img-top" alt="..."/>
           <div className="card-body">
             <h5 className="card-title">{item.nome_modello}</h5>
            
             

             <p className="card-text"><div className="text-secondary">creato da:</div>{item.creator}</p>
           </div>
           <ul className="list-group list-group-flush">
            
            
             <li className="list-group-item">
            <div className="text-secondary" style={{display:"inline"}} >Comprati:</div>
             <div style={{display:"inline"}}>{item.last_id}</div> 
               </li>
            
            
            
             <li className="list-group-item">
             <div className="text-secondary" style={{display:"inline"}}>Limite messaggi:</div>
               {item.limite_mex}</li>
           
             
               <li className="list-group-item">
            <div className="text-secondary" style={{display:"inline"}} >Costo:</div>
             <div style={{display:"inline"}}>{item.costo}</div>

             </li>



             
             <li className="list-group-item">
            <div className="text-secondary" style={{display:"inline"}} >Minuti di blocco:</div>
             <div style={{display:"inline"}}>{item.minuti_blocco}</div>

             </li>


                          
             <li className="list-group-item">
            <div className="text-secondary" style={{display:"inline"}} >Garanzia risposta:</div>
             <div style={{display:"inline"}}>{item.garanzia_risp}</div>

             </li>
           
           
             
           </ul>



           <div className="card-body">
             <a href="#" className="card-link">Card link</a>
             <a href="#" className="card-link">Another link</a>
           </div>
         </div>
           
          // <li key={item.id}>{item.animal}</li>
          ))}
        </ul>
      );
    };

   
  }





function Home() {

  const animals = [
    { last_id: 1,creator:"0x539b3c0E322CD9Dcbd8Af99ccd42f2E928255C6a" ,nome_modello: "Modello della Vita" ,minuti_blocco:2, costo:30, limite_mex:33,garanzia_risp:"no"},
    { last_id: 1,creator:"0x539b3c0E322CD9Dcbd8Af99ccd42f2E928255C6a" ,nome_modello: "Modello della Vita" ,minuti_blocco:2, costo:30, limite_mex:33,garanzia_risp:"no"}

  ];
  return (
  
  
  <div className="home">
     <div className="container">

   
     <NFT_MODELS animals={animals} />

   
 </div> </div>
  );
}

export default Home;
