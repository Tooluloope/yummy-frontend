import React,{ Suspense } from "react";
import { NavBar } from "../components/navbar/navbar";
// import { Menu } from "../components/menu/menu";
import { Store } from "../states/cart/cart";
import { Route} from "react-router-dom";

const Orders = React.lazy(() => import("./orders"));
const Menu = React.lazy(() => import("../components/menu/menu"));


export const Home = () =>(
    <Suspense fallback={<div>Loading</div>}>
    <Store>
        <NavBar />

            <Route path="/orders">
                <Orders  />
            </Route>
            <Route exact path="/" component={Menu} />
      
    </Store>
    </Suspense>
);