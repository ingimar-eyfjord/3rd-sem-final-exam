import React, { useState, useEffect } from "react"
import Beercomponent from "./beerComponent"

export default function Rows({ beers }) {
    const mapped = beers.map((beer) => <Beercomponent alc={beer.alc} category={beer.category} label={beer.label} name={beer.name} popularity={beer.popularity} pouringSpeed={beer.pouringSpeed} />)
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