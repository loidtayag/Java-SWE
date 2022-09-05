import { getBoards, getSelectedBoard, ThemeContext } from "../../utils/helpers";
import { iBoard, iStatus, iTask } from "../../utils/iDatabase";
import styled from "styled-components";
import React, { useContext, useEffect, useState } from "react";

const BoardView = (props: { selectedBoard: iBoard }) => {
  useEffect(() => {
    let dragula = require("react-dragula")();
    for (let i = otherKey.lol - 1; i > -1; i--) {
      dragula.containers.push(refs[i]);
    }
    dragula.on(
      "drop",
      function (
        el: HTMLDivElement,
        target: HTMLDivElement,
        source: HTMLDivElement
      ) {
        const from = source.parentNode?.textContent?.split(" ")[0];
        const to = target.parentNode?.textContent?.split(" ")[0];
        let selected = getSelectedBoard();
        let indexFromStatus = 0;
        let indexToStatus = 0;
        let indexFromTask = 0;
        let indexToTask = 0;
        let found = false;
        let temp: iTask[] | undefined = undefined;
        selected.status.forEach((status: iStatus) => {
          if (status.name === from) {
            let selectedTask = el.innerHTML.split("<br>");
            status.tasks.forEach((task: iTask) => {
              if (
                task.title === selectedTask[0] &&
                task.desc === selectedTask[1]
              ) {
                found = true;
              } else {
                if (!found) {
                  indexFromTask++;
                }
              }
            });
            temp = selected.status[indexFromStatus].tasks.splice(
              indexFromTask,
              1
            );
          } else {
            if (!found) {
              indexFromStatus++;
            }
          }
          if (status.name === to) {
            let prev = el.previousSibling;
            while (prev) {
              prev = prev.previousSibling;
              indexToTask++;
            }
            if (temp) {
              selected.status[indexToStatus].tasks.splice(
                indexToTask,
                0,
                temp[0]
              );
            }
          } else {
            indexToStatus++;
          }
        });
        let boards = getBoards();
        let i = 0;
        for (let board = boards[i]; board.name !== selected.name; i++) {}
        boards.splice(i, 1, selected);
        localStorage.setItem(
          "boards",
          JSON.stringify(boards as unknown as string)
        );
      }
    );
  }, [props.selectedBoard]);
  let key = 0;
  let otherKey = { lol: 0 };
  let [refs, setRefs] = useState<(HTMLDivElement | null)[]>([]);

  return (
    <Flex>
      {getSelectedBoard().status.map((status: iStatus) => (
        <Status key={key++}>
          <Name status={status} />
          <Tasks status={status} myKey={otherKey} refs={refs} />
        </Status>
      ))}
    </Flex>
  );
};

const Flex = styled.div`
  display: flex;
  background-color: ${() => useContext(ThemeContext).foreground};
`;

interface iKey {
  myKey: number;
}

const Status = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = (props: { status: iStatus }) => (
  <div>
    <img src="/moon.svg" alt="color" />
    {props.status.name + " "}
  </div>
);

const Tasks = (props: {
  status: iStatus;
  myKey: { lol: number };
  refs: (HTMLDivElement | null)[];
}) => {
  let key = 0;

  return (
    <>
      {props.status.tasks.map((task: iTask) => (
        <div
          style={{ backgroundColor: "blue" }}
          key={key++}
          ref={(ref) => {
            props.refs.push(ref);
            return props.refs[props.myKey.lol++];
          }}
        >
          <div>
            {task.title}
            <br />
            {task.desc}
          </div>
        </div>
      ))}
    </>
  );
};

export default BoardView;
