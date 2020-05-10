import  {  useState, useEffect, useContext } from "react";
import { userContext } from "../states/auth/auth.context";

// Check if user is authenticated via local storage and returns a boolean value

const useAuth = () => {
    const [isAuthenticated, setAuth] = useState(JSON.parse(localStorage.getItem("isAuthenticated")));
    const {state: {isAuthenticated: isAuthFromState}} = useContext(userContext);

    useEffect(() => {
        const isAuthFromStorage = JSON.parse(localStorage.getItem("isAuthenticated"));

        setAuth(isAuthFromStorage);

    },[isAuthFromState]);

    return  isAuthenticated;

};

export default useAuth;