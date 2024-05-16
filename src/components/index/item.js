import { Paper } from "@mui/material";

export default function Item(props) {
  return (
    <>
      <div className="baneritem">
        <div className="baneritemtexts">
          <h2>شاپلاین</h2>
          <p>
            سایتی مطمعن برای خریدی آسان
            <br />
            خرید خود را به ما بسپارین
          </p>
        </div>
        <Paper className={props.item.class}></Paper>
      </div>
    </>
  );
  
}
