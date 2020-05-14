import  { useState, useEffect } from "react";


const useFetch = (url, options) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(url, options);
                const status = response.status;
                const result = await response.json();
                
                setData(result);
                setStatus(status);
                
                setIsLoading(false);
                
            } catch (error) {

                setError("Error fetching Data");
                setIsLoading(false);
                setStatus(status);
            }
        };
        fetchData();
    }, [url]);

    return {data, error, isLoading, status};

};

export default useFetch;