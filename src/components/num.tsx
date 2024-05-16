import React, { useState } from "react";
import { useDispatch } from "react-redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useCart } from "react-use-cart";
import { NextPage } from "next";

interface Props {
  title: string;
  pic: string;
  category: string;
  price: string;
  id: string;
  number: number;
  change: any;
  get: any;
}
const Num: NextPage<Props> = (props: any) => {
  const [num, setnum] = useState(props.number);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [itemtitle, setItemtitle] = useState("");
  const { removeItem, items } = useCart();
  const [content, setContent] = useState(null);
  const f = props.get;
  const handleClose = () => setShow(false);
  function handleShow(event: any) {
    setShow(true);
    setItemtitle(event);
  }
  function deleteitem(e: any) {
    console.log(e);
    fetch(`https://fakestoreapi.com/products/${e}`, {
      method: "DELETE",
    }).then(() => {
      setShow(false);
      const timeoutID = setTimeout(() => {
        dispatch({
          type: "deleteitem",
          payload: e,
        });
        removeItem(e);
        f();
        props.change();
      }, 200);
    });
  }
  return (
    <>
      <div className="shopnumber">
        <button
          className="additionbtn h6 text-light"
          onClick={() => {
            setnum(num + 1);
            f();
            dispatch({
              type: "plus",
              payload: {
                title: props.title,
                price: props.price,
                category: props.category,
                image: props.pic,
                fid: props.id,
                num: num,
              },
            });
          }}
        >
          +
        </button>
        <p>{num}</p>
        {num > 1 && (
          <button
            className="abatementbtn h6 text-light"
            onClick={() => {
              if (num != 1) {
                setnum(num - 1);
                f();
                dispatch({
                  type: "min",
                  payload: {
                    title: props.title,
                    price: props.price,
                    category: props.category,
                    image: props.pic,
                    fid: props.id,
                    num: num,
                  },
                });
              }
            }}
          >
            -
          </button>
        )}
        {num == 1 && (
          <button
            className="abatementbtn h6 text-light"
            onClick={() => {
              deleteitem(props.id);
            }}
          >
            <DeleteOutlineIcon />
          </button>
        )}
      </div>
    </>
  );
};

export default Num;
