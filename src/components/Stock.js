import React, {useRef} from 'react'

const Stock = (props) => { 

    const roundNum = useRef(function(num){
        if(num > 1000000000000){ //greater than a trillion?
            return num
        } else {
            const numWithCommas = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const parts = numWithCommas.split(",");
            return parts.length > 1 ? (Math.round(parseInt(parts.join(""), 10) / Math.pow(1000, parts.length-1)) + " " + ["thousand", "million", "billion"][parts.length-2]) : parts[0]
        }
    })
    
    return(

        <div className="ui stackable six column grid segment">
            <p className=" column">{props.count}. {props.optionText}</p>
            <p className =" column">enterprise : {roundNum.current(props.enterpriseValue)} </p>
            <p className =" column">enterprise/Ebitda : {roundNum.current(props.enterpriseOverEbitda)}</p>
            <p className =" column">Revenue : {roundNum.current(props.revenue)}</p>
            <p className =" column">Revenue/Ebtitda: {props.revenueOverEbitda.toFixed(2)}</p>
            
            <button 
                className ="medium compact  ui inverted red button"
                style={{
                    "height": "40px",
                    "marginTop": "10px"
                }}
                onClick ={(e) => {
                    props.handleDeleteStock(props.optionText)
                }}
            >
                remove
            </button>

        
    </div>
    )
}

export default Stock