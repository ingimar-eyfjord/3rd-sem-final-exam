import React, { useState, useEffect } from "react"
import imageHefe from "../../images/images/elhefe.png"
export default function Beercomponent(props) {
    return (
        <div className="BeerContainerSingle">
            <div dat-img={props.label} className="image"></div>
            <div className="beerinfo">
                <h2 className="beerTitle">{props.name}</h2>
                <p className="catagory">{props.category}</p>
                <p className="alc">{props.alc}</p>
                <p className="ml">500</p>
                <p className="price">50DKK</p>
            </div>
            <div className="tapInfo">
                <div className="tapcontent">
                    <p>TAP</p>
                    <p>3</p>
                </div>
            </div>
            <div className="Bartap"></div>
        </div>
    )
}