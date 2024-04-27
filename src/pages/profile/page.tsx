import React from 'react'
import Prof from "../../components/profile/index"
import { useSelector } from "react-redux";
import Notloged from "../../components/not_sign_in"
export default function page() {
  const admin = useSelector((state: any) => state.auth.admin);

  return (
    <>
      {!admin && (
        <>
          <Notloged />
        </>
      )}
      {admin && (
        <>
          <Prof />
        </>
      )}
    </>
  );
}
