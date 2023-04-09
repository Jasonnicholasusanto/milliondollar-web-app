import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Footer2 from "./components/Footer2/Footer2";
import "./app.scss";
import ShoppingBag from "./pages/ShoppingBag/ShoppingBag";
import SignUp from "./pages/Login/Signup";
import Login from "./pages/Login/Login";
import Checkout from "./pages/Checkout/Checkout";
import AboutUs from "./pages/AboutUs/AboutUs";
import ContactUs from "./pages/ContactUs/ContactUs";
import FAQs from "./pages/FAQs/FAQs";
import DigitalPlanners from "./pages/DigitalPlanners/DigitalPlanners";
import DigitalPlanner from "./pages/DigitalPlanner/DigitalPlanner";
import Poster from "./pages/Poster/Poster";
import Posters from "./pages/Posters/Posters";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import UserNavBar from "./user/UserNavBar/UserNavBar";
import Homepage from "./user/Homepage/Homepage";

// Customizing the layout of the web page: Navigation bar and Footer stays the same
// in all pages. However, we utilize Outlet from react-router-dom to change the web pages'
// properties and objects.
const Layout = () => {
  return (
    <div className="app">
      <NavBar/>
      <Outlet/>
      <Footer2/>
    </div>
  )
}

const UserDashboard = () => {
  return (
    <div className="app">
      <UserNavBar/>
      <Outlet/>
      <Footer2/>
    </div>
  )
}

const Reset = () => {
  return (
    <div className="app">
      <ResetPassword/>
    </div>
  )
}

// Creating the routes
const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children: [
      // Home page route
      {
        path:"/",
        element:<Home/>,
      },
      // The About Us page route
      {
        path:"/about-us/",
        element:<AboutUs/>,
      },
      // The Contact Us page route
      {
        path:"/contact-us/",
        element:<ContactUs/>,
      },
      // The FAQs page route
      {
        path:"/frequently-asked-questions/",
        element:<FAQs/>,
      },
      // Posters page route
      {
        path:"/posters/:id",
        element:<Posters/>,
      },
      // Fetching all posters
      {
        path:"/posters/",
        element:<Posters/>,
      },
      // Fetching all posters
      {
        path:"/posters/",
        element:<Posters/>,
      },
      // Product page route
      {
        path:"/poster/:id",
        element:<Poster/>,
      },
      // Posters page route
      {
        path:"/digital-planners/:id",
        element:<DigitalPlanners/>,
      },
      // Fetching all posters
      {
        path:"/digital-planners/",
        element:<DigitalPlanners/>,
      },
      // Product page route
      {
        path:"/digital-planner/:id",
        element:<DigitalPlanner/>,
      },
      {
        path:"/cart/",
        element:<ShoppingBag/>,
      },
      {
        path:"/sign-in/",
        element:<Login/>,
      },
      {
        path:"/sign-up/",
        element:<SignUp/>,
      },
      {
        path:"/forgot-password/",
        element:<ForgotPassword/>,
      },
      {
        path:"/cart/checkout/",
        element:<Checkout/>
      },
    ]
  },

  {
    path:"/reset-password",
    element:<Reset/>,
  },

  {
    path:"/dashboard/:id",
    element:<UserDashboard/>,
    children: [
      {
        path: "/dashboard/:id",
        element: <Homepage/>
      },
      {
        // path: "/sell-poster/"
        // element: <SellPoster/>
      },
      {
        // path: "/sell-digital-planner/"
        // element: <SellDigitalPlanner/>
      },
    ]
  }

])

function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
