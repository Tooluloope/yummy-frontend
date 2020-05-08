import  {  useState, useEffect, useContext } from "react";
import { userContext } from "../states/auth/auth.context";


const useAuth = () => {
    const [isAuthenticated, setAuth] = useState(JSON.parse(localStorage.getItem("isAuthenticated")));
    const {state: {isAuthenticated: isAuthFromState}} = useContext(userContext);

    useEffect(() => {
        const isAuthFromStorage = JSON.parse(localStorage.getItem("isAuthenticated"));

        setAuth(isAuthFromStorage);

    },[isAuthFromState]);

    // const {state: {isAuthenticated}} = useContext(userContext);
    return  isAuthenticated;

};

export default useAuth;