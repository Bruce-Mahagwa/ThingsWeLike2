// files
import Slider from "../../Components/Slider/Slider"
import Banner from "../../Components/Banner/Banner";
import SliderIntroContainer from "../../Components/SliderIntro/SliderIntroContainer";
import Tags from "../../Components/Tags/Tags";
const HomePage = () => {
  return (
    <>
      <Slider />
      <Banner />
      <SliderIntroContainer />
      <Tags tags={["login", "register", "spaces", "search"]} />
    </>
  )
}
export default HomePage;