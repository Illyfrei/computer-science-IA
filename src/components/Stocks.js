import React from 'react'
import Stock from './Stock'

const Stocks = (props) => (
        <div >
            <div className="">
                <div className="ui grid segment">
                    <div className="five column row">
                        <div className="left floated column">
                            <h3 >tracked companies</h3>
                        </div>
                        {
                            console.log(props.stocks)
                        }
                        <div className="right floated column">
                            <button 
                                style={{
                                    "width": "130px"
                                }}
                                className="ui inverted red button "
                                onClick={props.handleDeleteStocks}>RemoveStocks
                            </button>
                        </div>
                    </div>
                </div>

                {
                    
                    props.stocks.map((stock,index) => {
                    return <Stock 
                            key={index +1} 
                            enterpriseValue={stock.enterprise}
                            revenue={stock.revenue}
                            optionText ={stock.value}
                            //owner = {stock.owner}
                            enterpriseOverEbitda={stock.enterpriseOverEbitda}
                            revenueOverEbitda={stock.revenueOverEbitda}
                            count = {index +1}
                            handleDeleteStock = {props.handleDeleteStock}
                            />
                })
                }
            </div>
        </div>
    )


export default Stocks