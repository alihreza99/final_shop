import React from "react";
import Link from "next/link";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { NextPage } from "next";

const Footer: NextPage = () => (
  <footer className="myfooter page-footer font-small blue pt-4">
    <div className="myfooterparent container-fluid text-center text-md-left">
      <h2 className="text-uppercase">
        شاپلاین
        <ShoppingBasketIcon />
      </h2>
      <div className="foterlinksparent">
        <div className="foterlinks col-md-3 mb-md-0 mb-3">
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
            <li>
              <Link className="foot-link px-4" href={"/auth/login/page"}>
                ورود
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className="footer-copyright text-center py-3">
      © 2023 طراحی شده در سال
    </div>
  </footer>
);

export default Footer;
