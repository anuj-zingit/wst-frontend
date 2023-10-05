import React, { useEffect } from "react";
import DefaultButton from "../buttons/DefaultButton";

const DeleteModal = (props) => {
  const { onConfirm } = props;
  return (
    <div className="dark d-flex flex-column justify-content-between align-items-center">
      <div class="sucess-header">
        <img src="../../../../images/icons/sucess-icon.png"/>
      </div>
      <div class="success-message-text">Password have been <br/> successfully updated</div>
      <div className="modal-footer close-buton border-0">
        <DefaultButton
          type={"delete"}
          loading={false}
          onClick={() => onConfirm()}
          name={"Close"}
          class={"save-button"}
        />
      </div>
    </div>
  );
};

export default DeleteModal;
