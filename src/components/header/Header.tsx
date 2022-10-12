import styled from "styled-components";
import { ThemeContext } from "../../styles/theme.styles";
import { useContext } from "react";

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
