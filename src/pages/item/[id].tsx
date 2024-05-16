import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NotFound from "@/components/notFound";
import Circle from "@uiw/react-color-circle";
import Nav from "../../layout/nav";
import { useCookies } from "react-cookie";
import { store } from "../../redux/store";
import { useCart } from "react-use-cart";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import Link from "next/link";
import LoginIcon from "@mui/icons-material/Login";
import Spin from "../../components/spin";
import "react-toastify/dist/ReactToastify.css";
import LocalMallIcon from "@mui/icons-material/LocalMall";

export default function Users({ data }: { data: any }) {
  const [hex, setHex] = useState("#F44E3B");
  const router = useRouter();
  const [cookies, setCookie, getCookie] = useCookies(["user"]);
  let [list, setlist] = useState(store.getState());
  let [isthere, setisthere] = useState<string | boolean>("");
  const errornotify = () => toast.error("آیتم قبلا خریداری شده");
  const notify = () => toast.success("آیتم با موفقیت اضافه شد");
  const { addItem } = useCart();
  const admin = useSelector((state: any) => state.auth.admin);
  const dispatch = useDispatch();
  const [cookie] = useCookies(["userToken"]);
  let lable: any;
  lable = "labelCount";
  useEffect(() => {
    setisthere(false);
    list?.auth?.shopitems?.map((item: any) => {
      if (item?.id === data?.id) {
        return setisthere(true);
      }
    });
  }, []);

  function increase() {
    let countArry: any = getCookie(lable);
    setisthere(false);
    list?.auth?.shopitems?.map((item: any) => {
      if (item?.id === data?.id) {
        return setisthere(true);
      }
    });
    countArry?.push(data?.id?.toString());
    setCookie(lable, countArry);

    if (!isthere) {
      addItem({ id: data?.id, price: data?.price });
      dispatch({
        type: "add",
        payload: {
          id: data?.id,
          image: data?.image,
          price: data?.price,
          title: data?.category,
          number: 1,
          color: hex,
        },
      });
      setisthere(true);
      setlist(store.getState());
      notify();
    }
    if (isthere) {
      errornotify();
    }
  }
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
  let num:any = parseInt(router?.query?.id as any);
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

      <Nav />
      {loading && <Spin />}
      {!loading && (
        <>
          {!((num as any) < 21) && <NotFound />}
          {(num as any) <= 0 && <NotFound />}
          {(num as any) < 21 && (num as any) > 0 && (
            <div className="oneiteminfo">
              <div className="infoimgpedar">
                <img src={data?.image} className="infoimg" alt="" />
              </div>
              <div className="infotexts">
                <div className="infotitle">
                  <div>
                    <h4>{data?.title}</h4>
                    <p className="infocat">{data?.category}</p>
                    <p className="infoprice">${data?.price}</p>
                    <hr />
                  </div>
                  <div>
                    <p className="infodes">{data?.description}</p>
                    <div>
                      <h4>colors: </h4>
                      <Circle
                        colors={[
                          "#f44336",
                          "#e91e63",
                          "#9c27b0",
                          "#673ab7",
                          "#3f51b5",
                          "#2196f3",
                        ]}
                        color={hex}
                        pointProps={{
                          style: {
                            marginRight: 20,
                          },
                        }}
                        onChange={(color: any) => {
                          setHex(color.hex);
                        }}
                      />
                    </div>
                    <div className="infobtns">
                      {!cookie?.userToken && (
                        <Link href="/auth/login/page" className="login">
                          <LoginIcon />
                          ورود
                        </Link>
                      )}
                      {cookie?.userToken && (
                        <Button
                          variant="contained"
                          onClick={increase}
                          id="buybtn"
                          className="btn btn-success"
                        >
                           <p>خرید</p>
                           <LocalMallIcon/>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export async function getServerSideProps({ params }: any) {
  const { id } = params;
  if (id > 0 && id < 21) {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await res.json();
    return {
      props: { data },
    };
  } else {
    return {
      props: {},
    };
  }
}
