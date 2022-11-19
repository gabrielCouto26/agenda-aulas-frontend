import Dashboard from "./views/dashboard";
import Register from "./views/register";
import NewClass from "./views/newClass";
import MyClasses from "./views/myClasses";
import ClassDetails from "./views/classDetails";

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
    },
    {
      path: "/class/:id/details",
      name: "Class Details",
      component: <ClassDetails/>
    }
]

export default routes;