import React, { Component } from 'react';

function Status(props) {
        let result = <span key={props.key}></span>;
        if(props.status === 0){
            result = <span key={props.key}>Progress</span>
        }
        const update = [];
        update.push(result);
        return(
            {
                result
            }
        );
}

export default Status;