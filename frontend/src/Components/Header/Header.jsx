import React from "react";
import Logo from "./Logo";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Button } from "../import-components";
import { logout } from "../../features/authSlice";
import { clearProperties } from "../../features/propertiesSlice";

export default function Header() {
  const isLogged = useSelector((state) => state.auth.isLogged);
  const dispatch = useDispatch();

  const options = [
    {
      name: "Home",
      slug: "/",
      isVisible: true,
    },
    {
      name: "Login",
      slug: "/login",
      isVisible: !isLogged,
    },
    {
      name: "Signup",
      slug: "/signup",
      isVisible: !isLogged,
    },
    {
      name: "List Property",
      slug: "/list-property",
      isVisible: isLogged,
    },
  ];
  return (
    <header id="main-header" className="py-4">
      <div className="flex flex-wrap justify-between">
        <div>
          <Logo style={{height:"60px"}} />
        </div>
        <div>
          <ul className="flex flex-wrap flex-col sm:flex-row gap-2">
            {options.map(
              (option) =>
                option.isVisible && (
                  <NavLink to={option.slug} key={option.name} className={(isActive)=>(isActive?"text-orange-700":"")}>
                    <li>
                      <Button className="bg-gray-200 hover:bg-gray-100 duration-200 shadow-md">{option.name}</Button>
                    </li>
                  </NavLink>
                )
            )}
              <li>
                <Button className="bg-gray-200 hover:bg-gray-100 duration-200 shadow-md"
                  onClick={() => {
                    dispatch(logout());
                    dispatch(clearProperties());
                  }}
                >
                  Logout
                </Button>
              </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
