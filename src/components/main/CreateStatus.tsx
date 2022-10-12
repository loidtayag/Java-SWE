import { InputModal, LabelModal } from "./OverlayModal";
import React, { MutableRefObject } from "react";
import { iBoard } from "../../utils/database";

function CreateStatus({
  selectedBoard,
  data,
}: {
  selectedBoard: iBoard;
  data: MutableRefObject<{
    hack: string;
    selectedStatus: number;
    selectedTask: number;
  }>;
}) {
  return (
    <>
      <LabelModal>Name</LabelModal>
      <InputModal
        type="text"
        placeholder="Finished"
        onBlur={(event) => {
          preventDuplicate(event, selectedBoard, data.current);
        }}
        required={true}
      />
      <InputModal type="submit" value={"Add Column"} />
    </>
  );
}

function preventDuplicate(
  event: React.FocusEvent<HTMLInputElement>,
  selectedBoard: iBoard,
  data: { hack: string }
) {
  let input = event.currentTarget.value;
  const filteredStatuses = selectedBoard.status.filter(
    (status) => status.name === input
  );

  if (input.length > 20) {
    event.currentTarget.placeholder =
      "Status name mustn't be greater than 20 characters";
    event.currentTarget.value = "";
  } else if (filteredStatuses.length === 1) {
    event.currentTarget.placeholder = "Status name is taken";
    event.currentTarget.value = "";
  } else {
    data.hack = input;
  }
}

export default CreateStatus;
