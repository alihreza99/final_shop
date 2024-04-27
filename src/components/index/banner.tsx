import React from "react";
import Carousel from "react-material-ui-carousel";
import Item from "./item";
function Example() {
  var items = [
    {
      name: "Name #1",
      class: "yalda",
    },
    {
      name: "Name #2",
      class: "headphone",
    },
    {
      name: "Name #3",
      class: "pic3",
    },
  ];

  return (
    <Carousel className="ban">
      {items.map((item: any) => (
        <div>
          <Item key={item.id} item={item} />
        </div>
      ))}
    </Carousel>
  );
}

export default Example;

