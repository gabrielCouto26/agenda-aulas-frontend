import Dashboard from "./views/dashboard";
import Register from "./views/register";

const routes = [
    {
        path: "/register",
        name: "Register",
        component: <Register/>
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: <Dashboard/>
    }
]

export default routes;