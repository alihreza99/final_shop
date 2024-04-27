import React, { useEffect, useState } from "react";
import { store } from "../../redux/store";
import { useDispatch } from "react-redux";
import Num from "../../components/num";
import Link from "next/link";
import { useCart } from "react-use-cart";
import Nav from "../../layout/nav";
import Footer from "../../layout/footer";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import Notloged from "../../components/not_sign_in";
import { NextPage } from "next";
import { Button } from "@mui/material";
import Spin from "../../components/spin";

const Page: NextPage = () => {
  const [cookies, setCookie, getCookie] = useCookies(["user"]);
  const admin = useSelector((state: any) => state.auth.admin);
  let lable: any;
  lable = "labelCount";
  const [content, setContent] = useState(null);
  const { removeItem, items } = useCart();
  const [listShop, setListShop] = useState(getCookie(lable));
  let [data, setdata] = useState(store.getState());
  const [show, setShow] = useState(false);
  const [itemtitle, setItemtitle] = useState("");
  const dispatch = useDispatch();
  const { isEmpty, totalItems } = useCart();

  const [loading, setLoading] = React.useState(true);
  const timer = React.useRef<any>();
  React.useEffect(() => {
    setLoading(true);
    timer.current = window.setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((res) => {
        setContent(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClose = () => setShow(false);
  const changedata = () => setdata(store.getState());

  function handleShow(event: any) {
    setShow(true);
    setItemtitle(event);
  }
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <>
      {loading && <Spin />}
      {!loading && (
        <>
          {" "}
          {!admin && (
            <>
              <Notloged />
            </>
          )}
          {admin && (
            <>
              <Nav />
              {/* @ts-ignore */}

              {data?.auth.shopitems?.length == 0 && (
                <div className="emptyparent">
                  <h1 className="emptypage">سبد خرید شما خالی است!!</h1>
                </div>
              )}
              <div className="shoppedar">
                <div className="shoppedaritems">
                  {/* @ts-ignore */}

                  {data?.auth.shopitems?.length != 0 && (
                    <>
                      <div className="shopleft">
                        <div className="shopminibox">
                          <div className="shopminibox-text">
                            <p className="text-light"> تعداد کالاها: </p>
                            <p className="text-light"> {totalItems} </p>
                          </div>
                          <div className="shop-btn">
                            <Link href="/donepage/page">
                              <Button
                                variant="contained"
                                id="buybtn"
                                className="btn btn-success"
                                type="submit"
                              >
                                ثبت نهایی
                              </Button>
                            </Link>
                          </div>
                        </div>
                        <div className="shopleft-text">
                          <p>
                            ارسال رایگان سفارش‌ها برای اعضای شاپلاین ۴۹
                            هزارتومان هزینه ارسال به سراسر ایران برای کاربران
                            غیر شاپلاین
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="pedarshop">
                    {/* @ts-ignore */}

                    {data?.auth.shopitems?.map((data: any, index: number) => {
                      return (
                        <>
                          <div
                            data-testid="item"
                            className="item-kharid"
                            key={index}
                          >
                            <img
                              className="image"
                              src={data?.image}
                              alt="image"
                            />
                            <br />
                            <span className="name">
                              <b>{data?.title}</b>
                            </span>
                            <br />
                            <span className="category">{data?.category}</span>
                            <br />
                            <span className="price">قیمت = ${data?.price}</span>
                            <br />
                            <Num
                              title={data?.title}
                              category={data?.category}
                              pic={data?.image}
                              price={data?.price}
                              id={data?.id}
                              number={data?.number}
                              change={changedata}
                            />
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
                <Footer />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Page;
