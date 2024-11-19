// files
import "./Tags.css";
// dependencies
import { Link } from "react-router-dom"
// variables
const linkStyles = {
  "textDecoration": "none",
  "marginBottom": "0.5em"
}
const Tags = ({ tags }) => {
  return (
    <article id="tags">
      <div id="tags-container">
        {tags?.map((tag) => {
          return (
              <Link to={`/${tag}`} style={linkStyles} className="tags-container-item" key={tag}>{tag}</Link>
          )
        })}
      </div>
    </article>
  )
}
export default Tags;