import React, {Component} from 'react';
import {Link} from "react-router-dom";

class AsideList extends Component {

    onClick = ()=>{
      if(this.props.onClick){
          this.props.onClick();
      }
    };
    render() {
        return (
                <Link className={this.props.classlink} to={this.props.link}  onClick={this.onClick} data-toggle={this.props.drop} >
                        <img className="inactiveIcon" src={this.props.iconInactive} alt='listIconLight'/>
                        <img className="activeIcon" src={this.props.iconActive} alt='listIconLight' />
                        <span>{this.props.tabName}</span>
                </Link>
        );
    }
}

export default AsideList;
