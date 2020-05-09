import React, { useState } from "react";
import { MenuItem } from "./menu-item";
import data from "../../data";
import SearchBar from "../search/search";

export const Menu = () => {

    // Search Parameter for the filtered data
    const [searchParam, setSearchParam] = useState("");

    // Return the different state of the data loading or Error
    // if(isLoading || error || !data) {
    //    return( 
    //         <div>
    //             {isLoading ?  "Loading..." : error}
    //         </div>
    //    );
    // }

    // Getting the filtered data using the search Parameter
    const filteredData  = data.length >0 ? data.filter(pizza => pizza.name.toLowerCase().includes(searchParam.toLowerCase())) : [];

    return (
        <>
             <h1 className="text-center text-lg pt-8 pb-4">  The Pizza Menu </h1>
             <SearchBar name='search' label='Search' searchParam = {setSearchParam} />
             <div className=" p-4 sm:flex sm:flex-wrap items-center justify-center container mx-auto">

             {filteredData.length > 0 ? filteredData.map( filter => <MenuItem key={filter.name} pizza={filter} />)
                    : <p style = {{textAlign: "center"}}>Opps... No Result Found </p>
                }  
            </div>
        </>
    );
};