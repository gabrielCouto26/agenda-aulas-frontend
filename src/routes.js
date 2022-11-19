import Dashboard from "./views/dashboard";
import Register from "./views/register";
import NewClass from "./views/newClass";
import MyClasses from "./views/myClasses";

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
    },
    {
      path: "/class/list",
      name: "My Classes",
      component: <MyClasses/>
    }
]

export default routes;