import React from "react";
import "./spinner.css";


export default function Spinner(props) {
    return (
        <div>
            <div className={`loading-spinner ${props.className}`}></div>
        </div>
    );
}
