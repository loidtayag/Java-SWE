import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "../../utils/context";

const Header = styled.header`
  grid-area: header;
  background-color: ${() => useContext(ThemeContext)?.background};
  border-left: 3px solid ${() => useContext(ThemeContext)?.foreground};
  border-bottom: 3px solid ${() => useContext(ThemeContext)?.foreground};
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
`;

export default Header;
