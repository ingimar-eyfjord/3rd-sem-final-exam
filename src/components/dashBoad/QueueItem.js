import React, { useState, useEffect } from "react";
import Moment from 'react-moment';
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

    const randomNames = ["Mario", "Luigi", "Bowser", "Yoshi", "Wario", "Toad", "Princess Peach", "Princess Daisy", "Rosalina", "Diddy Kong", "Toadsworth", "Scorpion"]


    let origName = "Program"
    origName = randomNames[getRandomIntInclusive(0, 11)]

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
                const name = data[0].GuestName
                setOrderName(name)
            }

        });
    }, [])



    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }

    if (props.serving) {
        serving = "Now serving"
    }
    else { serving = "In queue" }
    let who = ""
    props.bartenders.forEach(e => {
        if (e.servingCustomer === props.id) {
            who = e.name
        }
    })
    return (
        <div style={props.style} data-serving={serving} key={props.id} className="Rows">
            <h2 className="Guest">{orderName} | order #{props.id}</h2>
            <div className="OrderBeers">
                {mapped}
            </div>
            <div className="statusInfo">
                <p className="status">{serving}</p>
                {serving === "Now serving" ? <p>Served by: {who}</p> : ""}
                <p className="moment" >Ordered: <Moment fromNow>{time}</Moment></p>
            </div>
        </div>
    )
}