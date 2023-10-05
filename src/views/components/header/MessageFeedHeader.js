import React, { Component } from "react";
import DefaultSelectBox from "../inputs/DefaultSelectBox";

class MessageFeedHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="section-header">
        <div className="d-flex flex-row align-items-center">
          <div className="d-flex flex-column justify-content-between">
            <h4>{this.props.heading}</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default MessageFeedHeader;
