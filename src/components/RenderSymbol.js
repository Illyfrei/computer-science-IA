import React from "react"


const RenderSymbol = (props) => {
    return(
        <div>
            <span>
                <button className="tiny ui button" style={{"marginLeft": ".8rem", "marginBottom": "15px"}}>{props.symbol["1. symbol"]} </button>
            </span>
        </div>
    )
}

export default RenderSymbol