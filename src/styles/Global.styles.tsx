import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html {
    font-size: 62.5%;
  }
  
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
    grid-template-columns: 1fr 5fr;
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
