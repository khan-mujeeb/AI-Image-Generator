import React from "react";
import "./download.css";
import download from "../assets/download.svg";


export default function Download(props) {
    return (
        <a className={`download-btn ${props.className}`} href={props.url} download="download">
            <img className="download-img" src={download} alt="" />
        </a>
    );
}
