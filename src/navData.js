import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faMoneyBillWave, faPiggyBank, faUniversity, faCalendarAlt, faAmbulance, faCommentDollar, faStream, faCameraRetro, faChartBar } from "@fortawesome/free-solid-svg-icons";

export const Links = [
    { to: '/dashboard', text: 'Dashboard', icon: <FontAwesomeIcon icon={faChartBar} /> },
    { to: '/sources', text: 'Income', icon: <FontAwesomeIcon icon={faMoneyBillWave} /> },
    { to: '/budget', text: 'Budget', icon: <FontAwesomeIcon icon={faStream} />},
    { to: '/credit', text: 'Credit', icon: <FontAwesomeIcon icon={faCreditCard} />},
    { to: '/recommended', text: 'Recommended', icon: <FontAwesomeIcon icon={faCommentDollar} /> },
    { to: '/accounts', text: 'Accounts', icon: <FontAwesomeIcon icon={faUniversity} /> },
    { to: '/emergency', text: 'Emergency', icon: <FontAwesomeIcon icon={faAmbulance} /> },
    { to: '/calendar', text: 'Calendar', icon: <FontAwesomeIcon icon={faCalendarAlt} /> },
    { to: '/savings', text: 'Saving calc', icon: <FontAwesomeIcon icon={faPiggyBank} /> },
    { to: '/snapshots', text: 'Snapshots',  icon: <FontAwesomeIcon icon={faCameraRetro} /> }
  ]