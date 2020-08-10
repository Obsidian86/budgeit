import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillWave, faPiggyBank, faUniversity, faCalendarAlt, faAmbulance, faCommentDollar, faStream, faCameraRetro } from "@fortawesome/free-solid-svg-icons";

export const Links = [
    { to: '/default', text: 'Income', icon: <FontAwesomeIcon icon={faMoneyBillWave} /> },
    { to: '/budget', text: 'Budget', icon: <FontAwesomeIcon icon={faStream} />},
    { to: '/recommended', text: 'Recommended', icon: <FontAwesomeIcon icon={faCommentDollar} /> },
    { to: '/accounts', text: 'Accounts', icon: <FontAwesomeIcon icon={faUniversity} /> },
    { to: '/emergency', text: 'Emergency', icon: <FontAwesomeIcon icon={faAmbulance} /> },
    { to: '/calendar', text: 'Calendar', icon: <FontAwesomeIcon icon={faCalendarAlt} /> },
    { to: '/savings', text: 'Saving calc', icon: <FontAwesomeIcon icon={faPiggyBank} /> },
    { to: '/snapshots', text: 'Snapshots',  icon: <FontAwesomeIcon icon={faCameraRetro} /> }
  ]