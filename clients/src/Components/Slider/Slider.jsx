// files
import "./Slider.css";
import home_1 from "../../images/home_1.jpg"
import home_2 from "../../images/home_2.jpg"
import home_3 from "../../images/home_3.jpg"
// dependencies
import { Slide } from 'react-slideshow-image';
// variables
const slideImages = [
  {
    url: home_1,
    caption: 'Slide 1'
  },
  {
    url: home_2,
    caption: 'Slide 2'
  },
  {
    url: home_3,
    caption: 'Slide 3'
  }
]
const Slider = () => {
  return (
    // begin of slideshow
    <div id="slideshow">
      {/*begin of slide  */}
      <Slide
        duration={4000}
        canSwipe={false}
        arrows={false}
      >
        {slideImages.map((image) => {
          return (
            <div key = {image.caption} className="slideshow-container" style={{ background: `url(${image.url})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }}>
            </div>
          )
        })}
      </Slide>
    </div>
    // end of slideshow
  )
}
export default Slider;
