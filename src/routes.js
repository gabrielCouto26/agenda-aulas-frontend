import Dashboard from "./views/dashboard";
import Register from "./views/register";
import NewClass from "./views/newClass";
import MyClasses from "./views/myClasses";
import ClassDetails from "./views/classDetails";
import SubjectDetails from "./views/subjectDetails"
import Profile from "./views/profile";
import NotFound from "./views/notFound";
import { Navigate } from "react-router-dom";

const routes = [
  {
    path: "*",
    component: <NotFound />
  },
  {
    path: "/login",
    component: <Navigate to="/" />
  },
  {
    path: "/register",
    name: "Register",
    component: <Register />
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: <Profile />
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: <Dashboard />
  },
  {
    path: "/class/new",
    name: "New Class",
    component: <NewClass />
  },
  {
    path: "/class/list",
    name: "My Classes",
    component: <MyClasses />
  },
  {
    path: "/class/:id/details",
    name: "Class Details",
    component: <ClassDetails />
  },
  {
    path: "/subject/:id/details",
    name: "Subject Details",
    component: <SubjectDetails />
  }
]

export default routes;