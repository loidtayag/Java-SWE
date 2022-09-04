import styled from "styled-components";
import React, { ReactNode, useContext, useState } from "react";
import Logo from "./home_page/sidebar/Logo";
import BoardTitles from "./home_page/sidebar/BoardTitles";
import DayOrNight from "./home_page/sidebar/DayOrNight";
import ShownSidebar from "./home_page/sidebar/ShownSidebar";
import GlobalStyles from "../styles/home_page/Global.styles";
import HiddenSidebar from "./home_page/sidebar/HiddenSidebar";
import BoardName from "./home_page/header/BoardName";
import TaskAdd from "./home_page/header/TaskAdd";
import Settings from "./home_page/header/Settings";
import {
  getBoards,
  getSelectedBoard,
  theme as iTheme,
  ThemeContext,
} from "../utils/helpers";
import BoardView from "./main/BoardView";
import Header from "./home_page/header/Header";

const App = () => {
  //Makes sure at least one board is initialised and a board is selected just to make NPE easier to deal with
  getBoards();
  const [isSidebar, setIsSidebar] = useState(true);
  const [selectedBoard, setSelectedBoard] = useState(getSelectedBoard());
  const [theme, setTheme] = useState(useContext(ThemeContext));
  const toggleTheme = () => {
    if (theme === iTheme.light) {
      setTheme(iTheme.dark);
    } else {
      setTheme(iTheme.light);
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      <GlobalStyles />
      <Grid id={isSidebar ? "showSidebar" : "hideSidebar"}>
        {isSidebar && (
          <Sidebar>
            <Logo />
            <BoardTitles setSelectedBoard={setSelectedBoard} />
            <div>
              <DayOrNight toggleTheme={toggleTheme} />
              <ShownSidebar
                setIsSidebar={() => {
                  setIsSidebar(!isSidebar);
                }}
              />
            </div>
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
          <BoardName>{selectedBoard.name}</BoardName>
          <TaskAdd setSelectedBoard={setSelectedBoard} />
          <Settings />
        </Header>
        <BoardView selectedBoard={selectedBoard} />
      </Grid>
    </ThemeContext.Provider>
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
  background-color: ${() => useContext(ThemeContext).background};
  display: grid;
  flex-direction: column;
  resize: horizontal;
  overflow: auto;
  padding-left: 2vw;
  /* Since it shows a white space if moved too far to the left */
  min-width: 15vw;
  /* Don't want resizing to create a horizontal scrollable */
  max-width: 78vw;
  grid-template-rows: 1fr 9fr auto;
`;

export default App;
