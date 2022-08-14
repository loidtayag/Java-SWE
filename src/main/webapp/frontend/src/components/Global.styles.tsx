import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: "Open Sans", sans-serif;
  }

  #showSidebar {
    display: grid;
    grid-template-areas:
    "sidebar header"
    "sidebar main";
    grid-template-rows: 1fr 9fr;
    grid-template-columns: 1fr 4fr;
  }

  #hideSidebar {
    display: grid;
    grid-template-areas:
    "header"
    "main";
    grid-template-rows: 1fr 9fr;
  }
`;

export default GlobalStyles;

export const theme = { NIGHT: { NIGHT_DARK_NAVY: "#2c2c38" } };
