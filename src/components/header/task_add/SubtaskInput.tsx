import styled from "styled-components";
import { theme, ThemeContext } from "../../../styles/theme.styles";
import React, { createRef, useContext, useEffect } from "react";
import { iData } from "./TaskAdd";

function SubtaskInput({data, setData} : {data: iData, setData: (value: iData) => void}) {
  let i = 0
  console.log(data);
  return <div style={{ marginBottom: "2ch" }}>
    <h3 style={{ marginBottom: "0.3rem" }}>Subtasks</h3>
    {data.subtasks.map((subtask) => (
      <Input
        info={data}
        setInfo={setData}
        subtask={subtask}
        myKey={i++}
        key={i}
      />
    ))}
    <AddSubtask
      onClick={() => {
        let demo: iData = {
          title: data.title,
          desc: data.desc,
          subtasks: data.subtasks,
          status: data.status
        };
        demo.subtasks.push("");
        setData(demo);
      }}
      type="button"
    >
      + Add New Subtask
    </AddSubtask>
  </div>;
}

const AddSubtask = styled.button`
  height: 3.5rem;
  width: 100%;
  background-color: ${theme.clickable};
  color: ${() => useContext(ThemeContext)?.headers};
  border: none;
  border-radius: 0.7rem;
  font-size: ${theme.textSize};
  font-weight: ${theme.textWeight};
  cursor: pointer;
`;

const Input = (props: {
  info: iData;
  setInfo: (value: iData) => void;
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
    "▒▒▒▒█▄▄█░░█▄▄█░░░░░░█▄▄█░░█▄▄█"
  ];

  let ref: React.RefObject<HTMLInputElement> = createRef();

  useEffect(() => {
    ref.current!.value = props.info.subtasks[props.myKey];
  })

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        marginBottom: "0.3rem"
      }}
    >
      <input
        ref={ref}
        type="text"
        placeholder={easterEgg[props.myKey % 10]}
        onChange = {(event) => {
          props.info.subtasks[props.myKey] = event.target.value;
        }}
        onBlur={(event) => {
          handleSubtask(props.info, event, props.myKey);
        }}
        style={{
          width: "100%",
          height: "2.7rem",
          color: theme.textColor,
          border: "0.1rem solid " + theme.textColor,
          borderRadius: "0.7rem",
          fontSize: theme.textSize,
          fontWeight: theme.textWeight,
          backgroundColor: useContext(ThemeContext)?.form,
          marginRight: "1ch",
          boxSizing: "border-box",
          padding: "0 0.5ch 0 0.5ch"
        }}
      />
      <button
        onClick={() => {
          let demo: iData = {
            title: props.info.title,
            desc: props.info.desc,
            subtasks: props.info.subtasks,
            status: props.info.status
          };
          console.log(demo);
          demo.subtasks.splice(props.myKey, 1);
          console.log(demo);
          props.setInfo(demo);
        }}
        style={{
          backgroundColor: "inherit",
          border: "none",
          display: "inline"
        }}
        type="button"
      >
        <img
          src="/delete-subtask.svg"
          alt="Delete subtask"
          style={{
            width: theme.iconSize,
            filter: theme.iconColor,
            cursor: "pointer"
          }}
        />
      </button>
    </div>
  );
};

const handleSubtask = (
  info: iData,
  input: React.FocusEvent<HTMLInputElement>,
  myKey: number
) => {
  let dup = 0;
  info.subtasks.forEach((subtask) => {
    if (subtask === input.target.value) {
      dup += 1;
    }
  });
  if (dup === 1) {
    info.subtasks[myKey] = input.target.value;
  }
  else if (dup > 1) {
    info.subtasks[myKey] = "";
    input.target.value = "";
    input.target.placeholder = "Subtask name taken";
  }
};

export default SubtaskInput;