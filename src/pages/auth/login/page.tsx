import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from "react-redux";
import { FormLabel, Button } from "@mui/material";
import { NextPage } from "next";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Spin from "../../../components/spin";
import LoginIcon from "@mui/icons-material/Login";
const schema = yup.object().shape({
  firstname: yup.string().required("لطفا نام خود را وارد کنید"),
  pass: yup
    .string()
    .required("لطفا رمز خود را وارد کنید")
    .min(4, "رمز شما باید حداقل دارای 4 عدد باشد"),
});

const Login: NextPage = () => {
  const dispatch = useDispatch();
  const recaptcha = useRef<any>();
  const [cookie, setCookie] = useCookies(["userToken"]);
  const notify = () => toast.error("روی گزینه من ربات نیستم کلیک کنید");
  const notify2 = () => toast.error("نام یا رمز وارد شده صحیح نیست");

  const users = useSelector((state: any) => state.auth.entities);
  let [viewModelstate, setviewModelstate] = useState({
    username: "",
    pass: "",
  });

  const handleChangename = (event: any) => {
    setviewModelstate({
      ...viewModelstate,
      username: event.target.value,
    });
  };
  const handleChangepass = (event: any) => {
    setviewModelstate({
      ...viewModelstate,
      pass: event.target.value,
    });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema, schema, schema, schema, schema, schema),
  });
  const axiosInstance = axios.create({
    baseURL: "https://fakestoreapi.com/",
  });

  

  const onSubmit = async () => {
    const captchaValue = recaptcha.current.getValue();
    if (!captchaValue) {
      notify();
    } else {
      if (
        viewModelstate.username == "mor_2314" &&
        viewModelstate.pass == "83r5^_"
      ) {
        fetch("https://fakestoreapi.com/auth/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: viewModelstate.username,
            password: viewModelstate.pass,
          }),
        })
          .then((res) => res.json())
          .then((json) => {
            setCookie("userToken", json, {
              maxAge: 3600 * 24,
              domain: "localhost",
              path: "/",
            }),
              reset();
            dispatch({
              type: "log",
              payload: { username: "admin" },
            });
            location.replace("/");
          });
      } else {
        notify2();
      }
    }
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
      {loading && <Spin />}
      {!loading && (
        <div className="login-box">
          <p>ورود</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel sx={{ color: "white" }} className="formlable">
              <p className="formlable_p">
                نام کاربری<sup className="errortext">*</sup>{" "}
              </p>
            </FormLabel>
            <div className="user-box">
              <input
                className="input"
                data-testid="name-input"
                {...register("firstname")}
                type="text"
                onChange={handleChangename}
              />
              <p className="errortext">{errors?.firstname?.message as any}</p>
            </div>
            <FormLabel
              sx={{ color: "white" }}
              color="primary"
              className="formlable"
            >
              <p className="formlable_p">
                رمز ورود<sup className="errortext">*</sup>
              </p>
            </FormLabel>
            <div className="user-box">
              <input
                className="input"
                {...register("pass")}
                data-testid="pass-input"
                type="password"
                onChange={handleChangepass}
              />
              <p className="errortext">{errors?.pass?.message as any}</p>
            </div>

            <Button variant="contained" id="buybtn" className="" type="submit">
              <LoginIcon/>
              ورود
            </Button>
          </form>
          <p className="linktootherpage">
            <div className="repacparent">
              <ReCAPTCHA
                ref={recaptcha}
                className="recap"
                hl="fa"
                sitekey="6Lf6KRQpAAAAAK0PHLUCqgyqHX_e8h2UsFMH7jyq"
              />
            </div>
          </p>
        </div>
      )}
    </>
  );
};

export default Login;

