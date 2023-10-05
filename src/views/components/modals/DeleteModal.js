import React, { useEffect } from "react";
import DefaultButton from "../buttons/DefaultButton";

const DeleteModal = (props) => {
  const { onClose, onDelete, deleting,message,negativeButtonTitle,positiveButtonTitle } = props;
  return (
    <div className="dark d-flex flex-column justify-content-between align-items-center">
      <div className="modal-header border-0 d-flex flex-column justify-content-between align-items-center pt-4 pb-1 pl-3 pr-3 text-center">
        <h4 className="mb-2">Are you sure?</h4>
        <label class="pt-3 mb-0">
            {message ? message : 'Do you really want to delete these records? This process cannot be undone.'}

        </label>
      </div>
      <div className="modal-footer border-0">
        <DefaultButton
          type={"button"}
          onClick={() => onClose()}
          name={negativeButtonTitle||"Cancel"}
          class={"close-button"}
          loading={false}
        />
        <DefaultButton
          type={"delete"}
          loading={false}
          onClick={() => onDelete()}
          loading={deleting}
          name={positiveButtonTitle||'Delete'}
          class={"save-button"}
        />
      </div>
    </div>
  );
};

export default DeleteModal;
