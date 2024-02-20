// files
import CatalogueItem from "../Catalogue/CatalogueItem"
import Testimonial from "./Testimonials.jsx"
import AboutUs from "./Aboutus"
import Tags from "../Tags/Tags"
import "./Home.css"
const Home = () => {
  return (
    <main id="home-main">
      <article className="testimonial-about-us">
        <Testimonial />
      </article>
      <article className="testimonial-about-us">
        <AboutUs />
      </article>
      <Tags tags={["login", "register", "spaces", "search"]} />
    </main>
  )
}
export default Home;