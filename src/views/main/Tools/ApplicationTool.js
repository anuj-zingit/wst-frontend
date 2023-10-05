import React, { Component } from "react";
import Header from "../../components/header/Header";
import Creative from "./Creative";
import CoreApi from "../../../coreApi/CoreApi";

class ApplicationTool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tournament: null
        };
    }

    async componentDidMount() {
        let id = parseInt(this.props.location.search.replace(/\D/g, ""), 10);
        // get tournament details
        CoreApi.call("getTournamentById?id=" + id,'GET')
        .then((response) => {
           this.setState({ tournament: response });
        }).catch((error) => {
            console.log(error);
        });
        
        // get templates
    }

    render() {
        return (
            <>
                <Header props={this.props} />
                <div className="page-content message-feed">
                    <Creative
                    tournament = {this.state.tournament}/>
                </div>
            </>
        );
    }
}



export default ApplicationTool;