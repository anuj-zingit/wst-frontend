import React, { Component } from "react";
import { Link } from "react-router-dom";
import ConversationSearchInput from "../../components/inputs/ConversationSearchInput";
class SectionHeader extends Component {
  render() {
    const { buttonHeading, heading, query, onChange } = this.props;
    return (
      <div className="section-header">
        {/* <div className="d-flex flex-row align-items-center">
          <div className="d-flex flex-column justify-content-between">
            <h4>{heading}</h4>
          </div>
        </div> */}
        <div className="d-flex flex-row template-search">
          <div className="newsearch-design px-2 mx-3">
            <ConversationSearchInput
              value={query}
              onChange={onChange}
              placeholder="Search"
              class="conversation-input mb-0 "
            />
            <img src="../../../../images/icons/searchnew.svg"/>
          </div>
          <button
            onClick={() => this.props.onAddClicked()}
            className="page-header-button green"
          >
            {buttonHeading}
          </button>
        </div>
      </div>
    );
  }
}

export default SectionHeader;
