import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as RoutesTypes from "../../Constants/routesTypes"
import "./search-bar.scss"

export default function SearchBar({ placeholder, data }) {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntering, setWordEntering] = useState("");

    function handleFilter(value){
        setWordEntering(value);

        if(value === ""){
            setFilteredData([]);
            return;
        }
        
        const newFilter = data.filter((item) => {
            return item.title.toLowerCase().includes(value.toLowerCase());
        })
        setFilteredData(newFilter)
    }

    function clearSearch(){
        setWordEntering("");
        setFilteredData([]);
    }

    return (
        <div className="search-container">
            <div className="search-input">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={wordEntering}
                    onChange={(event) => handleFilter(event.target.value)}
                />
                {wordEntering.length !== 0 &&
                    <button onClick={clearSearch}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                }
            </div>
            <div className="search-results">
                {filteredData.map((item, index) => (
                    <div className="search-result" key={index}>
                        <Link to={`${RoutesTypes.PRODUCT_PAGE}${item.id}`}>
                            {item.title}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}