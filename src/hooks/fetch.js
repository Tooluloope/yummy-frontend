import  { useState, useEffect } from "react";


const useFetch = (url, options) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(url, options);
                const result = await response.json();
                setData(result);
                setIsLoading(false);
            } catch (error) {

                setError("Error fetching Data");
                setIsLoading(false);
            }
        };
        fetchData();
    }, [url,options]);

    return {data, error, isLoading};

};

export default useFetch;