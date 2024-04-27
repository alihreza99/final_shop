import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "../card";
import { NextPage } from "next";

const Slider: NextPage = () => {
  const [items, setitems] = useState([]);

  const notify = () => toast.success("آیتم با موفقیت اضافه شد");
  const errornotify = () => toast.error("آیتم قبلا خریداری شده");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((res) => {
        setitems(res);
      })
      .catch((err) => console.log(err));
  }, []);

  let currentPageRef = useRef<any>(null);
  const [currentPage, setcurrentPage] = useState(1);
  const recordperPage = 4;
  const lastindex = recordperPage * currentPage;
  const firstindex = lastindex - recordperPage;
  const records = items?.slice(firstindex, lastindex);
  const npage = Math.ceil(items?.length / recordperPage);
  const listitem = records?.map((slide: any, index) => {
    return (
      <div key={index}>
        <Card
          id={slide?.id}
          img={slide?.image}
          title={slide?.category}
          price={slide?.price}
          alert={notify}
          dangeralert={errornotify}
        />
      </div>
    );
  });

  function prepage() {
    if (currentPage !== 1) {
      currentPageRef.current.style.animation = "prevPage .5s forwards";
      setcurrentPage(currentPage - 1);
    }
  }
  function nextpage() {
    if (currentPage !== npage) {
      currentPageRef.current.style.animation = "nextPage .5s forwards";
      setcurrentPage(currentPage + 1);
    }
  }
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div id="sliderbody" className="sliderbody">
        <h2>تمام آیتم ها </h2>
        <div
          className="sliderlist"
          ref={currentPageRef}
          onAnimationEnd={() => {
            if (currentPageRef.current) {
              currentPageRef.current.style.animation = "";
            }
          }}
        >
          {listitem}
        </div>

        {currentPage > 1 && (
          <a className="prev" data-slide="prev" onClick={prepage}>
            <ArrowBackIosIcon />
          </a>
        )}
        {currentPage < 5 && (
          <a className="next" data-slide="next" onClick={nextpage}>
            <ArrowForwardIosIcon />
          </a>
        )}
      </div>
    </>
  );
};

export default Slider;
