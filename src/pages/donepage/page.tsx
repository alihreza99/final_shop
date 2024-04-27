import React from "react";
import Done from "../../components/donepage/done";
import Nav from "../../layout/nav";
import Footer from "../../layout/footer";
import { useSelector } from "react-redux";
import Notloged from "../../components/not_sign_in";
import { NextPage } from "next";
import Spin from "../../components/spin";
const page: NextPage = () => {
  const admin = useSelector((state: any) => state.auth.admin);
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
      {loading && <Spin />}
      {!loading && (
        <>
          {!admin && (
            <>
              <Notloged />
            </>
          )}
          {admin && (
            <>
              <div className="doneparent">
                <Nav />
                <Done />
                <Footer />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default page;
