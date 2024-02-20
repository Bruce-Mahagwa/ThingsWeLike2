import "./CategoryFilter.css"
const CategoryFilter = () => {
  return (
    <aside id="filter-bar">
      <div className="filter-bar-container">
        <h3>Select Category</h3>
        <select name="categories">
          <option value="all" selected>All</option>
          <option value="bruce">Bruce</option>
          <option value="bruce">Bruce</option>
          <option value="bruce">Bruce</option>
          <option value="bruce">Bruce</option>
        </select>
      </div>
    </aside>
  )
}
export default CategoryFilter