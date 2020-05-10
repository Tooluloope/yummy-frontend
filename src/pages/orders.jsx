import React, { useState } from "react";
import "./order.css";
import useFetch from "../hooks/fetch";
import Loader from "../components/loader/loader";
import { formatDate } from "../components/utils";


export const headings = [
    {
       "id": 1,
        "key": "id",
        "value": "Item ID"
    },
    {
        "id": 5,
         "key": "name",
         "value": "Name"
     },
    {
       "id": 2,
        "key": "address",
        "value": "Address"
    },
    {
       "id": 3,
        "key": "item",
        "value": "No. Of Items"
    },
    {
       "id": 4,
        "key": "total",
        "value": "Total Cost"
        
    },
    {
        "id": 6,
         "key": "created_at",
         "value": "Created At"
     }
];

const Orders = () => {

    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${localStorage.getItem("token")}`);
    const requestOptions = {
    method: "GET",
    headers: myHeaders,
    };
    const url = "https://yummy-pizzapi.herokuapp.com/api/orders/";
    
    let selectedRow = headings.map(heading => heading.key);
    const [selectedRows, setSelectedRows] = useState(selectedRow);
    const [isOpen, setIsOpen] = useState(false);
    const {data, error, isLoading} = useFetch(url, requestOptions);
    const [searchParam, setSearchParam] = useState("");

    if( isLoading || error || !data) {
        return( 
             <div>
                 {isLoading  ?  <Loader /> : error}
             </div>
        );
    }
    const filteredData  = data.length >0 ? data.filter(pizza => pizza.name.toLowerCase().includes(searchParam.toLowerCase())) : [];


    console.log(data, isLoading, error);




    

    const handleFilter = (e) => {
        const value = e.target.value;
        e.persist();
        if (e.target.checked) {
           
            setSelectedRows((prev) => [...prev,value ]);
        }
        else {
            const index = selectedRows.indexOf(value);
            if (index > -1) {
                setSelectedRows(prev => prev.filter(key => key !== value));
            }
        }        
    };

    


    return(
        <>
            <div className=" h-screen">
                <div className="container mx-auto py-6 px-4">
                    <h1 className="text-3xl py-4 border-b mb-10">Orders</h1>

                    

                    <div className="mb-4 flex justify-between items-center">
                        <div className="flex-1 pr-4">
                            <div className="relative md:w-1/3">
                                <input onChange = {(e) => setSearchParam(e.target.value)}  type="search"
                                    className="w-full pl-10 pr-4 py-2 rounded-lg shadow focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                                    placeholder="Search..." />
                                <div className="absolute top-0 left-0 inline-flex items-center p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" viewBox="0 0 24 24"
                                        strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                                        <circle cx="10" cy="10" r="7" />
                                        <line x1="21" y1="21" x2="15" y2="15" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="shadow rounded-lg flex">
                                <div className="relative">
                                    <button onClick = {() => setIsOpen(prev => !prev)}
                                        className="rounded-lg inline-flex items-center bg-white hover:text-blue-500 focus:outline-none focus:shadow-outline text-gray-500 font-semibold py-2 px-2 md:px-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:hidden" viewBox="0 0 24 24"
                                            strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                                            strokeLinejoin="round">
                                            <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                                            <path
                                                d="M5.5 5h13a1 1 0 0 1 0.5 1.5L14 12L14 19L10 16L10 12L5 6.5a1 1 0 0 1 0.5 -1.5" />
                                        </svg>
                                        <span className="hidden md:block">Display</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-1" width="24" height="24"
                                            viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                                            strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </button>

                                    <div
                                        className={` ${!isOpen ? "hidden" : null} z-40 absolute top-0 right-0 w-40 bg-white rounded-lg shadow-lg mt-12 -mr-1 block py-1 overflow-hidden`}>
                                        
                                        
                                        {headings && headings.map(heading => 
                                            <label key={heading.id}
                                                className="flex justify-start items-center text-truncate hover:bg-gray-100 px-4 py-2">
                                                <div className="text-teal-600 mr-3">
                                                    <input  value={heading.key} onChange={handleFilter} type="checkbox" className="form-checkbox focus:outline-none focus:shadow-outline" defaultChecked = {true}  />
                                                </div>
                                                <div className="select-none text-gray-700">{heading.value}</div>
                                            </label>
                                            )}
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative w-auto h-full sm:h-full">
                        
                        <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white m-auto table-striped relative  h-full">
                            <thead>
                                <tr className="text-left">
                                    <th className="py-2 px-3 sticky top-0 border-b border-gray-200 bg-gray-100">
                                        <label
                                            className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                                            <input type="checkbox" className="form-checkbox focus:outline-none focus:shadow-outline"  />
                                        </label>
                                    </th>
                                    {selectedRows.map(key => 
                                        <th key={key} className=" truesss bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">{key}</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>

                            {filteredData && filteredData.map(order => {
                                return(
                                    <tr key={order.id}>
                                        <td className="border-dashed border-t border-gray-200 px-3">
                                            <label
                                                className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                                                <input type="checkbox" className="form-checkbox rowCheckbox focus:outline-none focus:shadow-outline" name={order.id}
                                                        />
                                            </label>
                                        </td>
                                        {selectedRows.includes("id") && <td className="border-dashed border-t border-gray-200 userId">
                                            <span className="text-gray-700 px-6 py-3 flex items-center" >{order.id}</span>
                                        </td>}
                                        {selectedRows.includes("name") &&<td className="border-dashed border-t border-gray-200 phoneNumber">
                                            <span className="text-gray-700 px-6 py-3 flex items-center"
                                                >{order.name}</span>
                                        </td>}
                                        {selectedRows.includes("address") &&<td className="border-dashed border-t border-gray-200 firstName">
                                            <span className="text-gray-700 px-6 py-3 flex items-center" >{order.address}</span>
                                        </td>}
                                        {selectedRows.includes("item") && <td className="border-dashed border-t border-gray-200 lastName">
                                            <span className="text-gray-700 px-6 py-3 flex items-center" x-text="user.lastName">{order.item.length}</span>
                                        </td>}
                                        {selectedRows.includes("total") && <td className="border-dashed border-t border-gray-200 emailAddress ">
                                            <span className="text-gray-700 px-6 py-3 flex items-center"
                                                > $ {order.total}</span>
                                        </td>}
                                        {selectedRows.includes("created_at") && <td className="border-dashed border-t border-gray-200 gender">
                                            <span className="text-gray-700 px-6 py-3 flex items-center"
                                                >{formatDate(order.created_at)}</span>
                                        </td>}
                                        
                                    </tr>
                            );})}
                            </tbody>
                        </table>
                    </div>
                </div>

                
            </div>            
        </>
    );

};

export default Orders;