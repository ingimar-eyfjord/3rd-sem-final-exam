import React, { useState, useEffect } from "react"
import SvgComponent from "./tap"
export default function Beercomponent(props) {
    let level = 0
    let tapsNum = []
    props.taps.forEach(e => {
        if (e.beer == props.name) {
            tapsNum.push(e.id)
            level = (e.level / e.capacity) * 100

        }
    })

    const tapsNumberStr = tapsNum.toString();
    const tapNumber = tapsNumberStr.replace(",", " - ");
    const dTagToPass = 240 - (level / 100) * 240
    const svgvalue = `M-1.6 14 h160 V` + dTagToPass + `H-5.89z`
    const idluminosity = `prefix__luminosity-noclip` + props.id + ``;
    const idprefixmask = `prefix__mask` + props.id + ``
    const maskurl = `url(#` + idprefixmask + `)`
    const filterurl = `url(#` + idluminosity + `)`
    const Serving = tapNumber != "" ? "Serving" : "Not"
    const colorcalcgreen = (level / 100) * 255
    const colorcalcred = 255 - (level / 100) * 255
    const color = `rgb(` + colorcalcred + `,` + colorcalcgreen + `, 000 )`

    let popularity = "normal"
    let thisPop = []
    for (let i = 0; i < 3; i++) {
        thisPop.push(props.pupularList[i])
    }
    if (props.pupularList > 0) {
        if (thisPop[0].Name == props.name) {
            popularity = "Most Popular"
        } else if (thisPop[1].Name == props.name || thisPop[2].Name == props.name) {
            popularity = "Popular"
        }
    }
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
            <div data-servingornot={Serving} className="tapInfo">
                <div className={popularity}>{popularity == "Most Popular" ? "Most Popular" : ""}</div>
                <div className="tapcontent">
                    <p>{tapNumber != "" ? "TAP" : "Not"}</p>
                    <p>{tapNumber != "" ? tapNumber : "Serving"}</p>
                </div>
            </div>
            {tapNumber != "" ? <SvgComponent idluminosity={idluminosity} color={color} filterurl={filterurl} maskurl={maskurl} idprefixmask={idprefixmask} key={props.id} svgvalue={svgvalue} className="tapINrow" /> : ""}
        </div>
    )
}