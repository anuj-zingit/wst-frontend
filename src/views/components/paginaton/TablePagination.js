import React, { Component } from "react";
import { Pagination } from "react-bootstrap";
import paginate from "../../../helpers/Paginate"; 

class TablePagination extends Component {
  render() {
    let { perPage, currentPage, total } = this.props;
    if (perPage === "All") {
      perPage = total;
    }


    let pages = paginate(total, currentPage, perPage);

    if (pages.pages.length === 1) {
      return <span />;
    }

    let start = this.props.perPage * (this.props.currentPage - 1) + 1;
    let end = this.props.perPage * this.props.currentPage;

    return (
      <Pagination
        style={{ padding: "0px 20px" }}
        className="d-flex align-items-center"
      >
        <span className="mr-4 number-text">
          Showing {start} to {end} of {this.props.total}
        </span>
        {this.props.currentPage !== 1 && <Pagination.Prev
          onClick={() =>
            this.props.onPaginate(parseInt(this.props.currentPage) - 1)
          }
        />}
        {pages.pages.map((page,index) => {
          return (
            <Pagination.Item
                active={index+1 === parseInt(this.props.currentPage) ? true : false}
              onClick={(e) => this.props.onPaginate(e.target.text)}
            >
              {page}
            </Pagination.Item>
          );
        })}
        {this.props.currentPage * perPage < this.props.total && <Pagination.Next
          onClick={() =>
            this.props.onPaginate(parseInt(this.props.currentPage) + 1)
          }
        />}
      </Pagination>
    );
  }
}

export default TablePagination;
