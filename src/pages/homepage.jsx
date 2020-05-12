import React,{ Suspense } from "react";
import { NavBar } from "../components/navbar/navbar";
// import { Menu } from "../components/menu/menu";
import { Store } from "../states/cart/cart";
import { Route} from "react-router-dom";
import useFetch from "../hooks/fetch";
import Loader from "../components/loader/loader";
import { AuthenticatedRoute } from "../components/routes/authenticatedRoutes";
import OrderDetails from "./order-details";

const Orders = React.lazy(() => import("./orders"));
const Menu = React.lazy(() => import("../components/menu/menu"));


export const Home = () =>{
    // Getting Data from the API using the Custom hook
    const {data, error, isLoading} = useFetch("https://yummy-pizzapi.herokuapp.com/api/pizzas/");

    return(
    <Suspense fallback={<Loader />}>
    <Store>
        <NavBar />
            <AuthenticatedRoute exact path="/orders">
                <Orders  />
            </AuthenticatedRoute>
            <AuthenticatedRoute exact path="/orders/:id">
                <OrderDetails pizzas = {data} />
            </AuthenticatedRoute>
            <Route exact path="/">
                <Menu data={data} error={error} isLoading={isLoading} />
            </Route>
    </Store>
    </Suspense>
);};