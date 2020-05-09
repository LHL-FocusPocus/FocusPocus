import SignUp from "./components/SignUp";
import Login from "./components/Login";

const Routes = [
  {
    path: "/",
    exact: true,
    component: Login,
  },
  {
    path: "/register",
    exact: true,
    component: SignUp,
  },
];

export default Routes;
