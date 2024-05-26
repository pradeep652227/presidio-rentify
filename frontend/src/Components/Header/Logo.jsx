/* eslint-disable react/prop-types */
import React from "react";

export default function Logo({className="",style={},...props}){
    const imgStyles={width:"70px",height:"70px",...style}
    return(
        <img src="https://cdn.pixabay.com/photo/2018/03/06/13/04/house-3203363_1280.jpg" style={imgStyles} className={`rounded-md ${className}`} {...props}/>
    );
}