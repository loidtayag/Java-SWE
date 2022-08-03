import styled from "styled-components";
import { ReactNode, useState } from "react";
import Logo from "./Sidebar/Logo";
import Boards from "./Sidebar/Boards";
import DayOrNight from "./Sidebar/DayOrNight";
import HideSidebar from "./Sidebar/HideSidebar";
import GlobalStyles from "./Sidebar/Global.styles";
import RevealSidebar from "./Sidebar/RevealSidebar";
import TaskHeading from "./Header/TaskHeading";
import TaskAdd from "./Header/TaskAdd";
import Settings from "./Header/Settings";
import TaskView from "./Main/TaskView";

export default function App() {
  const [showSidebar, isShowSidebar] = useState(true);
  const [tasks, isTasks] = useState();

  return (
    /* HideSidebar dependent on ID */
    <Grid id={showSidebar ? "showSidebar" : "hideSidebar"} className="foo">
      <GlobalStyles />
      {/* HideSidebar dependent on ID */}
      {showSidebar && (
        <Sidebar id="sidebar">
          <Logo />
          <Boards />
          <DayOrNight />
          <HideSidebar
            onClick={() => {
              isShowSidebar(!showSidebar);
            }}
          />
        </Sidebar>
      )}
      {!showSidebar && (
        <RevealSidebar
          onClick={() => {
            isShowSidebar(!showSidebar);
          }}
        />
      )}
      <Header>
        <TaskHeading>foo</TaskHeading>
        <nav>
          <TaskAdd />
          <Settings />
        </nav>
      </Header>
      {/* <section>: Used to either group different articles into different purposes or subjects, or to define the
      different sections of a single article. */}
      <TaskView />
    </Grid>
  );
}

const Grid = styled(
  ({
    id,
    className,
    children,
  }: {
    id: string;
    className: string;
    children: ReactNode;
  }) => (
    <div id={id} className={className}>
      {children}
    </div>
  )
)`
  /* White space is left at the bottom of the Grid */
  min-height: 100vh;
`;

const Sidebar = styled.nav`
  grid-area: sidebar;
  background-color: #2c2c38;
  display: flex;
  flex-direction: column;
  resize: horizontal;
  overflow: auto;
  /* Since it shows a white space if moved too far to the left */
  min-width: 20vw;
  /* Don't want resizing to create a horizontal scrollable */
  max-width: 80vw;
`;

const Header = styled.header`
  grid-area: header;
  background-color: #2c2c38;
  border: 0.3rem solid #21212d;
  display: flex;
  justify-content: space-between;
`;
