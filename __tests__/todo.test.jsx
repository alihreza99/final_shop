import Logpage from "../src/pages/auth/login/page";
import Shop from "../src/pages/shop/page";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

describe("test", () => {
  it("test the app", () => {
    waitFor(() => {
      const log = render(<Logpage />);

      const logElement = log.getByTestId("name-input");

      const enterbtn = log.getByTestId("logbtn");

      fireEvent.change(logElement, { target: { value: "New log" } });

      fireEvent.click(enterbtn);

      const logeduser = log.findByText("New log");
      
      expect(logeduser).toBeInTheDocument();

      const shoppage = render(<Shop />);

      const shopitem = log.getByTestId("item");

      expect(shopitem).toBeInTheDocument();
    });
  });
});
