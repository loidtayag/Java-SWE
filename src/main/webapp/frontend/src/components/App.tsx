import styled from "styled-components";
import React, { ReactNode, useEffect, useState } from "react";
import Logo from "./home_page/sidebar/Logo";
import BoardTitles from "./home_page/sidebar/BoardTitles";
import DayOrNight from "./home_page/sidebar/DayOrNight";
import ShownSidebar from "./home_page/sidebar/ShownSidebar";
import GlobalStyles from "../styles/home_page/Global.styles";
import HiddenSidebar from "./home_page/sidebar/HiddenSidebar";
import BoardHeading from "./home_page/header/BoardHeading";
import TaskAdd from "./home_page/header/TaskAdd";
import Settings from "./home_page/header/Settings";
import { getBoards, getSelectedBoard } from "../utils/helperFunctions";
import BoardView from "./main/BoardView";

const App = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  const [selectedBoard, setSelectedBoard] = useState(getSelectedBoard());
  //Makes sure at least one board is initialised and a board is selected just to make NPE easier to deal with
  useEffect(() => {
    getBoards();
    getSelectedBoard();
  }, []);

  return (
    <>
      <GlobalStyles />
      <Grid id={isSidebar ? "showSidebar" : "hideSidebar"}>
        {isSidebar && (
          <Sidebar>
            <Logo />
            <BoardTitles setSelectedBoard={setSelectedBoard} />
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
          <BoardHeading>{selectedBoard.name}</BoardHeading>
          <TaskAdd />
          <Settings />
        </Header>
        <BoardView selectedBoard={selectedBoard} />
      </Grid>
    </>
  );
};

const Grid = styled.div.attrs(
  ({ id, children }: { id: string; children: ReactNode }) => ({
    id: id,
    children: children,
  })
)`
  /* White space is left at the bottom of the Grid */
  min-height: 100vh;
`;

const Sidebar = styled.div`
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

export default App;
