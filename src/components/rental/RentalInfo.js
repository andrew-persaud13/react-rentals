import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RentalAssets from './RentalAssets';

import { capitalize } from 'helpers/functions';

const RentalInfo = ({ rental }) => (
  <div className='rental'>
    <h2 className={`rental-type type-${rental.category}`}>{`${
      rental.shared ? 'Shared' : 'Whole'
    } ${rental.category}`}</h2>
    <div className='rental-owner'>
      <img src={rental.owner.avatar} alt='owner' />
      <span>{rental.owner.username}</span>
    </div>

    <h1 className='rental-title'>{rental.title}</h1>

    <h2 className='rental-city'>{capitalize(rental.city)}</h2>
    <div className='rental-room-info'>
      <span>
        <FontAwesomeIcon icon='building'></FontAwesomeIcon>
        {rental.numOfRooms} {rental.numOfRooms > 1 ? 'Bedrooms' : 'Bedroom'}
      </span>

      <span>
        <FontAwesomeIcon icon='user'></FontAwesomeIcon> 8 guests
      </span>
      {/* // <!-- TODO: Display numOfRooms + 2 --> */}
      <span>
        <FontAwesomeIcon icon='bed'></FontAwesomeIcon> {rental.numOfRooms}{' '}
        {rental.numOfRooms > 1 ? 'Beds' : 'Bed'}
      </span>
    </div>
    {/* <!-- TODO: Display description --> */}
    <p className='rental-description'>{rental.description}</p>
    <hr />
    <RentalAssets />
  </div>
);

export default RentalInfo;
