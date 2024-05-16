import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { store } from "../redux/store";
import { useCart } from "react-use-cart";
import { useCookies } from "react-cookie";
import Circle from "@uiw/react-color-circle";
import SearchIcon from "@mui/icons-material/Search";
interface Props {
  id: string;
  img: string;
  title: string;
  price: number;
  newprise?: string;
  alert: any;
  dangeralert: any;
}

import Link from "next/link";
const Card: React.FC<Props> = ({
  id,
  img,
  title,
  price,
  alert,
  dangeralert,
}) => {
  const dispatch = useDispatch();
  let [isthere, setisthere] = useState<boolean | string>("");
  let [data, setdata] = useState(store?.getState());
  const { addItem } = useCart();
  const [cookies, setCookie, getCookie] = useCookies(["user"]);

  let onclickalert = alert;
  let onclick2 = dangeralert;

  useEffect(() => {
    setisthere(false);
    data?.auth?.shopitems?.map((item: any) => {
      if (item?.id === id) {
        return setisthere(true);
      }
    });
  }, []);

  function increase() {
    let lable:any;
    lable = "labelCount";
    let countArry:any = getCookie(lable);
    setisthere(false);
    data?.auth?.shopitems?.map((item: any) => {
      if (item?.id === id) {
        return setisthere(true);
      }
    });
    countArry?.push(id?.toString());
    setCookie(lable, countArry);

    if (!isthere) {
      addItem({ id: id, price: price });
      dispatch({
        type: "add",
        payload: { id: id, image: img, price: price, title: title, number: 1 },
      });
      setisthere(true);
      setdata(store.getState());
      onclickalert();
    }
    if (isthere) {
      onclick2();
    }
  }
  const [hex, setHex] = useState("#F44E3B");

  return (
    <>
      <div className="cardbody ">
        <div className="thumb-wrapper">
          <div className="img-box">
            <img src={img} className="cardimg" alt="Headphone" />
          </div>
          <div className="thumb-content">
            <h4 className="text-light">{title}</h4>
            <p className="item-price text-light">
              <b className=" text-light">${price}</b>
              <div className="sizes text-light">
                <span>xl</span>
                <span>m</span>
                <span>sm</span>
              </div>
            </p>
            <hr />

            <div className="colors">
              <Circle
                colors={["#9c27b0", "#673ab7", "#3f51b5", "#2196f3"]}
                color={hex}
                pointProps={{
                  style: {
                   display:"flex",
                   flexDirection:"row",
                   justifyContent:"space-between",
                   padding:"5px",
                   margin:"5px 5px 0 5px"
                  },
                }}
                onChange={(color: any) => {
                  setHex(color.hex);
                }}
              />
            </div>
            <div className="sliderbtns">
              <Link
                href={`/item/${id}`}
                className="btn text-light border-bottom veiwbtn"
              >
                <SearchIcon className="searchicon"/>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
