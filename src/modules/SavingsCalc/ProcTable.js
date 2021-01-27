import React, { memo } from 'react'
import Collapseable from '../interface/Collapseable';
import { money } from "../../utilities/convert";
import TableRow from "../interface/TableRow";

const ProcTable = ({tableData, index, s, RowSpread}) => {
    console.log(tableData)
    console.log('RERENDER ' + index)
    if (Object.keys(tableData).length === 1 && tableData["0"]) return null
    let rows = Object.keys(tableData).map(t => {
        if (t === 0 || t === '0' || isNaN(parseInt(t))) return null
        return (<TableRow
            pattern={RowSpread}
            key={t}
            tData={[
                t, "+ " + money(tableData[t].deposit), money(tableData[t].interest),
                money(tableData[t].stAmount + tableData[t].interest + tableData[t].deposit)]} />)
    })

    return (
        <div className={`max`} style={s.tableContainer}>
            <TableRow pattern={RowSpread} className="headerRow" round={false} >
                <div> Age <br /> {tableData['startAge'] && tableData['startAge']} </div>
                <div> Deposit <br /> {money(tableData['deposit'] && tableData['deposit'])} </div>
                <div> Interest <br /> {tableData['startInterest'] && tableData['startInterest'] + '%'} </div>
                <div> Balance <br /> {money(tableData['startAmount'] && tableData['startAmount'])} </div>
            </TableRow>
            <Collapseable open={index === 0} maxHeight={500}> {rows} </Collapseable>
        </div>
    )
}

export default memo(ProcTable, () => true)