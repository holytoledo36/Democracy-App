import React from "react";
import './BillBlock.css';
import { Link } from "react-router-dom";


const BillBlock = (props) => (
    <div className="col-4">
        <div className="card bill">
            <Link to={'/billdetail/' + props.id} >
                <h5 className="card-title">{props.title}</h5>
            </Link>
            <p className="card-text">{props.short_summary}</p>
            <strong>Bill ID: {props.id}</strong>
            <p>Introduced Date: {props.introduced_date}</p>
            <p>Last Action Date: {props.latest_major_action_date}</p>
            <Link to={'/billdetail/' + props.id} className="btn btn-primary">Bill Detail</Link>
        </div>
    </div>
);

export default BillBlock;

