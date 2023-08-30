import { useState,useEffect } from "react";
import { useNavigate,useLocation, } from "react-router-dom";
import '../App.css'
export function Products(){
	useEffect(() => {
		fetchdata();
	},[]);
	const location = useLocation();
	const navigate = useNavigate();
	const [show,setShow] = useState(false);
	const [results,setResults] = useState([]);
	const [imageid,setImageid] = useState(null);



	const showoverlay = (id)=>{
		setShow(true);
		setImageid(id);
	}
	const hideoverlay = ()=>{
		setShow(false);
		setImageid(null);
	}
  const fetchdata = async () => {
    const url = 'https://rawg-video-games-database.p.rapidapi.com/games?key=6423279be9e74eb08953c8ff4ab001e2';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'cda22aa739msh0b2b00cb822de4dp18f342jsn578379dc5856',
		'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
	setResults(result);
} catch (error) {
	console.error(error);
}
}
  return(
    <>
		{results.length != 0
		?
		<div class="fluid-container">
		<div class="row">
			{results.results.map(result=>{
				return(
				<div key={result.id} class="col-lg-3 col-md-4 p-2">
					<div class="hovereffect">
					<img style={{width:300,height:200}} onClick={()=>{
						navigate(`/products/${result.name}`,{state: result});
						}} alt="" src={result.background_image}
					onMouseOver={()=>showoverlay(result.id)} onMouseLeave={()=>hideoverlay()}/>

					{show & imageid === result.id
					?<div class="text">
							<h5>{result.name}</h5>
					</div>
					:<div></div>
}
				</div>
				</div>
				)
			})}
		</div>
		</div>
		:<div></div>
		}
    </>
  )
}