import React from "react"
import RenderSymbol from "./RenderSymbol"

class SearchBar extends React.Component {
    state = { //initialize state
        Symbols: []
    }

    handleSearch = (e) => {
        e.preventDefault() //prevent default form submission
        const symbol = e.target.value.trim() //access the value of the input
        fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=TVQ1JDC15WXQZHM7`)
        //fetch data with the value of the input as the keywords parameter
        .then(response => response.json()) //convert response to json
        .then(data => {
            this.setState({
                Symbols: data.bestMatches //update the state to the fetched data
            })
                
        })
    }

    render(){
        return(
            <div>
            
                <div className="ui segment">
                    <form className="ui form">
                        <div className="field">
                            <label>SearchBar</label>
                            <input className="" onChange={this.handleSearch}type ="text" name="symbol" placeholder="stock symbol"></input>
                        </div>      
                    </form>
                </div>

                <div style={{
                    "display": "flex"
                }}>

                    {this.state.Symbols && this.state.Symbols.map((symbol,index) => {
                        //loop through all the symbols and create a class based component for each to render it
                        return <RenderSymbol
                        
                        symbol={symbol} 
                        key={index}
                        count = {index+1}
                        />
                    })}
                </div>
            </div>
            
        )
    }
    
}

export default SearchBar   