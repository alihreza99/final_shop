import React from "react";
import Link from "next/link";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { NextPage } from "next";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";



const Footer: NextPage = () => (
  <footer className="myfooter page-footer font-small blue pt-4">
    <div className="myfooterparent container-fluid text-center text-md-left">
      <div className="row fotertop">
        <div className="footerright col-md-6 mt-md-0 mt-3">
          <h2 className="text-uppercase">
            شاپلاین
            <ShoppingBasketIcon />
          </h2>
          <p>خرید خوب و با کیفیت را با شاپلاین تجربه کنید.</p>
          <hr className="clearfix w-100 d-md-none pb-0" />
        </div>
        <div className="foterlinksparent">
          <div className="foterlinks col-md-3 mb-md-0 mb-3">
            <h5 className="text-uppercase">لینک ها</h5>
            <ul className="list-unstyled">
              <li>
                <Link className="foot-link px-4" href={"/"}>
                  خانه
                </Link>
              </li>
              <li>
                <Link className="foot-link px-4" href={"/shop/page"}>
                  سبد خرید
                </Link>
              </li>
              <li>
                <Link className="foot-link px-4" href={"/donepage/page"}>
                  تکمیل خرید
                </Link>
              </li>
            </ul>
          </div>

          
        </div>
      </div>
    </div>

    <div className="footer-copyright text-center py-3">
      © 2023 طراحی شده در سال
    </div>
  </footer>
);

export default Footer;
