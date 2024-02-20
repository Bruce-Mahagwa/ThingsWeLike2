// files
import Spaces from "../../Components/Viewings/Spaces";
import { getSpaces } from "../../ReduxStore/Actions/SpaceActions"

const SpacesPage = () => { 
  return (
    <Spaces getSpaces={getSpaces} />
  )
}
export default SpacesPage;