import React  from "react";

import {upload_img} from "./requestsAPI"

class uploadedImg extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      pictureAsFile:null
    };
  }
uploadPicture = e => {
  //URL.createObjectURL(e.target.files[0])  
  this.setState({
      /* contains the preview, if you want to show the picture to the user
           you can access it with this.state.currentPicture
       */
      
      /* this contains the file we want to send */
      pictureAsFile: e.target.files[0]
    });
  };


  setImageAction = async event => {
    event.preventDefault();
    if (this.state.pictureAsFile===null){
      alert("seleziona una immagine prima di fare l'upload")
      return
    }
    
    upload_img(this.props.nft,this.props.account,this.state.pictureAsFile)
    this.setState({pictureAsFile:null})
/*
    const data = await fetch("http://localhost/upload_img", {
      method: "post",
      headers: { "Content-Type": "multipart/form-data" },
      body: formData
    });
    const uploadedImage = await data.json();
    if (uploadedImage) {
      console.log("Successfully uploaded image");
    } else {
      console.log("Error Found");
    }*/
  };


render(){

  let button=<input type="file" accept="image/png" name="image" onChange={this.uploadPicture} />
  if (this.state.pictureAsFile !==null)
    button= <button className
    type="submit" name="upload">
      Carica Immagine
    </button>
  return(

    <div className="content landing upload">
      <form onSubmit={this.setImageAction}>
        
        {button}
      </form>
    </div>

  )


}


}


export default uploadedImg;
