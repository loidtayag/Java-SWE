import styled from "styled-components";
import React, { ReactNode, useContext, useState } from "react";
import Logo from "./components/sidebar/Logo";
import BoardTitles from "./components/sidebar/BoardTitles";
import DayOrNight from "./components/sidebar/DayOrNight";
import ToggleSidebar from "./components/sidebar/ToggleSidebar";
import GlobalStyles from "./styles/Global.styles";
import HiddenSidebar from "./components/sidebar/HiddenSidebar";
import BoardName from "./components/header/BoardName";
import TaskAdd from "./components/header/TaskAdd";
import Settings from "./components/header/Settings";
import {
  getBoards,
  getSelectedBoard,
  getSelectedBoardIndex,
  theme,
  ThemeContext,
} from "./utils/helpers";
import ViewBoard from "./components/main/ViewBoard";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  //Makes sure at least one board is initialised and a board is selected just to make NPE easier to deal with
  getBoards();
  console.log(getSelectedBoardIndex());
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedBoard, setSelectedBoard] = useState(getSelectedBoard());
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("nightMode") ? true : false
  );
  const toggleTheme = () => {
    if (darkMode) {
      localStorage.setItem("nightMode", "false");
      setDarkMode(false);
    } else {
      localStorage.setItem("nightMode", "true");
      setDarkMode(true);
    }
  };

  return (
    <ThemeContext.Provider value={darkMode ? theme.dark : theme.light}>
      <GlobalStyles />
      <Grid id={showSidebar ? "showSidebar" : "hideSidebar"}>
        {showSidebar && (
          <Sidebar>
            <Logo />
            <BoardTitles setSelectedBoard={setSelectedBoard} />
            <div>
              <DayOrNight toggleTheme={toggleTheme} />
              <ToggleSidebar
                setShowSidebar={() => {
                  setShowSidebar(!showSidebar);
                }}
              />
            </div>
          </Sidebar>
        )}
        {!showSidebar && (
          <HiddenSidebar
            setIsSidebar={() => {
              setShowSidebar(!showSidebar);
            }}
          />
        )}
        <Header>
          <BoardName>{selectedBoard.name}</BoardName>
          <TaskAdd setSelectedBoard={setSelectedBoard} />
          <Settings />
        </Header>
        <ViewBoard
          selectedBoard={selectedBoard}
          setSelectedBoard={setSelectedBoard}
        />
      </Grid>
    </ThemeContext.Provider>
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

export default App;
