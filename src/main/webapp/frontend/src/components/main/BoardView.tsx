import { getSelectedBoard } from "../../utils/helperFunctions";
import { iBoard, iStatus, iTask } from "../../utils/iDatabase";
import styled from "styled-components";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const BoardView = (props: { selectedBoard: iBoard }) => {
  useEffect(() => {
    let dragula = require("react-dragula")();
    for (let i = otherKey.lol - 1; i > -1; i--) {
      dragula.containers.push(
        ReactDOM.findDOMNode(document.getElementById("container" + i))
      );
      // console.log(dragula.containers[i]);
    }
    dragula.on(
      "drop",
      function (el: any, target: any, source: any, sibling: any) {
        console.log(target);
      }
    );
  }, [props.selectedBoard]);
  let key = 0;
  let otherKey = { lol: 0 };

  return (
    <Flex>
      {getSelectedBoard().status.map((status: iStatus) => (
        <Status myKey={key++}>
          <Name status={status} />
          <Tasks status={status} myKey={otherKey} />
        </Status>
      ))}
    </Flex>
  );
};

const Flex = styled.div`
  display: flex;
`;

interface iKey {
  myKey: number;
}

const Status = styled.div.attrs((props: iKey) => ({
  key: props.myKey,
}))<iKey>`
  display: flex;
  flex-direction: column;
`;

const Name = (props: { status: iStatus }) => (
  <div>
    <img src="/moon.svg" alt="color" />
    {props.status.name}
  </div>
);

const Tasks = (props: { status: iStatus; myKey: { lol: number } }) => {
  return (
    <>
      {props.status.tasks.map((task: iTask) => (
        <div
          id={"container" + props.myKey.lol}
          // draggable="true"
          style={{ backgroundColor: "blue", height: "100%" }}
          // onDragStart={(event: React.DragEvent<HTMLDivElement>) => {
          //   handleDragStart(event);
          // }}
          key={props.myKey.lol++}
        >
          <div>
            <p>{task.title}</p>
            <p>{task.desc}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default BoardView;
