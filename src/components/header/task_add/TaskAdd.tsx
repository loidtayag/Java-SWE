import styled from "styled-components";
import React, { useContext, useState } from "react";
import { iBoard, iSubtask, iTask } from "../../../utils/interfaces";
import {
  getBoards,
  getSelectedBoard, getStatuses
} from "../../../utils/helpers";
import { theme, ThemeContext, scrollTheme } from "../../../styles/theme.styles";
import EnterOverlay from "./EnterOverlay";
import ExitOverlay from "./ExitOverlay";
import TitleInput from "./TitleInput";
import DescriptionInput from "./DescriptionInput";
import StatusInput from "./StatusInput";
import SubtaskInput from "./SubtaskInput";

const TaskAdd = ({ setSelectedBoard }: { setSelectedBoard: (value: iBoard) => void }) => {
  const [overlay, setOverlay] = useState(false);
  const [data, setData] = useState<iData>({
    title: "",
    desc: "",
    subtasks: [],
    status: getStatuses()[0]
  });

  return (
    <>
      <EnterOverlay setOverlay={setOverlay}>+ Add New Task</EnterOverlay>
      {overlay &&
        <Form
          onSubmit={(e) => {
            handleSubmit(e, setOverlay, data);
            setSelectedBoard(getSelectedBoard());
            setData({
              title: "",
              desc: "",
              subtasks: [],
              status: getStatuses()[0]
            });
          }}
        >
          <ExitOverlay setOverlay={setOverlay} setData={setData}/>
          <TitleInput data={data} />
          <DescriptionInput data={data} />
          <SubtaskInput data={data} setData={setData} />
          <StatusInput data={data} />
          <Submit>Add Task</Submit>
        </Form>
      }
    </>
  );
};

export interface iData {
  title: string;
  desc: string;
  subtasks: string[];
  status: string;
}

const Form = styled.form`
  width: 30vw;
  color: ${() => useContext(ThemeContext)?.headers};
  display: flex;
  flex-direction: column;
  padding: 2.5rem;
  justify-content: space-between;
  min-height: 7rem;
  max-height: 50vh;
  overflow: auto;
  // https://stackoverflow.com/questions/1776915/how-can-i-center-an-absolutely-positioned-element-in-a-div
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: ${theme.textSize};
  font-weight: ${theme.textWeight};
  margin-bottom: 2ch;
  border-radius: 0.7rem;
  background-color: ${() => useContext(ThemeContext)?.form};
  z-index: 1;
  ${scrollTheme};
`;

const handleSubmit = (
  e: React.FormEvent<HTMLFormElement>,
  setOverlay: (value: boolean) => void,
  data: iData
) => {
  const boards: iBoard[] = getBoards();
  const selectedBoard: iBoard = getSelectedBoard();
  //Finding board
  for (let i = 0; i < boards.length; i++) {
    //Found board
    if (boards[i].name === selectedBoard.name) {
      //Finding status
      if (selectedBoard.status) {
        for (let j = 0; j < selectedBoard.status.length; j++) {
          //Found status
          if (selectedBoard.status[j].name === data.status) {
            let subTasks: iSubtask[] = data.subtasks
              .filter((subtask: string) => subtask)
              .map((subtask: string) => ({
                desc: subtask,
                finished: false
              }));
            let task: iTask = {
              title: data.title,
              desc: data.desc,
              subtasks: subTasks
            };
            // @ts-ignore
            boards[i].status[j].tasks.push(task);
            localStorage.setItem("boards", JSON.stringify(boards));
            break;
          }
        }
      }
      break;
    }
  }

  e.preventDefault();
  setOverlay(false);
};

const Submit = styled.button`
  height: 3.5rem;
  background-color: ${theme.clickable};
  color: ${() => useContext(ThemeContext)?.headers};
  border: none;
  border-radius: 0.7rem;
  font-size: ${theme.textSize};
  font-weight: ${theme.textWeight};
  cursor: pointer;
  /* As you add more subtasks, height gets smaller, this prevents that */
  min-height: 3.5rem;
`;

export default TaskAdd;
