// files
import "./UserReviewModal.css"

const UserReviewModal = () => {
  return (
    <article id = "reviewbox">
      <div className = "reviewbox-container">
        <div className = "reviewbox-close">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 reviewbox-close-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div className = "textarea-rating-container">
          <div className = "reviewbox-textarea">
            <textarea placeholder = "Please write a review with a minimum length of 100 words"></textarea>
          </div>

          <div>
            <button className = "post-review">Post</button>
          </div>

        </div>
      </div>
    </article>
  )
}
export default UserReviewModal