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
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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
  const styleForPaper = {
    width: "20px",
    height: "20px",
  };

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

  const [all, setAll] = useState(store.getState()?.auth?.numbers);

  function getitems() {
    setTimeout(() => {
      setAll(store.getState()?.auth?.numbers);
      console.log(all);
    }, 100);
  }

  const handleClose = () => setShow(false);
  const changedata = () => setdata(store.getState());

  function add() {}

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
              {data?.auth?.shopitems?.length == 0 && (
                <>
                  <div className="emptyparent">
                    <h1 className="emptypage">سبد خرید شما خالی است!!</h1>
                  </div>
                  <Footer />
                </>
              )}
              {data?.auth?.shopitems?.length != 0 && (
                <div className="shoppedar">
                  <div className="shoppedaritems">
                    {data?.auth?.shopitems?.length != 0 && (
                      <>
                        <div className="shopleft">
                          <div className="shopminibox">
                            <div className="shopminibox-text">
                              <p className="text-light"> تعداد کالاها: </p>
                              <p className="text-light">{all}</p>
                            </div>
                            <div className="shop-btn">
                              <Link href="/donepage/page">
                                <Button
                                  variant="contained"
                                  id="buybtn"
                                  className="btn btn-success"
                                  type="submit"
                                >
                                  <LocalMallIcon style={styleForPaper} />
                                  <p>تکمیل خرید</p>{" "}
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
                      {data?.auth?.shopitems?.map(
                        (data: any, index: number) => {
                          return (
                            <>
                              <Card
                                className="boxitem"
                                sx={{
                                  maxWidth: 345,
                                  bgcolor: "black",
                                  color: "white",
                                }}
                              >
                                <CardActionArea>
                                  <img
                                    className="image"
                                    src={data?.image}
                                    alt="image"
                                  />
                                  <CardContent>
                                    <Typography
                                      gutterBottom
                                      variant="h5"
                                      component="div"
                                    >
                                      <span className="name">
                                        <b>{data?.title}</b>
                                      </span>
                                    </Typography>
                                    <Typography
                                      sx={{ color: "white" }}
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      <Num
                                        title={data?.title}
                                        category={data?.category}
                                        pic={data?.image}
                                        price={data?.price}
                                        id={data?.id}
                                        number={data?.number}
                                        change={changedata}
                                        get={getitems}
                                      />
                                    </Typography>
                                  </CardContent>
                                </CardActionArea>
                              </Card>
                            </>
                          );
                        }
                      )}
                    </div>
                  </div>
                  <Footer />
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Page;
