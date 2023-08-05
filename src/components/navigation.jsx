import { Link } from "react-router-dom";
import { Manageaccount } from "./Manageaccounts";
export default function Nav({pic}){
  return(
    <div class="fluid-container">
      <div class="row">
        <div class="col-3">
          <img style={{width: "100%",height: 50}} alt="" src="8983940_4063796.jpg"/>
        </div>
        <div class="col-6">
        <div class="row">
      <div class="col-6 text-center">
        <Link to="/home">Home</Link>
      </div>
      <div class="col-6 text-center">
        <Link to="/products">Products</Link>
      </div>
        </div>
        </div>
        <div class="col-2">
        <Manageaccount pic={pic}/>
        </div>
      </div>
      <footer>
       Image by <a href="https://www.freepik.com/free-vector/logo-template-gaming_8983940.htm#query=gaming%20controller%20logo&position=6&from_view=keyword&track=ais">Freepik</a>
      </footer>
    </div>
  )
}