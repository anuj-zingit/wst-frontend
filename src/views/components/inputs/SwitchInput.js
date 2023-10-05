import React from "react";
import {FormCheck} from "react-bootstrap";

function SwitchInput(props) {
    const [swt, setSwt] = React.useState(true);

    return (
        <FormCheck custom type="switch">
            <FormCheck.Input isInvalid checked={props.active}/>
            <FormCheck.Label onClick={() => setSwt(!swt)}>
                {` ${swt}`}
            </FormCheck.Label>
        </FormCheck>
    );
}

export default SwitchInput;
