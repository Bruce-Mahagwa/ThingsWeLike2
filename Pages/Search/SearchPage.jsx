// files
import Search from "../../Components/Search/Search"
import { getSpaces } from "../../ReduxStore/Actions/SpaceActions"
const SearchPage = () => {  
  return (
    <Search getSpaces = {getSpaces} />
  )
}
export default SearchPage;