import Dashboard from "./views/dashboard";
import Register from "./views/register";
import NewClass from "./views/newClass";

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
    },
    {
      path: "/class/new",
      name: "New Class",
      component: <NewClass/>
  }
]

export default routes;