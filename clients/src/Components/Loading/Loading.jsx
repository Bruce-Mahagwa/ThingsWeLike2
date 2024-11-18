// files
import Loadinggif from "./Loading.gif";
import "./Loading.css"
const Loading = () => {
  return (
    <div id="loading-gif">
      <div className="loading-gif-container">
        <img src={Loadinggif} alt="loading gif" className="loading-gif" />
      </div> 
    </div>
  )
}
export default Loading;