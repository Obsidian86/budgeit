import React from 'react'
import ChartContainer from "../components/ChartContainer";
import ProgressBar from "../interface/ProgressBar";
import { convert, disRec } from "../../utilities/convert";
import './chartStyles.scss'

const ChartSection = ({percentLeft, data, amountLeft, p, s}) => {
    const okPercent = percentLeft > -1 && percentLeft !== Infinity
    return(
        <div className="chartContainer max row">
            <div className='row'>
                <div className='pie-container'>
                    {okPercent &&
                        <ChartContainer data={data} styles={s.chartContainer} />}
                </div>
                <div className='bar-container'>
                    <div
                        className="contentBox row"
                        style={s.barContainer}
                        >
                        <p className="text-left w-100">
                            <strong>{convert(p.total, "m", p.viewBy, "money")}</strong> budgeted of
                            <strong> {convert(p.amount, "w", p.viewBy, "money")}</strong>
                        </p>
                        <ProgressBar
                            percent={ okPercent ? percentLeft : 0}
                            title={ okPercent ? percentLeft.toFixed(2) + "%" : 0 + '%'}
                        />
                        <p className="text-right w-100">
                            <strong>{convert(amountLeft, p.viewBy, p.viewBy, "money")}</strong> Remianing{" "}
                            {disRec(p.viewBy)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChartSection