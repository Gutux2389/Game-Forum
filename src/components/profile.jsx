import { useLocation } from "react-router-dom";
import {storage} from "../libs/init-firebase-storage";
import {ref,uploadBytes,listAll,getDownloadURL} from "firebase/storage";
import { useState,useEffect } from "react";
import { v4 } from "uuid";
export function Profile({getProfilePic}){
  const [imgUpload,setImgUpload] = useState('holder');
  const [profilePic,setProfilePic] = useState(null);
  const [imgChange,setImgChange] = useState();
  const location = useLocation();
  const user = location.state;
  const getImgRef = ref(storage,`${user.name}/`);
  useEffect(()=>{
    listAll(getImgRef).then((response)=>{
      if(response.items.length === 0){
        setProfilePic('logo512.png')
      }else{
        getDownloadURL(response.items[0]).then((url)=>{
          setProfilePic(url);
          getProfilePic(imgUpload);
        })
      }
    })
  },[imgChange,user.name])
  const uploadPhoto = ()=>{
    if (imgUpload === null) return;
    const imageRef = ref(storage,`${user.name}/ProfilePicture`);
    uploadBytes(imageRef,imgUpload).then(()=>{
      alert("Img Uploaded");
      setImgChange(v4());
    })
  }
  return(
    <div>
      <div class="card text-center">
      <div class="card-body">
      <ul class="list-group">
        <li class="list-group-item">Username: {user.name}</li>
        <li class="list-group-item">
          {profilePic != 'logo512.png'
          ? <img alt="" src={profilePic} class="mx-auto" style={{width: "50%",display: 'block'}}/>
          :<div>No Profile Picture</div>}
          <input type="file" onChange={(event)=>{
            setImgUpload(event.target.files[0]);
          }}/>
          <button onClick={uploadPhoto}>Upload photo</button>
        </li>
      </ul>
      </div>
      </div>
    </div>
  )
}