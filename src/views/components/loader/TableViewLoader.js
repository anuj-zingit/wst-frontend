import React from "react"
import LoaderWithoutCircle from "./LoaderWithoutCircle";

const TableViewLoader = (props) => (
    <div className="converHeight d-flex justify-content-center align-items-start flex-column pt-2">
        <LoaderWithoutCircle/>
        <LoaderWithoutCircle/>
    </div>
)

export default TableViewLoader