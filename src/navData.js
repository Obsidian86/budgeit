import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillWave, faPiggyBank, faUniversity, faCalendarAlt, faAmbulance, faCommentDollar, faStream, faCameraRetro } from "@fortawesome/free-solid-svg-icons";

export const Links = [
    { to: '/#default', text: 'Income', step: 0, icon: <FontAwesomeIcon icon={faMoneyBillWave} /> },
    { to: '/savings', text: 'Saving calc', step: 0, icon: <FontAwesomeIcon icon={faPiggyBank} /> },
    { to: '/accounts', text: 'Accounts', step: 0, icon: <FontAwesomeIcon icon={faUniversity} /> },
    { to: '/calendar', text: 'Calendar', step: 2, icon: <FontAwesomeIcon icon={faCalendarAlt} /> },
    { to: '/emergency', text: 'Emergency', step: 2, icon: <FontAwesomeIcon icon={faAmbulance} /> },
    { to: '/recommended', text: 'Recommended', step: 1, icon: <FontAwesomeIcon icon={faCommentDollar} /> },
    { to: '/budget', text: 'Budget', step: 1, icon: <FontAwesomeIcon icon={faStream} />},
    { to: '/snapshots', text: 'Snapshots', step: 2, icon: <FontAwesomeIcon icon={faCameraRetro} /> }
  ]