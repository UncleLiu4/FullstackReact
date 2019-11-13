import React from 'react'

const Filter = ({ searchText, handleSearch }) => {
    return(
        <div>
            <p>filter shown with(buggy)</p>
            <input value={searchText} onChange={handleSearch} />
        </div>
    )
}

export default Filter;