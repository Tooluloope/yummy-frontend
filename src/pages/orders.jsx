import React, { useState, useEffect } from "react";
import "./order.css";

export const Orders = () => {

    const headings = [
        {
            "key": "userId",
            "value": "User ID"
        },
        {
            "key": "firstName",
            "value": "Firstname"
        },
        {
            "key": "lastName",
            "value": "Lastname"
        },
        {
            "key": "emailAddress",
            "value": "Email"
        },
        {
            "key": "gender",
            "value": "Gender"
        },
        {
            "key": "phoneNumber",
            "value": "Phone"
        }
    ];
    const [selectedRows, setSelectedRows] = useState([]);
    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        let selectedRow = headings.map(heading => heading.key);

        setSelectedRows(selectedRow);

    }, []);

    console.log(selectedRows);


    const users =  [{
        "userId": 1,
        "firstName": "Cort",
        "lastName": "Tosh",
        "emailAddress": "ctosh0@github.com",
        "gender": "Male",
        "phoneNumber": "327-626-5542"
    }, {
        "userId": 2,
        "firstName": "Brianne",
        "lastName": "Dzeniskevich",
        "emailAddress": "bdzeniskevich1@hostgator.com",
        "gender": "Female",
        "phoneNumber": "144-190-8956"
    }, {
        "userId": 3,
        "firstName": "Isadore",
        "lastName": "Botler",
        "emailAddress": "ibotler2@gmpg.org",
        "gender": "Male",
        "phoneNumber": "350-937-0792"
    }, {
        "userId": 4,
        "firstName": "Janaya",
        "lastName": "Klosges",
        "emailAddress": "jklosges3@amazon.de",
        "gender": "Female",
        "phoneNumber": "502-438-7799"
    }, {
        "userId": 5,
        "firstName": "Freddi",
        "lastName": "Di Claudio",
        "emailAddress": "fdiclaudio4@phoca.cz",
        "gender": "Female",
        "phoneNumber": "265-448-9627"
    }, {
        "userId": 6,
        "firstName": "Oliy",
        "lastName": "Mairs",
        "emailAddress": "omairs5@fda.gov",
        "gender": "Female",
        "phoneNumber": "221-516-2295"
    }, {
        "userId": 7,
        "firstName": "Tabb",
        "lastName": "Wiseman",
        "emailAddress": "twiseman6@friendfeed.com",
        "gender": "Male",
        "phoneNumber": "171-817-5020"
    }, {
        "userId": 8,
        "firstName": "Joela",
        "lastName": "Betteriss",
        "emailAddress": "jbetteriss7@msu.edu",
        "gender": "Female",
        "phoneNumber": "481-100-9345"
    }, {
        "userId": 9,
        "firstName": "Alistair",
        "lastName": "Vasyagin",
        "emailAddress": "avasyagin8@gnu.org",
        "gender": "Male",
        "phoneNumber": "520-669-8364"
    }, {
        "userId": 10,
        "firstName": "Nealon",
        "lastName": "Ratray",
        "emailAddress": "nratray9@typepad.com",
        "gender": "Male",
        "phoneNumber": "993-654-9793"
    }, {
        "userId": 11,
        "firstName": "Annissa",
        "lastName": "Kissick",
        "emailAddress": "akissicka@deliciousdays.com",
        "gender": "Female",
        "phoneNumber": "283-425-2705"
    }, {
        "userId": 12,
        "firstName": "Nissie",
        "lastName": "Sidnell",
        "emailAddress": "nsidnellb@freewebs.com",
        "gender": "Female",
        "phoneNumber": "754-391-3116"
    }, {
        "userId": 13,
        "firstName": "Madalena",
        "lastName": "Fouch",
        "emailAddress": "mfouchc@mozilla.org",
        "gender": "Female",
        "phoneNumber": "584-300-9004"
    }, {
        "userId": 14,
        "firstName": "Rozina",
        "lastName": "Atkins",
        "emailAddress": "ratkinsd@japanpost.jp",
        "gender": "Female",
        "phoneNumber": "792-856-0845"
    }, {
        "userId": 15,
        "firstName": "Lorelle",
        "lastName": "Sandcroft",
        "emailAddress": "lsandcrofte@google.nl",
        "gender": "Female",
        "phoneNumber": "882-911-7241"
    }];

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
                                <input type="search"
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
                                        
                                        
                                        {headings.map(heading => 
                                            <label key={heading.key}
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

                    <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative w-auto"
                        style={{height: "405px"}}>
                        <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white m-auto table-striped relative ">
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
                            {users.map(user => {

                                    return(

                                
                                    <tr key={user.userId}>
                                        <td className="border-dashed border-t border-gray-200 px-3">
                                            <label
                                                className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                                                <input type="checkbox" className="form-checkbox rowCheckbox focus:outline-none focus:shadow-outline" name={user.userId}
                                                        />
                                            </label>
                                        </td>
                                        {selectedRows.includes("userId") && <td className="border-dashed border-t border-gray-200 userId">
                                            <span className="text-gray-700 px-6 py-3 flex items-center" >{user.userId}</span>
                                        </td>}
                                        {selectedRows.includes("firstName") &&<td className="border-dashed border-t border-gray-200 firstName">
                                            <span className="text-gray-700 px-6 py-3 flex items-center" >{user.firstName}</span>
                                        </td>}
                                        {selectedRows.includes("lastName") && <td className="border-dashed border-t border-gray-200 lastName">
                                            <span className="text-gray-700 px-6 py-3 flex items-center" x-text="user.lastName">{user.lastName}</span>
                                        </td>}
                                        {selectedRows.includes("emailAddress") && <td className="border-dashed border-t border-gray-200 emailAddress ">
                                            <span className="text-gray-700 px-6 py-3 flex items-center"
                                                >{user.emailAddress}</span>
                                        </td>}
                                        {selectedRows.includes("gender") && <td className="border-dashed border-t border-gray-200 gender">
                                            <span className="text-gray-700 px-6 py-3 flex items-center"
                                                >{user.gender}</span>
                                        </td>}
                                        {selectedRows.includes("phoneNumber") &&<td className="border-dashed border-t border-gray-200 phoneNumber">
                                            <span className="text-gray-700 px-6 py-3 flex items-center"
                                                >{user.phoneNumber}</span>
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