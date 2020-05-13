import React, { useState, useEffect } from "react"
export default function QueueItem(props) {
    const mapped = props.order.map((props, index) => <p className="Orderis" key={props.id + index} > {props}</p >)
    const a = new Date(props.startTime);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    let serving = ""
    if (props.serving.length > 0) {
        props.serving.forEach(e => {
            if (e.id == props.id) {
                serving = "serving"
                props.deleteServedItems(props.id)
            }
            else { serving = "notServing" }
        })
    }
    return (
        <div style={props.style} data-serving={serving} key={props.id} className="Rows">
            <h2 className="Guest">Guest: {props.id}</h2>
            {mapped}
            <p >Ordered at: {time}</p>
        </div>
    )
}