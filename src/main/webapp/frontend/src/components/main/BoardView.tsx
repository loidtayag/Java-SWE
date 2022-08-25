import { getSelectedBoard } from "../../utils/helperFunctions";
import { iBoard, iStatus, iTask } from "../../utils/iDatabase";
import styled, { createGlobalStyle } from "styled-components";
import React, { useEffect } from "react";

const BoardView = (props: { selectedBoard: iBoard }) => {
  useEffect(() => {
    const draggables = document.querySelectorAll(".draggable");
    const containers = document.querySelectorAll(".container");
  }, [props.selectedBoard]);

  let key = 0;

  return (
    <Flex>
      <GlobalStyle />
      {getSelectedBoard().status.map((status: iStatus) => (
        <Status key={key++}>
          <Name status={status} />
          <Tasks status={status} />
        </Status>
      ))}
    </Flex>
  );
};

const Flex = styled.div`
  display: flex;
`;

const Status = styled.div.attrs(() => ({
  className: "container",
}))`
  display: flex;
  flex-direction: column;
`;

const Name = (props: { status: iStatus }) => (
  <div>
    <img src="/moon.svg" alt="color" />
    {props.status.name}
  </div>
);

const Tasks = (props: { status: iStatus }) => {
  let key = 0;

  return (
    <>
      {props.status.tasks.map((task: iTask) => (
        <div
          className="draggable"
          draggable="true"
          style={{ cursor: "move", backgroundColor: "blue" }}
          onDragStart={(event: React.DragEvent<HTMLDivElement>) => {
            handleDragStart(event);
          }}
          key={key++}
        >
          <p>{task.title}</p>
          <p>{task.desc}</p>
        </div>
      ))}
    </>
  );
};

const handleDragStart = (event: React.DragEvent) => {
  console.log(event.currentTarget);
  event.currentTarget.setAttribute("id", "dragging");
  console.log(event.currentTarget);
};

const GlobalStyle = createGlobalStyle`
  #dragging {
    opacity: 0.2;
  }
`;

export default BoardView;
