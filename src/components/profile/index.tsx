import React, { useEffect, useState } from "react";
import { store } from "../../redux/store";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import Nav from "../../layout/nav";
import Link from "next/link";
import { useSelector } from "react-redux";
import Notloged from "../not_sign_in";
import { NextPage } from "next";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const index: NextPage = () => {
  const [profile, setprofile] = useState<any>("");
  const dispatch = useDispatch();
  //@ts-ignore
  const admin = useSelector((state) => state.auth.admin);
  let [list, setlist] = useState(store.getState());
  useEffect(() => {
    //@ts-ignore
    setprofile(list.auth.admin);
  }, []);

  return (
    <>
      <Nav />
      {!admin && (
        <>
          <Notloged />
        </>
      )}
      {admin && (
        <>
          <div className="profileparent">
            <div className="profileleft">
              <PersonIcon className="personpic" />
              <h3>{profile?.username}</h3>
              <div>
                <p>ادمین فعال در سایت </p>
                <p>با آی-دی : {profile?.id} </p>
              </div>
              <Link
                href={"/"}
                className="plogout btn btn-danger"
                onClick={() => {
                  dispatch({
                    type: "logout",
                  });
                }}
              >
                <LogoutIcon />
                خروج
              </Link>
            </div>
            <div className="profileright">
              <table className="tablepedar">
                <thead></thead>
                <tbody className="table">
                  <tr>
                    <td>نام ادمین:</td>
                    <td>{profile.username}</td>
                  </tr>
                  <tr>
                    <td>ایمیل:</td>
                    <td>{profile.email}</td>
                  </tr>
                  <tr>
                    <td>آی-دی:</td>
                    <td>{profile.id}</td>
                  </tr>
                  <tr>
                    <td>سرمایه:</td>
                    <td>{profile.transaction}</td>
                  </tr>
                  <tr>
                    <td>وضعیت:</td>
                    <td>فعال</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default index;
