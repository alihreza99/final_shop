import React from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import Nav from "../layout/nav";
import Footer from "../layout/footer";
import Banner from "../components/index/banner";
import Box from "../components/index/boxes";
import List from "../components/index/items_slider";
import Info from "../components/index/info";
import Spin from "../components/spin";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
      <main>
        {loading && <Spin />}
        {!loading && (
          <div className="main">
            <Nav />
            <Banner />
            <Box/>
            <List />
            <Info />
            <Footer />
          </div>
        )}
      </main>
    </>
  );
}
