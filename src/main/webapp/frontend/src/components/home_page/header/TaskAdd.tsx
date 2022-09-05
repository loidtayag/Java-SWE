import styled from "styled-components";
import React, { useContext, useState } from "react";
import { iBoard, iStatus, iSubtask, iTask } from "../../../utils/iDatabase";
import {
  getBoards,
  getSelectedBoard,
  spacing,
  Text,
  theme,
  ThemeContext,
} from "../../../utils/helpers";
import { Exit } from "../sidebar/BoardTitles";

const TaskAdd = (props: { setSelectedBoard: (value: iBoard) => void }) => {
  let [isOverlay, setIsOverlay] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setIsOverlay(true);
        }}
      >
        <Text style={{ color: useContext(ThemeContext).headers }}>
          + Add New Task
        </Text>
      </Button>
      {isOverlay && (
        <Overlay
          className={"foo"}
          setIsOverlay={setIsOverlay}
          setSelectedBoard={props.setSelectedBoard}
        />
      )}
    </>
  );
};

const Button = styled.button`
  color: #ffffff;
  background-color: ${theme.clickable};
  border: none;
  width: 18ch;
  height: 5ch;
  border-radius: 2.5ch;
  margin-right: ${spacing};
  cursor: pointer;
`;

interface iTaskInfo {
  title: string;
  desc: string;
  subtasks: string[];
  status: string;
}

const getStatuses = () => {
  // @ts-ignore
  return getSelectedBoard().status.map((status: iStatus) => status.name);
};

const Overlay = styled(
  (props: {
    className: string;
    setIsOverlay: (value: boolean) => void;
    setSelectedBoard: (value: iBoard) => void;
  }) => {
    const [info, setInfo] = useState<iTaskInfo>({
      title: "",
      desc: "",
      subtasks: [],
      status: getStatuses()[0],
    });
    return (
      <form
        onSubmit={(event) => {
          handleSubmit(event, props.setIsOverlay, info);
          props.setSelectedBoard(getSelectedBoard());
        }}
        className={props.className}
        style={{
          color: useContext(ThemeContext).headers,
          display: "flex",
          flexDirection: "column",
          padding: "2.5rem",
          justifyContent: "space-between",
          minHeight: "7rem",
          maxHeight: "100vh",
          overflow: "auto",
          // https://stackoverflow.com/questions/1776915/how-can-i-center-an-absolutely-positioned-element-in-a-div
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: theme.sizeText,
          fontWeight: theme.weightText,
          marginBottom: "2ch",
          borderRadius: "0.7rem",
          backgroundColor: useContext(ThemeContext).background,
        }}
      >
        <Exit
          type="button"
          onClick={() => {
            props.setIsOverlay(false);
          }}
        >
          <img
            src="/exit.svg"
            alt="Exit overlay"
            style={{
              cursor: "pointer",
              width: theme.iconSize,
              filter: theme.grayImg,
            }}
          />
        </Exit>
        <div style={{ marginBottom: "2ch" }}>
          <h3 style={{ marginBottom: "0.3rem" }}>Title</h3>
          <input
            id="title"
            type="text"
            required={true}
            placeholder="Plan A to becoming a millionaire"
            onBlur={(event) => {
              handleTitle(event, info);
            }}
            style={{
              height: "2.7rem",
              backgroundColor: useContext(ThemeContext).background,
              color: theme.grayText,
              border: "0.1rem solid " + theme.grayText,
              borderRadius: "0.7rem",
              fontSize: theme.sizeText,
              fontWeight: theme.weightText,
              width: "100%",
              boxSizing: "border-box",
              padding: "0 0.5ch 0 0.5ch",
            }}
          />
        </div>
        <div style={{ marginBottom: "2ch" }}>
          <h3 style={{ marginBottom: "0.3rem" }}>Description</h3>
          <input
            id="desc"
            type="text"
            required={true}
            placeholder="Sell a million 99s"
            onBlur={(event) => {
              handleDesc(event, info);
            }}
            style={{
              height: "2.7rem",
              backgroundColor: useContext(ThemeContext).background,
              color: theme.grayText,
              border: "0.1rem solid " + theme.grayText,
              borderRadius: "0.7rem",
              fontSize: theme.sizeText,
              fontWeight: theme.weightText,
              width: "100%",
              boxSizing: "border-box",
              padding: "0 0.5ch 0 0.5ch",
            }}
          />
        </div>
        <div style={{ marginBottom: "2ch" }}>
          <h3 style={{ marginBottom: "0.3rem" }}>Subtasks</h3>
          <Subtasks info={info} setInfo={setInfo} />
        </div>
        <div style={{ marginBottom: "2ch" }}>
          <h3 style={{ marginBottom: "0.3rem" }}>Status</h3>
          <select
            id="status"
            onBlur={(event) => {
              handleStatus(event, info);
            }}
            style={{
              height: "2.7rem",
              backgroundColor: useContext(ThemeContext).background,
              border: "0.1rem solid " + theme.grayText,
              borderRadius: "0.7rem",
              cursor: "pointer",
              color: theme.grayText,
              fontSize: theme.sizeText,
              fontWeight: theme.weightText,
            }}
          >
            <StatusOptions />
          </select>
        </div>
        <input
          type="submit"
          value="Create Task"
          style={{
            height: "3.5rem",
            backgroundColor: theme.clickable,
            color: useContext(ThemeContext).headers,
            border: "none",
            borderRadius: "0.7rem",
            fontSize: theme.sizeText,
            fontWeight: theme.weightText,
            cursor: "pointer",
          }}
        />
      </form>
    );
  }
)`
  position: fixed;
  width: 30vw;
  top: 43vh;
  left: 35vw;
  background-color: #2c2c38;
`;

const handleTitle = (
  input: React.FocusEvent<HTMLInputElement>,
  info: iTaskInfo
) => {
  info.title = input.target.value;
};

const handleDesc = (
  input: React.FocusEvent<HTMLInputElement>,
  info: iTaskInfo
) => {
  info.desc = input.target.value;
};

const handleStatus = (
  input: React.FocusEvent<HTMLSelectElement>,
  info: iTaskInfo
) => {
  info.status = input.target.value;
};

const StatusOptions = () => {
  let key = 0;
  return (
    <>
      {getStatuses().map((status: string) => (
        <option value={status} key={key++}>
          {status}
        </option>
      ))}
    </>
  );
};

const handleSubmit = (
  event: React.FormEvent<HTMLFormElement>,
  setIsOverlay: (value: boolean) => void,
  info: iTaskInfo
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
          if (selectedBoard.status[j].name === info.status) {
            let subTasks: iSubtask[] = info.subtasks
              .filter((subtask: string) => subtask)
              .map((subtask: string) => ({
                desc: subtask,
                finished: false,
              }));
            let task: iTask = {
              title: info.title,
              desc: info.desc,
              subtasks: subTasks,
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

  event.preventDefault();
  setIsOverlay(false);
};

const Subtasks = (props: {
  info: iTaskInfo;
  setInfo: (value: iTaskInfo) => void;
}) => {
  let i = 0;
  return (
    <div>
      {props.info.subtasks.map((subtask) => (
        <SubtaskInput
          info={props.info}
          setInfo={props.setInfo}
          subtask={subtask}
          myKey={i++}
        />
      ))}
      <AddSubtaskButton
        onClick={() => {
          /* Since setState does a shallow comparison to rerender and the fact that '=' assignment is referential for
          non-primitives makes the below necessary. So to solve this, create a new object and copy the old object to the
          new object.

          For the first problem, I can't be bothered to find a way to modify setState's comparison. So just doing a
          deep copy was the only option. No wonder it wouldn't work even if I modified the internals of StateP.
          For the second issue, doing 'demo = StateP' and modifying demo's internals wouldn't work because demo would
          actually be pointing to the same value as StateP. Thank god I console logged demo and StateP afterwards, found
          that StateP somehow magically changed as well which led to discovery of the second issue.
          */
          let demo: iTaskInfo = {
            title: props.info.title,
            desc: props.info.desc,
            subtasks: props.info.subtasks,
            status: props.info.status,
          };
          demo.subtasks.push("");
          props.setInfo(demo);
        }}
        type="button"
        style={{
          height: "3.5rem",
          width: "100%",
          backgroundColor: theme.clickable,
          color: useContext(ThemeContext).headers,
          border: "none",
          borderRadius: "0.7rem",
          fontSize: theme.sizeText,
          fontWeight: theme.weightText,
          cursor: "pointer",
        }}
      >
        + Add New Subtask
      </AddSubtaskButton>
    </div>
  );
};

const AddSubtaskButton = styled.button``;

const SubtaskInput = (props: {
  info: iTaskInfo;
  setInfo: (value: iTaskInfo) => void;
  subtask: string;
  myKey: number;
}) => {
  let easterEggArray = [
    "▒▒▒▒▒▒▒█▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█",
    "▒▒▒▒▒▒▒█░▒▒▒▒▒▒▒▓▒▒▓▒▒▒▒▒▒▒░█",
    "▒▒▒▒▒▒▒█░▒▒▓▒▒▒▒▒▒▒▒▒▄▄▒▓▒▒░█░▄▄",
    "▒▒▄▀▀▄▄█░▒▒▒▒▒▒▓▒▒▒▒█░░▀▄▄▄▄▄▀░░█",
    "▒▒█░░░░█░▒▒▒▒▒▒▒▒▒▒▒█░░░░░░░░░░░█",
    "▒▒▒▀▀▄▄█░▒▒▒▒▓▒▒▒▓▒█░░░█▒░░░░█▒░░█",
    "▒▒▒▒▒▒▒█░▒▓▒▒▒▒▓▒▒▒█░░░░░░░▀░░░░░█",
    "▒▒▒▒▒▄▄█░▒▒▒▓▒▒▒▒▒▒▒█░░█▄▄█▄▄█░░█",
    "▒▒▒▒█░░░█▄▄▄▄▄▄▄▄▄▄█░█▄▄▄▄▄▄▄▄▄█",
    "▒▒▒▒█▄▄█░░█▄▄█░░░░░░█▄▄█░░█▄▄█",
  ];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        marginBottom: "0.3rem",
      }}
    >
      <input
        type="text"
        placeholder={easterEggArray[props.myKey % 10]}
        onBlur={(event) => {
          handleSubtask(props.info, event, props.myKey);
        }}
        style={{
          width: "100%",
          height: "2.7rem",
          color: theme.grayText,
          border: "0.1rem solid " + theme.grayText,
          borderRadius: "0.7rem",
          fontSize: theme.sizeText,
          fontWeight: theme.weightText,
          backgroundColor: useContext(ThemeContext).background,
          marginRight: "1ch",
        }}
      />
      <button
        onClick={() => {
          let demo: iTaskInfo = {
            title: props.info.title,
            desc: props.info.desc,
            subtasks: props.info.subtasks,
            status: props.info.status,
          };
          demo.subtasks.splice(props.myKey, 1);
          props.setInfo(demo);
        }}
        style={{
          backgroundColor: "inherit",
          border: "none",
          display: "inline",
        }}
        type="button"
      >
        <img
          src="/delete-subtask.svg"
          alt="Delete subtask"
          style={{
            width: theme.iconSize,
            filter: theme.grayImg,
            cursor: "pointer",
          }}
        />
      </button>
    </div>
  );
};

const handleSubtask = (
  info: iTaskInfo,
  input: React.FocusEvent<HTMLInputElement>,
  myKey: number
) => {
  info.subtasks[myKey] = input.target.value;
};

export default TaskAdd;
