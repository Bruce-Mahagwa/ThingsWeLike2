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
            <div className="slideshow-container" style={{ background: `url(${image.url})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }}>
              {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 slideshow-play">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
              </svg> */}
            </div>
          )
        })}
      </Slide>
    </div>
    // end of slideshow
  )
}
export default Slider;
