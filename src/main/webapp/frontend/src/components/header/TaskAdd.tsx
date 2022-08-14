import styled from "styled-components";

const TaskAdd = () => {
  return <Button myOnClick={demo}>Add Task</Button>;
};

const Button = styled.button.attrs(
  ({ myOnClick }: { myOnClick: () => void }) => ({
    onClick: myOnClick,
  })
)<{ myOnClick: () => void }>``;

function demo() {
  console.log("Ye");
}

export default TaskAdd;
