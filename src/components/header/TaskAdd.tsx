import styled from "styled-components";
import React, { ReactNode, useContext, useState } from "react";
import { iBoard, iStatus, iSubtask, iTask } from "../../utils/localStorage";
import {
  getBoards,
  getSelectedBoard,
  Text,
  theme,
  ThemeContext,
} from "../../utils/helpers";
import { Exit } from "../sidebar/BoardTitles";

const TaskAdd = ({
  setSelectedBoard,
}: {
  setSelectedBoard: (value: iBoard) => void;
}) => {
  let [isOverlay, setIsOverlay] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setIsOverlay(true);
        }}
      >
        <Text style={{ color: "#ffffff" }}>+ Add New Task</Text>
      </Button>
      {isOverlay && (
        <Overlay
          className={"foo"}
          setIsOverlay={setIsOverlay}
          setSelectedBoard={setSelectedBoard}
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
  margin-right: 2ch;
  cursor: pointer;
`;

interface iTaskInfo {
  title: string;
  desc: string;
  subtasks: string[];
  status: string;
}

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
      status: firstStatus()[0],
    });
    return (
      <form
        onSubmit={(event) => {
          handleSubmit(event, props.setIsOverlay, info);
          props.setSelectedBoard(getSelectedBoard());
        }}
        className={props.className}
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
          <TitleInput info={info} className="foo" />
        </div>
        <div style={{ marginBottom: "2ch" }}>
          <h3 style={{ marginBottom: "0.3rem" }}>Description</h3>
          <DescriptionInput info={info} className="foo" />
        </div>
        <div style={{ marginBottom: "2ch" }}>
          <h3 style={{ marginBottom: "0.3rem" }}>Subtasks</h3>
          <Subtasks info={info} setInfo={setInfo} />
        </div>
        <div style={{ marginBottom: "2ch" }}>
          <h3 style={{ marginBottom: "0.3rem" }}>Status</h3>
          <StatusInput info={info} className="foo">
            <StatusOptions />
          </StatusInput>
        </div>
        <input
          type="submit"
          value="Create Task"
          style={{
            height: "3.5rem",
            backgroundColor: theme.clickable,
            color: useContext(ThemeContext)?.headers,
            border: "none",
            borderRadius: "0.7rem",
            fontSize: theme.sizeText,
            fontWeight: theme.weightText,
            cursor: "pointer",
            /* As you add more subtasks, height gets smaller, this prevents that */
            minHeight: "3.5rem",
          }}
        />
      </form>
    );
  }
)`
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
  font-size: ${theme.sizeText};
  font-weight: ${theme.weightText};
  margin-bottom: 2ch;
  border-radius: 0.7rem;
  background-color: ${() => useContext(ThemeContext)?.form};
  z-index: 1;
  ::-webkit-scrollbar {
    width: 1rem;
  }

  ::-webkit-scrollbar-track {
    background-color: ${() => useContext(ThemeContext)?.foreground};
    box-shadow: 0 0 20rem rgba(0, 0, 0, 0.2) inset;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    background-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      color-stop(0.85, rgb(122, 153, 217)),
      color-stop(0.5, rgb(73, 125, 189)),
      color-stop(0.25, rgb(43, 75, 172))
    );
  }
`;

function firstStatus() {
  return getSelectedBoard().status.map((status: iStatus) => status.name);
}

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

const TitleInput = styled((props: { info: iTaskInfo; className: string }) => (
  <input
    id="title"
    type="text"
    required={true}
    placeholder="Plan A to becoming a millionaire"
    onBlur={(event) => {
      handleTitle(event, props.info);
    }}
    className={props.className}
  />
))`
  height: 2.7rem;
  background-color: ${() => useContext(ThemeContext)?.form};
  color: ${theme.grayText};
  border: ${"0.1rem solid " + theme.grayText};
  border-radius: 0.7rem;
  font-size: ${theme.sizeText};
  font-weight: ${theme.weightText};
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.5ch 0 0.5ch;
`;

const handleTitle = (
  input: React.FocusEvent<HTMLInputElement>,
  info: iTaskInfo
) => {
  let isDuplicate = false;

  getSelectedBoard().status.forEach((status) => {
    status.tasks.forEach((task) => {
      if (task.title === input.target.value) {
        input.target.value = "";
        input.target.placeholder = "Task name taken";
      }
    });
  });

  if (input.currentTarget.value.length > 25) {
    input.currentTarget.placeholder =
      "Task name mustn't be greater than 25 characters";
    input.currentTarget.value = "";
  } else if (!isDuplicate) {
    info.title = input.target.value;
  }
};

const DescriptionInput = styled(
  (props: { info: iTaskInfo; className: string }) => (
    <input
      id="desc"
      type="text"
      required={true}
      placeholder="Sell a million 99s"
      onBlur={(event) => {
        props.info.desc = event.target.value;
      }}
      className={props.className}
    />
  )
)`
  height: 2.7rem;
  background-color: ${() => useContext(ThemeContext)?.form};
  color: ${theme.grayText};
  border: ${"0.1rem solid " + theme.grayText};
  border-radius: 0.7rem;
  font-size: ${theme.sizeText};
  font-weight: ${theme.weightText};
  width: 100%;
  box-sizing: border - box;
  padding: 0 0.5ch 0 0.5ch;
`;

const StatusInput = styled(
  (props: { info: iTaskInfo; children: ReactNode; className: string }) => (
    <select
      id="status"
      onBlur={(event) => {
        props.info.status = event.target.value;
      }}
      className={props.className}
    >
      {props.children}
    </select>
  )
)`
  height: 2.7rem;
  background-color: ${() => useContext(ThemeContext)?.form};
  border: ${"0.1rem solid " + theme.grayText};
  border-radius: 0.7rem;
  cursor: pointer;
  color: ${theme.grayText};
  font-size: ${theme.sizeText};
  font-weight: ${theme.weightText};
`;

const StatusOptions = () => {
  let key = 0;
  return (
    <>
      {firstStatus().map((status: string) => (
        <option
          value={status}
          key={key++}
          style={{ fontWeight: theme.weightText, color: theme.grayText }}
        >
          {status}
        </option>
      ))}
    </>
  );
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
          key={i}
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
      >
        + Add New Subtask
      </AddSubtaskButton>
    </div>
  );
};

const AddSubtaskButton = styled.button`
  height: 3.5rem;
  width: 100%;
  background-color: ${theme.clickable};
  color: ${() => useContext(ThemeContext)?.headers};
  border: none;
  border-radius: 0.7rem;
  font-size: ${theme.sizeText};
  font-weight: ${theme.weightText};
  cursor: pointer;
`;

const SubtaskInput = (props: {
  info: iTaskInfo;
  setInfo: (value: iTaskInfo) => void;
  subtask: string;
  myKey: number;
}) => {
  let easterEgg = [
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
        placeholder={easterEgg[props.myKey % 10]}
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
          backgroundColor: useContext(ThemeContext)?.form,
          marginRight: "1ch",
          boxSizing: "border-box",
          padding: "0 0.5ch 0 0.5ch",
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
  let dup = false;
  info.subtasks.forEach((subtask) => {
    if (subtask === input.target.value) {
      input.target.value = "";
      input.target.placeholder = "Subtask name taken";
      dup = true;
    }
  });
  if (!dup) {
    info.subtasks[myKey] = input.target.value;
  }
};

export default TaskAdd;
