import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RentalAssets from './RentalAssets';

import { capitalize } from 'helpers/functions';

const RentalInfo = ({ rental }) => (
  <div className="rental">
    <h2 className={`rental-type type-${rental.category}`}>{`${
      rental.shared ? 'Shared' : 'Whole'
    } ${rental.category}`}</h2>

    <h1 className="rental-title">{rental.title}</h1>

    <h2 className="rental-city">{capitalize(rental.city)}</h2>
    <div className="rental-room-info">
      <span>
        <FontAwesomeIcon className="fa fa-building"></FontAwesomeIcon>
        {rental.numOfRooms} {rental.numOfRooms > 1 ? 'Bedrooms' : 'Bedroom'}
      </span>

      <span>
        <FontAwesomeIcon className="fa fa-user"></FontAwesomeIcon> 8 guests
      </span>
      {/* // <!-- TODO: Display numOfRooms + 2 --> */}
      <span>
        <FontAwesomeIcon className="fa fa-bed"></FontAwesomeIcon>{' '}
        {rental.numOfRooms} {rental.numOfRooms > 1 ? 'Beds' : 'Bed'}
      </span>
    </div>
    {/* <!-- TODO: Display description --> */}
    <p className="rental-description">{rental.description}</p>
    <hr />
    <RentalAssets />
  </div>
);

export default RentalInfo;
