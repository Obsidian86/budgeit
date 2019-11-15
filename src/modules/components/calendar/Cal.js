import React, { useState } from "react";
import * as DF from "./dateFunctions";
import { filledArray } from "./utilities";

const Cal = (props) => {

  const {
    targetMonth = DF.tMonth(),
    targetYear = DF.tYear(),
    items = [],
    clickDay,
    clickEvent,
    clickThisDate,
    clickPrev, 
    clickNext
  } = props;

  const [eventInfo, updateEventInfo] = useState({});
  const [dateInfo, updateDateInfo] = useState({
    m: targetMonth || DF.tMonth(),
    y: targetYear || DF.tYear()
  });

  const processItems = () => {
    let processedItems = {};
    items.forEach(it => {
      let prDate = new Date(it.date);
      if (it.rec) {
        let loopProtect = 0
        let dateTarg = prDate
        let calcDate = it.date
        while (dateTarg <= new Date(it.end)) {
          let newDate = calcDate.split("-").map(d => parseInt(d))
          if (!processedItems[newDate[2]]) processedItems[newDate[2]] = {};
          let targ = processedItems[newDate[2]];
          if (!targ[newDate[0]]) targ[newDate[0]] = {};
          targ = targ[newDate[0]];
          let checkDay = newDate[1]
          if (checkDay > DF.daysInMonth(newDate[0], newDate[2])) checkDay = DF.daysInMonth(newDate[0], newDate[2])
          if (!targ[checkDay]) targ[checkDay] = [];
          const newItem = {
            item: it.item,
            color: it.color ? it.color : null
          }
          targ[checkDay].push(newItem);

          if (it.rec === 'weekly') {
            newDate[1] = newDate[1] + 7
            if (newDate[1] > DF.daysInMonth(newDate[0], newDate[2])) {
              newDate[1] = newDate[1] - DF.daysInMonth(newDate[0], newDate[2])
              newDate[0]++
              if (newDate[0] > 12) {
                newDate[0] = 1
                newDate[2]++
              }
            }
          }
          if (it.rec === 'biWeekly') {
            newDate[1] = newDate[1] + 14
            if (newDate[1] > DF.daysInMonth(newDate[0], newDate[2])) {
              newDate[1] = newDate[1] - DF.daysInMonth(newDate[0], newDate[2])
              newDate[0]++
              if (newDate[0] > 12) {
                newDate[0] = 1
                newDate[2]++
              }
            }
          }

          if (it.rec === 'monthly') {
            newDate[0]++
            if (newDate[0] > 12) {
              newDate[0] = 1
              newDate[2]++
            }
          }
          if (it.rec === 'yearly') newDate[2]++

          calcDate = newDate.join('-')
          dateTarg = new Date(calcDate)
          loopProtect++;
          if (loopProtect === 1000) break
        }
      } else {
        // Single date items
        if (!processedItems[prDate.getFullYear()]) processedItems[prDate.getFullYear()] = {};
        let targ = processedItems[prDate.getFullYear()];
        if (!targ[prDate.getMonth() + 1]) targ[prDate.getMonth() + 1] = {};
        targ = targ[prDate.getMonth() + 1];
        if (!targ[prDate.getDate()]) targ[prDate.getDate()] = [];
        const newItem = {
          item: it.item,
          color: it.color ? it.color : null
        }
        targ[prDate.getDate()].push(newItem);
      }

    });
    updateEventInfo(processedItems);
  };

  const changeMonth = dir => {
    let nMonth = dateInfo.m;
    let oldDate = {...dateInfo}
    nMonth = dir === "next" ? nMonth + 1 : nMonth - 1;
    let nYear = dateInfo.y;
    if (nMonth > 12) {
      nMonth = 1;
      nYear = nYear + 1;
    }
    if (nMonth < 1) {
      nMonth = 12;
      nYear = nYear - 1;
    }
    
    const newDate = { m: nMonth, y: nYear }
    updateDateInfo(newDate)
    if(dir ==='next' && clickNext) clickNext({ old: oldDate, new: newDate}) 
    if(dir ==='prev' && clickPrev) clickPrev({ old: oldDate, new: newDate})
   
  };
  const tMonthDays = DF.daysInMonth(dateInfo.m, dateInfo.y);
  const tMonthStart = DF.monthStartOn(dateInfo.m, dateInfo.y);
  const toDate = new Date();
  const td =
    toDate.getMonth() + 1 + "-" + toDate.getDate() + "-" + toDate.getFullYear();

  const renderCalender = () => {
    let weekDays = DF.Days.map(d => (
      <span key={d} className="weekDay">
        <p>{d}</p>
      </span>
    ));
    let track = false;
    let dayTrack = 1;
    const maxDays = [...filledArray(42)];
    const rootCal = maxDays.map((d, i) => {
      let iterDate = `${dateInfo.m}-${dayTrack}-${dateInfo.y}`;
      let dt = dayTrack;
      track = (track || tMonthStart === DF.Days[i]) && dayTrack <= tMonthDays;
      const thisDay = (
        <span
          key={i}
          className={`${track && "days"} ${iterDate === td && "today"}`}
          onClick={() => clickDay && clickDay({ ...dateInfo, d: dt })}
        >
          {track && dayTrack <= tMonthDays && (
            <p className="dayNum">{dayTrack}</p>
          )}
          {track && eventInfo &&
            eventInfo[dateInfo.y] &&
            eventInfo[dateInfo.y][dateInfo.m] &&
            eventInfo[dateInfo.y][dateInfo.m][dayTrack] &&
            eventInfo[dateInfo.y][dateInfo.m][dayTrack].map((d, i) => {
              let dt = dayTrack
              return (
                <p
                  key={i}
                  className="eventItem"
                  style={{ borderColor: d.color ? d.color : null }}
                  onClick={
                    e => {
                      e.stopPropagation();
                      clickEvent && clickEvent({ event: d.item, ...dateInfo, d: dt })
                    }
                  }>
                  {d.item}
                </p>)
            })}
        </span>
      );
      track && dayTrack++;
      return thisDay;
    });
    return (
      <>
        {weekDays}
        {rootCal}
      </>
    );
  };
  
  Object.keys(eventInfo).length < 1 && processItems();
  return (
      <div id='calendar'>
        <div className='cal-controls'>
          <div className='dayMonth'>{DF.Months[dateInfo.m - 1]} - {dateInfo.y}</div>
          <div>
            {((dateInfo.y !== 2019) || (dateInfo.m !== 11)) && <><button onClick={() => {
              clickThisDate && clickThisDate({new: { m: DF.tMonth(), y: DF.tYear() }, old: dateInfo})
              updateDateInfo({ m: DF.tMonth(), y: DF.tYear() })
            }}>This date</button>&nbsp;&nbsp;| </>}
            <button onClick={() => changeMonth("prev")}>Prev Month</button>
            <button onClick={() => changeMonth("next")}>Next Month</button>
          </div>
        </div>
        <div className='allDays'>
          {renderCalender()}
        </div>
      </div>
  );
};

export default Cal;
