import React from 'react';
import './InfoTooltip.css'

const InfoTooltip = ({isErrorMessage, infoMessage}) => {
  return (
    <span className={`info-tooltip ${isErrorMessage ? 'info-tooltip_error' : ''}`}>{infoMessage}</span>
  )
}

export default InfoTooltip;