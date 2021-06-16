import React  from "react";



class uploadedImg extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      pictureAsFile:null
    };
  }
uploadPicture = e => {
    this.setState({
      /* contains the preview, if you want to show the picture to the user
           you can access it with this.state.currentPicture
       */
      //picturePreview: URL.createObjectURL(e.target.files[0]),
      /* this contains the file we want to send */
      pictureAsFile: e.target.files[0]
    });
  };


  setImageAction = async event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.pictureAsFile);

    console.log(this.state.pictureAsFile);

    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    const data = await fetch("http://localhost:3000/upload/post", {
      method: "post",
      headers: { "Content-Type": "multipart/form-data" },
      body: formData
    });
    const uploadedImage = await data.json();
    if (uploadedImage) {
      console.log("Successfully uploaded image");
    } else {
      console.log("Error Found");
    }
  };


render(){
  return(

    <div className="content landing upload">
      <form onSubmit={this.setImageAction}>
        <input type="file" name="image" onChange={this.uploadPicture} />
        <button className
        
        
        type="submit" name="upload">
          Carica Immagine
        </button>
      </form>
    </div>

  )


}


}


export default uploadedImg;
