import LoginPage from "../pages/auth/Login";
import RegisterPage from "../pages/auth/Register";
import HomePage from "../pages/home/Home";
import RandomPage from "../pages/RandomPage";
import Profile from "../pages/Profile";

export const PAGES = [
  {
    ID: 0,
    PAGE_PATH: "/",
    PAGE_COMPONENT: <HomePage />,
  },
  {
    ID: 1,
    PAGE_PATH: "/login",
    PAGE_COMPONENT: <LoginPage />,
  },
  {
    ID: 2,
    PAGE_PATH: "/register",
    PAGE_COMPONENT: <RegisterPage />,
  },
  {
    ID: 3,
    PAGE_PATH: "/home",
    PAGE_COMPONENT: <RandomPage />,
  },
  {
    ID: 4,
    PAGE_PATH: "/profile",
    PAGE_COMPONENT: <Profile />,
  },
];
