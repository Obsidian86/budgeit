import React from 'react'
import LineChart from 'react-linechart'

const RenderLineChart = ({inData, handlePointclick, parentWidth, inItemId, parser}) => {
    let data = [{ color: 'green', points: [] }]
    inData.forEach(ss => {
        const d = ss.date.split('-')
        const useDate = `${d[2]}-${d[0]}-${d[1]}`
        data[0].points.push({ x: useDate, y: parseInt(ss.amount) })
    })
    return (
        <LineChart
            pointClass={inItemId + '-p'}
            labelClass={inItemId + '-l'}
            id={inItemId}
            margins={{left: 70}}
            onPointClick={handlePointclick}
            hideXLabel
            hideYLabel
            xDisplay={parser}
            width={parentWidth - 40}
            pointRadius={10}
            height={400}
            ticks={5}
            data={data}
            isDate={true}
        />
    )
}

export default RenderLineChart