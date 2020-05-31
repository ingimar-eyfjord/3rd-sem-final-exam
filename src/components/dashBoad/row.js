import React, { useState, useEffect } from "react"
import Beercomponent from "./beerComponent"

export default function Rows({ beers, taps, pupularList }) {

    const mapped = beers.map((beer, index) => <Beercomponent alc={beer.alc} pupularList={pupularList} id={index} key={index} category={beer.category} label={beer.label} taps={taps} name={beer.name} popularity={beer.popularity} pouringSpeed={beer.pouringSpeed} />)
    return (
        <div className="BeerContainer">
            <div className="Rows">{mapped[0]}{mapped[1]}</div>
            <div className="Rows">{mapped[2]}{mapped[3]}</div>
            <div className="Rows">{mapped[4]}{mapped[5]}</div>
            <div className="Rows">{mapped[6]}{mapped[7]}</div>
            <div className="Rows">{mapped[8]}{mapped[9]}</div>
        </div>
    )
}



