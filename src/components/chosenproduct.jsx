import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
export function Chosenproduct(){
  var tags = '';
  var platforms = '';
  const [alltags,setAlltags] = useState();
  const [count,setCount] =useState(0);
  const [allplatforms,setAllplatforms] = useState();
  const location = useLocation();
  const game = location.state;
  const newtags = () =>{
    for(let i =0;i< game.tags.length;i++){
      if (i === 0){
      tags = tags + game.tags[i].name;
      }else{
        tags = tags + ',' + game.tags[i].name;
      }
    }
  }
  const newplatforms = ()=>{
    for(let i =0;i< game.parent_platforms.length;i++){
      if (i === 0){
        platforms = platforms + game.parent_platforms[i].platform.name;
      }else{
        platforms = platforms + ',' + game.parent_platforms[i].platform.name;
      }
    }
  }
  const imgforward =()=>{
    const sslength = game.short_screenshots.length;
    if(count === sslength - 1){
      setCount(0);
    }else{
      setCount(count + 1);
    }
  }
  const imgbackward =()=>{
    const sslength = game.short_screenshots.length;
    if(count === 0){
      setCount(sslength - 1);
    }else{
      setCount(count - 1);
    }
  }
  useEffect(()=>{
    newtags();
    newplatforms();
    setAlltags(tags)
    setAllplatforms(platforms);
  },[])
  return(
    <div>
      <div class="card text-center">
        <img src={game.background_image} alt="" class="mx-auto" style={{width: "50%"}} />
        <div class="card-body">
          <h4 class="card-title">{game.name}</h4>
          <ul class="list-group">
            <li class="list-group-item"><b>ESRB-Rating</b>: <b>{game.esrb_rating.name}</b></li>
            <li class="list-group-item"><b>Tags</b>: {alltags}</li>
            <li class="list-group-item"><b>Avaliable Platforms</b>: {allplatforms}</li>
            <li class="list-group-item"><b>Avaliable Stores</b>:
            {game.stores.map(store=>{
              var storeurl = store.store.domain;
              var storelink = "//" + storeurl;
              return(
                <a key={store.id} href={storelink} >{store.store.name}  </a>
              )
            })}</li>
          </ul>
          <h3>Ingame Screenshots</h3>
            <button onClick={()=>imgbackward()} class="mx-5"><span>{"<"}</span></button>
            <img alt="" style={{width: "50%"}} src={game.short_screenshots[count].image}/>
           <button onClick={()=>imgforward()} class="mx-5"><span>{">"}</span></button>
        </div>
      </div>
    </div>
  )
}