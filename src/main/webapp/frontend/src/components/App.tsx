import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import Main from "./Main/Main";
import styled from "styled-components";
import Logo from "./Sidebar/Logo";
import Boards from "./Sidebar/Boards";
import DayOrNight from "./Sidebar/DayOrNight";
import HideSidebar from "./Sidebar/HideSidebar";

export default function App() {
  return (
    <Layout>
      <Sidebar>
        <Logo className="demo" />
        <Boards demo="2"></Boards>
        <aside>
          <DayOrNight />
          <HideSidebar />
        </aside>
      </Sidebar>
      <Header>lorem</Header>
      <Main>lorem</Main>
    </Layout>
  );
}

const Layout = styled.div`
  display: grid;
  grid-template-areas:
    "sidebar header header header"
    "sidebar main main main";
  margin: 0 0;
  padding: 0 0;
  font-family: "Open Sans", sans-serif;
  color: white;
`;
