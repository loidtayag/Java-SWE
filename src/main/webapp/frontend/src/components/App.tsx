import styled from "styled-components";
import React, { ReactNode, useState } from "react";
import Logo from "./sidebar/Logo";
import BoardTitles from "./sidebar/BoardTitles";
import DayOrNight from "./sidebar/DayOrNight";
import ShownSidebar from "./sidebar/ShownSidebar";
import GlobalStyles from "./Global.styles";
import HiddenSidebar from "./sidebar/HiddenSidebar";
import TaskHeading from "./header/TaskHeading";
import TaskAdd from "./header/TaskAdd";
import Settings from "./header/Settings";
import TaskView from "./main/TaskView";
import { iBoard } from "./iDatabase";

export default function App() {
  const [isSidebar, setIsSidebar] = useState(true);
  let boards: iBoard[] = localStorage.getItem("boards")
    ? JSON.parse(localStorage.getItem("boards") as string)
    : [];

  return (
    /* id affects layout of grid */
    <Grid id={isSidebar ? "showSidebar" : "hideSidebar"} className="foo">
      <GlobalStyles />
      {isSidebar && (
        <Sidebar>
          <Logo />
          <BoardTitles boards={boards} />
          <DayOrNight />
          <ShownSidebar
            setIsSidebar={() => {
              setIsSidebar(!isSidebar);
            }}
          />
        </Sidebar>
      )}
      {!isSidebar && (
        <HiddenSidebar
          setIsSidebar={() => {
            setIsSidebar(!isSidebar);
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

const Grid = styled.div.attrs(
  ({ id, children }: { id: string; children: ReactNode }) => ({
    id: id,
    children: children,
  })
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
