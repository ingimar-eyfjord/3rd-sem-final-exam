import React, { useState, useEffect } from "react"
import SvgPopular from "../popular"
import SvgMost from "../mostPopular"
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
    const colorcalcblue = (level / 100) * 255
    const color = `rgb( 000 ,` + colorcalcgreen + `, ` + colorcalcblue + `)`


    let popularity = "normal"

    if (props.thisPop.length === 3) {
        if (props.thisPop[0].name === props.name) {
            popularity = "Most Popular"
        } else {
            if (props.thisPop[1].name === props.name || props.thisPop[2].name === props.name) {
                popularity = "Popular"
            }
        }
    }
    const Tapmap = tapsNum.map((e, index) => <SvgComponent key={index} idluminosity={idluminosity} color={color} filterurl={filterurl} maskurl={maskurl} idprefixmask={idprefixmask} svgvalue={svgvalue} className="tapINrow" />)
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
                {popularity == "Most Popular" ? <div className="popular"> <SvgMost></SvgMost></div> : <div className="displaynone"></div>}
                {popularity == "Popular" ? <div className="popular"><SvgPopular></SvgPopular></div> : <div className="displaynone"></div>}
            </div>

            <div className="tapcont">
                {tapNumber != "" ? "TAP" : <div className="displaynone"></div>}
                <div className="taps">
                    {tapNumber != "" ? Tapmap : <p style={{ marginTop: "auto" }}>Not</p>}
                </div>
                <p>{tapNumber != "" ? tapNumber : "serving"}</p>
            </div>

        </div>
    )


}
