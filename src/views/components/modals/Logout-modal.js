import React, { useEffect } from "react";
import DefaultButton from "../buttons/DefaultButton";

const DeleteModal = (props) => {
  const { onClose, onDelete, deleting } = props;
  return (
    <div className="dark d-flex flex-column justify-content-between align-items-center">
      <div className="modal-header border-0 d-flex flex-column justify-content-between align-items-center px-4 text-center">
        
        <label class="mb-0">
          Are you sure you want to logout?
        </label>
      </div>
      <div className="modal-footer px-4 border-0">
        <DefaultButton
          type={"button"}
          onClick={() => onClose()}
          name={"Cancel"}
          class={"close-button"}
          loading={false}
        />
        <DefaultButton
          type={"delete"}
          loading={false}
          onClick={() => onDelete()}
          loading={deleting}
          name={"Logout"}
          class={"save-button"}
        />
      </div>
    </div>
  );
};

export default DeleteModal;
