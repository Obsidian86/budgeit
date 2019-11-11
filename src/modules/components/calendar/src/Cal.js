import React, { useState, useEffect } from "react";
import * as DF from "./dateFunctions";
import { filledArray } from "./utilities";
import 'normalize.css'
import styled from 'styled-components'

const Calendar = ({
  targetMonth = DF.tMonth(),
  targetYear = DF.tYear(),
  items = [],
  clickDay,
  clickEvent,
  clickThisDate,
  clickPrev, 
  clickNext
}) => {
  const [eventInfo, updateEventInfo] = useState({});
  const [dateInfo, updateDateInfo] = useState({
    m: targetMonth,
    y: targetYear
  });

  const StCal = styled.div` 
  font-family: sans-serif;
    #calendar{ 
      margin: 0 auto;
      span {
        width: calc(100% / 7);
        display: block;
        font-weight: bold;
        color: #fff;
        height: 100px;
        margin: 0;
        padding: 0;
        padding-top: 25px;
        overflow: hidden;
        position: relative;
        background-color: rgb(212, 212, 212);
      }
      .allDays{
        display: flex;
        flex-wrap: wrap;
      }
      .weekDay {
        height: 30px;
        padding: 0;
        text-align: center;
        background-color: rgb(60, 118, 241);
        padding-bottom: 12px;
      }
      .days {
        background-color: white;
        box-shadow: 0 0 2px #999;
        &.today {
          background-color: rgb(212, 255, 221);
          box-shadow: inset 0 0 210px rgb(141, 248, 141);
        }
        .dayNum {
          font-size: 0.9rem;
          position: absolute;
          top: 5px;
          right: 5px;
          padding: 0;
          margin: 0;
          color: #333;
        }
        &:hover{
          background-color: #e8e8e8;
          box-shadow: none;
          overflow: auto;
        }
        .eventItem {
          width: 20%;
          margin: 3px auto;
          width: 92%;
          display: block;
          padding: 3px 4px;
          color: #999;
          font-weight: normal;
          border-left: 3px solid hotpink;
          cursor: pointer;
          &:hover{
            background-color: hotpink;
            color: #fff;
          }
        } 
      }
      .cal-controls{
        display: flex;
        padding: 10px;
        justify-content: space-between; 
        button{
          border: 2px solid green;
          background: none;
          padding: 5px 10px;
          margin-left: 7px;
          border-radius: 8px;
          color: green;
          cursor: pointer;
          &:hover{
            border: 2px solid gray;
            background: gray;
            color: #fff;
          }
        }
        .dayMonth{
          font-size: 1.3rem;
          font-weight: bold;
          color: #b1b1b1;
          padding-top: 5px;
        } 
      } 
    }
    `;
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
          targ[checkDay].push(it.item);

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
        targ[prDate.getDate()].push(it.item);
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

    if(dir ==='next' && clickNext) clickNext({ old: oldDate, new: {
      m: nMonth,
      y: nYear
    }})
    if(dir ==='prev' && clickPrev) clickNext({ old: oldDate, new: {
      m: nMonth,
      y: nYear
    }})

    updateDateInfo({
      m: nMonth,
      y: nYear
    });
  };
  const tMonthDays = DF.daysInMonth(dateInfo.m, dateInfo.y);
  const tMonthStart = DF.monthStartOn(dateInfo.m, dateInfo.y);
  const toDate = new Date();
  const td =
    toDate.getMonth() + 1 + "-" + toDate.getDate() + "-" + toDate.getFullYear();

  useEffect(() => {
    Object.keys(eventInfo).length < 1 && processItems();
  }, []);

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
                  onClick={
                    e => {
                      e.stopPropagation();
                      clickEvent && clickEvent({ event: d, ...dateInfo, d: dt })
                    }
                  }>
                  {d}
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
  return (
    <StCal>
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
    </StCal>
  );
};

export default Calendar;
