// files
import SliderIntro from "./SliderIntro";
import home_1 from "../../images/home_1.jpg"
import home_2 from "../../images/home_2.jpg"
import home_3 from "../../images/home_3.jpg"   
const SliderIntroContainer = () => { 
  return ( 
    <div id = "sliderintro"> 
      <SliderIntro number = {1} category = {"Conversations"} image = {home_3} name = {"The Best Spaces"} description = {"Meet people and have the best conversations on all sorts of topics. Everything decent is on the table."}/>
      <SliderIntro number = {2} category = {"People"} image = {home_2} name = {"The Best People"} description = {"Make lasting relationships with people who share your interests. Have it all out on any decent topic."}/>
      <SliderIntro number = {3} category = {"Fun"} image = {home_1} name = {"Have a Great Time"} description = {"Live it up and enjoy the company of like minded people."}/>
    </div>
  )
}
export default SliderIntroContainer;