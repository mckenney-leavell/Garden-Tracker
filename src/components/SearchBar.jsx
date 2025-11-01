import "./SearchBar.css"

function SearchBar({ getSearchInput, setSearchInput }) {
    return(
        <div className="search-bar">
            <input 
                className="plant-search"
                type="text"
                placeholder="Search plants"
                value={getSearchInput}
                onChange={(event) => {
                    setSearchInput(event.target.value)
                }}
            />
        </div>
    )
}

export default SearchBar;