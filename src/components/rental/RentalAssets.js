import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const RentalAssets = () => (
  <div className="rental-assets">
    <h3 className="title">Assets</h3>
    <div className="row">
      <div className="col-md-6">
        <span>
          <FontAwesomeIcon icon="asterisk"></FontAwesomeIcon> Cooling
        </span>
        <span>
          <FontAwesomeIcon icon="thermometer"></FontAwesomeIcon> Heating
        </span>
        <span>
          <FontAwesomeIcon icon="location-arrow"></FontAwesomeIcon> Iron
        </span>
      </div>
      <div className="col-md-6">
        <span>
          <FontAwesomeIcon icon="desktop"></FontAwesomeIcon> Working area
        </span>
        <span>
          <FontAwesomeIcon icon="cube"></FontAwesomeIcon> Washing machine
        </span>
        <span>
          <FontAwesomeIcon icon="faucet"></FontAwesomeIcon> Dishwasher
        </span>
      </div>
    </div>
  </div>
);

export default RentalAssets;
