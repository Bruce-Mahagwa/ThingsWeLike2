// files
import "./Footer.css"
const Footer = () => {
  return (
    <footer id="universal_footer"> 
      <div className="universal_footer_container">
        <div className="universal_footer_container_div">
          <section>
            <ul>
              <li>About Us</li>
              <li>Feedback</li>
              <li>Community</li>
            </ul>
          </section>
          <section>
            <ul>
              <li>Trust, Safety, & Security</li>
              <li>Help & Support</li>
              <li>ThingsWeLike Foundation</li>
            </ul>
          </section>
          <section>
            <ul>
              <li>Terms of Service</li>
              <li>Privacy Settings</li>
              <li>Cookie Policy</li>
            </ul>
          </section>
        </div>

        <div className="border-visible"></div>

        <div className="universal_footer_container_div">
          <section className="footer_social_icons">
            <h3>FIND ME</h3>
            <div className="social-links">
              <a href="https://github.com/Bruce-Mahagwa" target="_blank">Github</a>
              <a href="https://bruce-mahagwa.github.io/Portfolio" target="_blank">Projects</a>
              <a href="jacobbruce880@gmail.com" target="_blank">jacobbruce880@gmail.com</a>
            </div>
          </section>
          <div className="border"></div>
          <section>
            <p>2023 - 2024 ThingsWeLike® Global Inc.</p>
          </section>
        </div>
      </div>
    </footer>
  )
}
export default Footer;