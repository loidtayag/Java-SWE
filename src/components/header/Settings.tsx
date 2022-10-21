import styled from "styled-components";
import { theme } from "../../styles/theme.styles";
import { iBoard } from "../../utils/interfaces";
import { getBoards } from "../../utils/helpers";
import { MutableRefObject } from "react";

const Settings = (props: { online: boolean, setOnline: (value: boolean) => void, offlineData: MutableRefObject<iBoard[]>, setSelectedBoard: (value: iBoard) => void, setBoardNames: (value: string[]) => void }) => {
  return (
    <Button style={{ backgroundColor: props.online ? "black" : "inherit"}}
            onClick={() => {
              if (props.online) {
                window.alert("Will now update local storage");
                localStorage.setItem("boards", JSON.stringify(props.offlineData.current));
                props.setSelectedBoard(props.offlineData.current[0]);
                props.setBoardNames(props.offlineData.current.map((board: iBoard) => board.name));
                props.setOnline(!props.online);
              } else {
                window.alert("Will now show user with id 0 in database because there's no account feature");
                fetch("http://localhost:5000/boards/0").then(res => res.json()).then(json => {
                  props.offlineData.current = getBoards();
                  localStorage.setItem("boards", JSON.stringify(json));
                  props.setSelectedBoard(json[0]);
                  props.setBoardNames(json.map((board: iBoard) => board.name));
                  props.setOnline(!props.online);
                });
              }
            }}>
      <Img alt="Settings" src={props.online ? "/go_offline.svg" : "/go_online.svg"} />
    </Button>
  );
};

const Button = styled.button`
  border: none;
  cursor: pointer;
  margin-right: 2ch;
  z-index: 2;
  border-radius: 1.5rem;
  padding: 0.5ch;
`;

const Img = styled.img`
  width: ${theme.iconSize};
  filter: ${theme.iconColor};
`;

export default Settings;
