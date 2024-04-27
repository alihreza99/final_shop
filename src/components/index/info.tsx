import React from "react";
import Pic from "../../assets/pics/pic3.jpg";
import Link from "next/link";
import { Button } from "@mui/material";
import { NextPage } from "next";

const Info: NextPage = () => {
  return (
    <div className="infobanner">
      <div className="infoimageparent">
        <img className="infoimage" src={Pic.src} alt="..." />
      </div>{" "}
      <div className="infobannertexts text-light">
        <h3>با ما شیک بودن را تجربه کنید</h3>
        <p className="text-light">
          تخفیف های هفتگی و کیفیت بالای محصولات تنها در سایت ما
        </p>
        <p className="text-light">
          همین الان با خرید از ما جزو خانواده بزرگ ما شوید
        </p>
      </div>
    </div>
  );
};

export default Info;
