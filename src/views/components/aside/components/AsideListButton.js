import React, {Component} from 'react';
import {Link} from "react-router-dom";

class AsideListButton extends Component {

    render() {
        return (
                <button className={this.props.classlink} onClick={this.props.click}>
                        <img className="inactiveIcon" src={this.props.iconInactive} alt='listIconLight'/>
                        <img className="activeIcon" src={this.props.iconActive} alt='listIconLight'/>
                        <span>{this.props.tabName}</span>
                </button>
        );
    }
}

export default AsideListButton;