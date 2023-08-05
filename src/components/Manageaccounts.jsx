import {collection,addDoc,getDocs } from 'firebase/firestore';
import { useState,useEffect } from 'react';
import {db} from '../libs/init-firebase';
import {storage} from '../libs/init-firebase-storage';
import {ref,getDownloadURL,listAll, getMetadata} from 'firebase/storage';
import {Link,useNavigate} from 'react-router-dom';
import { v4 } from 'uuid';
import '../App.css';

export function Manageaccount({pic}){
  const [cookie,setCookie] = useState(null);
  const [name,setName] = useState('');
  const [password,setPassword] = useState('');
  const [users,setUsers] = useState([]);
  const [profilePic,setProfilePic] = useState('');
  const [refresh,setRefresh] =useState(pic);
  const [imgDimensions,setImgDimensions] = useState({});
  const collectionref = collection(db,'users');
  const navigate = useNavigate();
  useEffect(()=>{
    if(cookie != null){
      const getImgRef = ref(storage,`${cookie.data.name}/`);
      listAll(getImgRef).then((response)=>{
        if(response.items.length === 0){
          setProfilePic('logo192.png');
        }else if(pic != undefined || cookie != null){
          getDownloadURL(response.items[0]).then((url)=>{
            setProfilePic(url);
          })
        }

      })
  }
  },[cookie,refresh,pic])
  useEffect(()=>{
    loadImage(setImgDimensions,profilePic);
  },[profilePic])
  const loadImage = (setImgDimensions,profilePic) =>{
    const img = new Image();
    img.src = profilePic;

    img.onload = ()=>{
      setImgDimensions({
          height: img.height,
          width: img.width
        })
    }
    img.onerror = (err) =>{
      console.log(err)
      console.error(err)
    }
  }
  const handlesignup = (e)=>{
    e.preventDefault();
    addDoc(collectionref,{name:name,password:password}).catch(error =>{console.log(error)})
  }

  const handlelogin = (e)=>{
    e.preventDefault();
    getDocs(collectionref).then(response =>{
      const allDocs = response.docs.map(doc =>({
        data: doc.data(),
        id: doc.id,
      }));
      setUsers(allDocs);
    })
    if(users != []){
      for(let i =0;i < users.length;i++){
        if(users[i].data.name === name && users[i].data.password === password){
          setCookie(users[i]);
        }
      }
    }
  }
  return(
    <>
     { cookie != null
     ? <div>
      <p className='profileName'>{cookie.data.name}</p>
      <div className='profilePicDiv'>
      <img className={imgDimensions.width > imgDimensions.height ? 'profilePic': 'profilePic2'} alt=""
      src={profilePic} />
      </div>
      <div class="dropdown" style={{marginLeft: 40}}>
        <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
      <ul class="dropdown-menu">
      <li><Link to="/profile" state={cookie.data} class="dropdown-item">
        Profile
      </Link>
      </li>
      <li><button class="btn btn-danger dropdown-item" onClick={()=>{setCookie(null);navigate('/home');window.location.reload();}}>Logout</button></li>
      </ul>
      </div>
      <button onClick={()=>console.log(profilePic)}></button>
      </div>

     :<div><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#signup">
  Sign Up
</button>
          <div class="modal" id="signup" role="dialog" >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header text-center">
            <h3 class="modal-title">Sign Up</h3>
            <button class="close" data-bs-dismiss="modal"><span>&times;</span></button>
          </div>
          <div class="modal-body">
            <form onSubmit={handlesignup}>
              <h3>Username</h3>
              <input type="text" name="signupname" placeholder="Add your username here" required onChange={(e)=>setName(e.target.value)}/>
              <h3>Password</h3>
              <input type="password" name="signuppassword" placeholder="Add your password here" required onChange={(e)=>setPassword(e.target.value)}/>
              <br></br>
              <button  data-bs-dismiss="modal" data-bs-target="#signup" type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div>

          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#login">Log in</button>
          <div class="modal" id="login" role="dialog" >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header text-center">
            <h3 class="modal-title">Log in</h3>
            <button class="close" data-bs-dismiss="modal"><span>&times;</span></button>
          </div>
          <div class="modal-body">
            <form onSubmit={handlelogin}>
              <h3>Username</h3>
              <input type="text" name="loginname" required onChange={(e)=>setName(e.target.value)}/>
              <h3>Password</h3>
              <input type="password" name="loginpassword" required onChange={(e)=>setPassword(e.target.value)}/>
              <br></br>
              <button data-bs-dismiss="modal" data-bs-target="#login" type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
      </div>
    </div>
    </div>
}
    </>
  )
}
