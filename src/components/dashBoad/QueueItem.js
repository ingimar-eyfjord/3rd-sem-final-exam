import React, { useState, useEffect } from "react";
export default function QueueItem(props) {
    let counts = {};
    props.order.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
    const beerNames = Object.keys(counts)
    const howManay = Object.values(counts)
    const mapped = beerNames.map((props, index) => <p className="Orderis" key={index} >{props} x {howManay[index]} </p >)
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

    let origName = "Program"
    const [orderName, setOrderName] = useState(origName)
    useEffect(() => {
        fetch(`https://foobarorders-577e.restdb.io/rest/orders?q={"orderID": ` + props.id + `}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-apikey": "5ecd2b70ae488b280ef33345",
                "cache-control": "no-cache"
            },
        }).then(res => res.json()).then(data => {
            if (data.length > 0) {
                console.log(data)
                const name = data[0].GuestName
                setOrderName(name)
            }

        });
    }, [])

    if (props.serving) {
        serving = "serving"
    }
    else { serving = "In queue" }
    return (
        <div style={props.style} data-serving={serving} key={props.id} className="Rows">
            <h2 className="Guest">{orderName}</h2>
            <div className="OrderBeers">
                {mapped}
            </div>
            <div className="statusInfo">
                <p className="status">Status: {serving}</p>
                <p >Ordered at: {time}</p>
            </div>
        </div>
    )
}