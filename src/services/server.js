import react, { useState, useEffect } from "react";

export default function Serverconnect() {
  const [content, setContent] = useState(null);

  const [search, setSearch] = useState("");
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((res) => {
        setContent(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return content;
}
