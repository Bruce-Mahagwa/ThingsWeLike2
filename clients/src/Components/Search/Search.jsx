// files
import "./Search.css"
import "../Catalogue/Catalogue.css";
import Loading from "../Loading/Loading"
import ErrorMessage from "../Error/ErrorMessage"
import CatalogueItem from "../Catalogue/CatalogueItem"
import { useSelector, useDispatch } from "react-redux"
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Pagination } from '@mui/material';

const Search = ({ getSpaces }) => {
  // queries
  const [query, setQuery] = useSearchParams()
  // state
  const { spaces, error } = useSelector(state => state.spaces)
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState(false);
  const [muiPage, setMuiPage] = useState(1);

  // query variables
  let pageNum = query.get("pageNum") || 1
  let searchQueryProvided = query.get("searchQuery") || ""

  const [searchTerm, setSearchTerm] = useState(searchQueryProvided);
  const dispatch = useDispatch();

  const searchSpaces = () => {
    if (searchTerm.length > 0) {
      setQuery({ pageNum: 1, searchQuery: searchTerm }) // set our search query on the url
    }
    else {
      return; // if no search term then we do nothing
    }
    setLoading(true);
    dispatch(getSpaces({ url: "searchspaces", pageNum: pageNum, searchQuery: searchTerm })).then((res) => {
      setLoading(false)
    }).catch((e) => {
      setLoading(false)
      setLocalError(true)
    })
  }
  const handleKeyDown = (e) => { // searches with the enter key
    if (e.key === "Enter") {
      return searchSpaces()
    }
    else {
      return null;
    }
  }

  useEffect(() => {
    // incase the use refreshes the page then search is carried out automatically
    if (searchQueryProvided) {
      setLoading(true)
      dispatch(getSpaces({ url: "searchspaces", pageNum: pageNum ? pageNum : 1, searchQuery: searchQueryProvided })).unwrap().then((res) => {
        setLoading(false)
        setMuiPage(pageNum ? pageNum : 1); // update the material ui pagination component
      }).catch((e) => {
        setLoading(false)
        setLocalError(true)
      })
    }
  }, [pageNum, searchQueryProvided]) // dependent on pageNum and searchQueryProvided

  const handleChange = (e) => {
    // updates both searchqeury on the url and the pagenum
    e.preventDefault();
    setQuery((prev) => {
      return {
        searchQuery: searchTerm,
        pageNum: e.target.textContent
      }
    })
    setMuiPage(Number(e.target.textContent)); // updates mui page
  }

  if (loading) {
    return (
      <>
        <div className="search-bar-container">
          <h2>Search Spaces</h2>
          <div className="search-bar">
            <input type="text" name="search" placeholder="Search spaces" className="search-bar-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleKeyDown} />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" onClick={searchSpaces}>
              <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <Loading />
      </>
    )
  }

  if (error || localError) {
    return <ErrorMessage errorTitle={"Fetching Data Error"} errorMessage={error || "Could Not Load Resource. Please try again Later"} />
  }

  return (
    <main id="search-bar">
      <div className="search-bar-container">
        <h2>Search Spaces</h2>
        <div className="search-bar">
          <input type="text" name="search" placeholder="Search spaces" className="search-bar-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleKeyDown} />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" onClick={searchSpaces}>
            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      <h2 className="title">Spaces</h2>
      {searchQueryProvided && (<><div className="catalogue-list-container">
        {spaces.data.map((space) => {
          return (
            <CatalogueItem key={space.spaceName} image={space.avatar} description={space.description} name={space.spaceName} members={space.members.length} id={space._id} url={"search"} />
          )
        })}
      </div>
        <div style={{ width: "100%", marginBottom: "1em", marginTop: "1em" }}>
          <Pagination onChange={handleChange} count={Number(spaces.total) / Number(spaces.pageSize)} page={Number(muiPage)} size="large" />
        </div>
      </>)}
    </main>
  )
}

export default Search;
