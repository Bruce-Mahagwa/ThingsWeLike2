// files i
import CatalogueItem from "../Catalogue/CatalogueItem";
import "../Catalogue/Catalogue.css";
import Loading from "../Loading/Loading";
import ErrorMessage from "../Error/ErrorMessage";

// dependencies 
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from '@mui/material';

const Spaces = ({ getSpaces }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useSearchParams()
  const [muiPage, setMuiPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [localError, setLocalError] = useState(false);
  const pageNum = page.get("pageNum");

  useEffect(() => {
    if (!pageNum) {
      // if the page loads we et the pageNum to 1 automatically
      setPage({ pageNum: 1 })
    }
    setLoading(true)
    dispatch(getSpaces({ url: "getspaces", pageNum: pageNum ? pageNum : 1 })).unwrap().then((res) => {
      setLoading(false)
      setMuiPage(pageNum ? pageNum : 1); // we change the pagination number on the Pagination component
    }).catch((e) => {
      setLoading(false)
      setLocalError(true)
    })
  }, [pageNum]) // runs when pageNum changes by the MUI Pagination component

  const { spaces, error } = useSelector(state => state.spaces) // we select the spaces and error variables from our global state

  const handleChange = (e) => {
    e.preventDefault();
    setPage({ pageNum: e.target.textContent })
    setMuiPage(Number(e.target.textContent));
    // here we set both the pageNum variable for search Params and the page Number on the Pagination component
  }

  if (loading) {
    return <Loading />
  }

  if (error || localError) {
    return <ErrorMessage errorTitle={"Fetching Data Error"} errorMessage={error || "Could Not Load Resource. Please try again Later or refresh the page."} />
  }
  
  if (spaces.data.length > 0) {
    return (
      <>
        <h2 className="title">Spaces</h2>
        <div className="catalogue-list-container">
          {spaces.data.map((space) => { 
            return (
              <CatalogueItem key={space.spaceName} image={space.avatar} description={space.description.substr(0, 100) + "..."} name={space.spaceName} members={space.members.length} id={space._id} url={"spaces"} />
            )
          })}
        </div>
        <div style={{ width: "100%", marginBottom: "1em", marginTop: "1em" }}>
          <Pagination onChange={handleChange} count={Number(spaces.total) / Number(spaces.pageSize)} page={Number(muiPage)} size="large" />
        </div>
      </>
    )
  }
}
export default Spaces;