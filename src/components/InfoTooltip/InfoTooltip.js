import React from 'react';
import './InfoTooltip.css'

const InfoTooltip = ({errorMessage}) => {
  return (
    <span className='info-tooltip'>{errorMessage}</span>
  )
}

export default InfoTooltip;