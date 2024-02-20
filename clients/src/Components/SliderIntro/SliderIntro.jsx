// files
import "./SliderIntro.css"; 

const SliderIntro = ({number, category, image, name, description}) => {
  return (
    // begin of slider intro
    <div style = {{marginBottom: "1em"}} className = "sliderintro-item">
      <div className = "sliderintro-heading">
        <h1><span>{number}.</span> {category} </h1>
      </div>
      <div className = "sliderintro-container">
        <img src = {image} alt = {`poster image of ${name}`} className = "sliderintro-image" />
        <div>
          <h1 className = "sliderintro-title">{name}</h1>
          <p>{description}</p>
        </div>
      </div>
    </div>
    // end of slider intro
  )
}
export default SliderIntro;