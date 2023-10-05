import React, { Component } from "react";
import { Link } from "react-router-dom";

class TemplatesDropdown extends Component {
  render() {
    return (
      <>
        <div className="d-flex justify-content-end emoji-header go-template border-0">
          <Link to="/templates">
            <h4>Go to Templates</h4>
          </Link>
        </div>
        <div className="templates-drop-list">
          {this.props.templates && this.props.templates.length ? (
            this.props.templates.map((template, index) => {
              return (
                <div
                  key={index}
                  onClick={() => this.props.onSelectTemplate(template)}
                >
                  <h4>{template.name}</h4>
                  <p>{template.text}</p>
                </div>
              );
            })
          ) : (
            <p>No templates found.</p>
          )}
        </div>
      </>
    );
  }
}

export default TemplatesDropdown;
