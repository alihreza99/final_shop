import React, { useRef, useState, useCallback } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import Select from "react-select";
import { city } from "../../services/data";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import dynamic from "next/dynamic";
import { ToastContainer, toast } from "react-toastify";
import { NextPage } from "next";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, FormLabel, Box } from "@mui/material";

const Map = dynamic(
  () => {
    return import("./map");
  },
  { ssr: false }
);

const Done: NextPage = () => {
  const sel1 = useRef<any>(null);
  const sel2 = useRef<any>(null);
  const notify = () => toast.success("آیتم با موفقیت اضافه شد");
  maptilersdk.config.apiKey = "iJSDRH4hvq23Ye9Ae39p";

  const [data, setData] = useState();
  const [data2, setData2] = useState();

  const schema = yup.object().shape({
    firstname: yup.string().required("لطفا نام خود را وارد کنید"),
    address: yup.string().required("لطفا آدرس خود را وارد کنید"),
    phone: yup.number().typeError("لطفا شماره خود را وارد کنید"),
    code: yup.number().typeError("لطفا کد پستی خود را وارد کنید"),
    lastname: yup.string().required("لطفا نام خانوادگی خود را وارد کنید"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema, schema, schema, schema, schema, schema),
  });

  const options = [
    { value: "1", label: "آذربایجان شرقی" },
    { value: "2", label: "آذربایجان غربی" },
    { value: "3", label: "اردبیل" },
    { value: "4", label: "اصفهان" },
    { value: "5", label: "البرز" },
    { value: "6", label: "ایلام" },
    { value: "7", label: "بوشهر" },
    { value: "8", label: "تهران" },
    { value: "9", label: "چهارمحال و بختیاری" },
    { value: "10", label: "خراسان جنوبی" },
    { value: "11", label: "خراسان رضوی" },
    { value: "12", label: "خراسان شمالی" },
    { value: "13", label: "خوزستان" },
    { value: "14", label: "زنجان" },
    { value: "15", label: "سمنان" },
    { value: "16", label: "سیستان و بلوچستان" },
    { value: "17", label: "فارس" },
    { value: "18", label: "قزوین" },
    { value: "19", label: "قم" },
    { value: "20", label: "کردستان" },
    { value: "21", label: "کرمان" },
    { value: "22", label: "کرمانشاه" },
    { value: "23", label: "کهگیلویه و بویراحمد" },
    { value: "24", label: "گلستان" },
    { value: "25", label: "گیلان" },
    { value: "26", label: "لرستان" },
    { value: "27", label: "مازندران" },
    { value: "28", label: "مرکزی" },
    { value: "29", label: "هرمزگان" },
    { value: "30", label: "همدان" },
    { value: "31", label: "یزد" },
  ];

  const cities = city.map((c, index) => {
    return { value: index, label: c.name };
  });

  const [isValid, setIsValid] = useState(true);
  const [isValid2, setIsValid2] = useState(true);

  const onSubmit = () => {
    setIsValid(data ? true : false);
    setIsValid2(data2 ? true : false);
    var intervalId = setInterval(function () {
      if (data && data2) {
        notify();
        sel1.current.clearValue();
        sel2.current.clearValue();
        location.replace("/");
      }
    }, 1000);
    setTimeout(function () {
      clearInterval(intervalId);
    }, 1500);
  };

  const [countryValue, setCountryValue] = useState(null);
  const { control } = useForm();
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
      <div className="done-page">
        <div>
          <form className="locations">
            <FormLabel sx={{ color: "white" }} className="formlable">
              <p>
                نام<sup className="errortext">*</sup>
              </p>
            </FormLabel>
            <div className="user-box">
              <input
                className="input"
                data-testid="name-input"
                {...register("firstname")}
                type="text"
              />

              <p className="errortext">{errors.firstname?.message as any}</p>
            </div>
            <FormLabel
              sx={{ color: "white" }}
              color="primary"
              className="formlable"
            >
              <p>
                نام خانوادگی<sup className="errortext">*</sup>
              </p>
            </FormLabel>
            <div className="user-box">
              <input
                className="input"
                {...register("lastname")}
                data-testid="pass-input"
                type="text"
              />

              <p className="errortext">{errors.lastname?.message as any}</p>
            </div>
            <FormLabel
              sx={{ color: "white" }}
              color="primary"
              className="formlable"
            >
              <p>
                موبایل<sup className="errortext">*</sup>
              </p>
            </FormLabel>
            <div className="user-box">
              <input
                className="input"
                {...register("phone")}
                data-testid="pass-input"
                type="number"
              />

              <p className="errortext">{errors.phone?.message as any}</p>
            </div>

            <FormLabel
              sx={{ color: "white" }}
              color="primary"
              className="formlable"
            >
              <p>
                کد پستی<sup className="errortext">*</sup>
              </p>
            </FormLabel>
            <div className="user-box">
              <input
                className="input"
                {...register("code")}
                data-testid="pass-input"
                type="number"
              />

              <p className="errortext">{errors.code?.message as any}</p>
            </div>

            <FormLabel
              sx={{ color: "white" }}
              color="primary"
              className="formlable"
            >
              <p>
                آدرس<sup className="errortext">*</sup>
              </p>
            </FormLabel>
            <div className="user-box">
              <textarea
                className="input"
                {...register("address")}
                data-testid="pass-input"
              />

              <p className="errortext">{errors.address?.message as any}</p>
            </div>
            <div className="locationsselect">
              <div>
                <Controller
                  name="country"
                  control={control}
                  render={() => (
                    <Select
                      className="location"
                      options={options}
                      ref={sel1}
                      onChange={(e: any) => setData(e?.value)}
                      placeholder={"استان ها"}
                      menuPlacement="top"
                    />
                  )}
                  rules={{ required: true }}
                />

                {!isValid && <p>لطفا استان خود را انتخاب کنید</p>}
              </div>
              <div>
                <Controller
                  name="country"
                  control={control}
                  render={() => (
                    <Select
                      className="location"
                      options={cities}
                      ref={sel2}
                      onChange={(e: any) => setData2(e?.value)}
                      value={cities.filter(function (option) {
                        return option.value === data2;
                      })}
                      placeholder={"شهر ها"}
                      menuPlacement="top"
                    />
                  )}
                  rules={{ required: true }}
                />

                {!isValid2 && <p>لطفا شهر خود را انتخاب کنید</p>}
              </div>
            </div>
            <div className="dobebtnparent">
              <Button
                id="buybtn"
                onClick={handleSubmit(onSubmit)}
                sx={{ width: "100px" }}
                variant="contained"
                color="primary"
              >
                <p>ثبت نهایی</p>{" "}
              </Button>
            </div>
          </form>
        </div>
        <div className="map-wrap">
          <Map />
        </div>
      </div>
    </>
  );
};

export default Done;
