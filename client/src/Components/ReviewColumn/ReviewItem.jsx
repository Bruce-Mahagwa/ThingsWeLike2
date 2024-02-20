// files
import "./ReviewItem.css";
const ReviewItem = ({name, rating, reviewText}) => {
  return (
    <div className = "reviewcolumn-container-item">
      <div className = "reviewcolumn-container-item-name-rating">
        <p>{name}</p>
        <p>{rating}</p>
      </div>
      <div className = "reviewcolumn-container-item-description">
        <p>{reviewText}</p>
      </div>
      <div className = "reviewcolumn-container-item-more-options">
        <div className = "reviewcolumn-container-item-more-options-btns">
          <button className = "review-btns">Replies <span>0</span></button>
          <button className = "review-btns">Reply</button>
        </div>
        <div className = "replies-container">
            {/*replies container  */}

            {/*end of replies container  */}
        </div>
      </div>
    </div>
  )
}
export default ReviewItem;