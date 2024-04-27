import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function ActionAreaCard() {
  return (
    <div className="box">
      <Card
        className="box1"
        sx={{ maxWidth: 345, bgcolor: "black", color: "white" }}
      >
        <CardActionArea>
          <div className="boximg1"></div>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              بروز
            </Typography>
            <Typography
              sx={{ color: "white" }}
              variant="body2"
              color="text.secondary"
            >
              بهترین لباس ها روز دنیا <br/>
              شیک باشید و شیک بپوشید
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card
        className="box2"
        sx={{
          maxWidth: 345,
          bgcolor: "black",
          color: "white",
        }}
      >
        <CardActionArea>
          <div className="boximg2"></div>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              کیفیت
            </Typography>
            <Typography
              sx={{ color: "white" }}
              variant="body2"
              color="text.secondary"
            >
              بالاترین کیفیت در بازار <br/>
              با خیالی راحت خرید کنید
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card
        className="box3"
        sx={{ maxWidth: 345, bgcolor: "black", color: "white" }}
      >
        <CardActionArea>
          <div className="boximg3"></div>

          <CardContent>
            <Typography
              sx={{ color: "white" }}
              gutterBottom
              variant="h5"
              component="div"
            >
              ارزان
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "white" }}
              color="text.secondary"
            >
              قیمتی متناسب <br/>
              با ضمانت یک ساله
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
