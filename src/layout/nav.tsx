import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Link from "next/link";
import { store } from "../redux/store";
import { useCart } from "react-use-cart";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { NextPage } from "next";
import { useCookies } from "react-cookie";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";


const Navbar: NextPage = () => {
  const admin = useSelector((state: any) => state.auth.admin);
  // @ts-ignore
  const [num, setnum] = useState(store.getState().auth.shopitems?.length);
  useEffect(() => {
    // @ts-ignore
    setnum(store.getState().auth.shopitems?.length);
    // @ts-ignore
  }, [store.getState().auth.shopitems?.length]);

  const { isEmpty, totalItems } = useCart();
  const dispatch = useDispatch();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [cookie, getCookie, removeCookie] = useCookies(["userToken"]);
  const styleForPaper = {
    width: "40px",
    height: "40px",
  };
  return (
    <>
      <AppBar
        sx={{ bgcolor: "black", height: "80px", display: "flex" }}
        className="navbar"
        position="fixed"
        dir="rtl"
      >
        <div className="firstnav">
          <span>
            شاپلاین
            <ShoppingBasketIcon />
          </span>
          <Link className="navlink" href="/">
            خانه
          </Link>
          <Link className="navlink" href="/donepage/page">
            تکمیل خرید{" "}
          </Link>{" "}
        </div>
        <div className="navmid"></div>
        {cookie.userToken && (
          <div className="navleft">
            <Link href="/shop/page" className="navshop">
              <div>
                <LocalGroceryStoreIcon style={styleForPaper} />
                {/* @ts-ignore */}
                {store.getState().auth.shopitems?.length != 0 && (
                  <div className="numberofitems">{totalItems}</div>
                )}
              </div>
            </Link>
            <Link href="/" className="nav-left">
              <div className=" logout">
                <Link
                  href={"/"}
                  className="plogout"
                  onClick={() => {
                    dispatch({
                      type: "logout",
                    });
                    removeCookie("userToken");
                  }}
                >
                  <LogoutIcon />
                  خروج
                </Link>
              </div>
            </Link>
          </div>
        )}
        {!cookie.userToken && (
          <div className="navleft">
            <Link href="/auth/login/page" className="login">
              ورود
              <LoginIcon />
            </Link>
          </div>
        )}
      </AppBar>
    </>
  );
};

export default Navbar;
