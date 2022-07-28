import styled from "styled-components";
import Logo from "./Sidebar/Logo";
import Boards from "./Sidebar/Boards";
import DayOrNight from "./Sidebar/DayOrNight";
import HideSidebar from "./Sidebar/HideSidebar";
import GlobalStyles from "./Sidebar/Global.styles";

export default function App() {
  return (
    /* HideSidebar dependent on ID */
    <Grid id="main">
      <GlobalStyles />
      {/* HideSidebar dependent on ID */}
      <Sidebar id="sidebar">
        <Logo />
        <Boards demo="foo" />
        <DayOrNight />
        <HideSidebar />
      </Sidebar>
      <Header>lorem</Header>
      <Main>lorem</Main>
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-areas:
    "sidebar header"
    "sidebar main";
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 1fr 9fr;
  /* Issue: White space is left at the bottom of the Grid */
  min-height: 100vh;
`;

const Sidebar = styled.nav`
  grid-area: sidebar;
  background-color: #2c2c38;
  display: flex;
  flex-direction: column;
`;

// let [Sidebar, isSidebar] = useState(Sidebar);

const Header = styled.div`
  grid-area: header;
  background-color: #2c2c38;
`;

const Main = styled.div`
  grid-area: main;
  background-color: #21212d;
`;
