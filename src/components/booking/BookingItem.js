import React from 'react';
import { Link } from 'react-router-dom';

import { capitalize, formatDate } from 'helpers/functions';

const BookingItem = ({ booking, isReceived = false, onDelete }) => {
  return (
    <div className='col-md-4'>
      <div className='card text-center'>
        {isReceived && (
          <div className='card-header'>From: {booking.owner.username}</div>
        )}
        <div className='card-block'>
          <h4 className='card-title'>
            {booking.rental.title} - {capitalize(booking.rental.city)}
          </h4>
          <p className='card-text booking-days'>
            {formatDate(booking.startAt)} -{formatDate(booking.endAt)} |{' '}
            {booking.nights} nights
          </p>
          <p className='card-text'>
            <span>Price: </span>{' '}
            <span className='booking-price-value'>${booking.price}</span>
          </p>
          <Link
            className='btn  btn-bwm-main'
            to={`/rentals/${booking.rental._id}`}
          >
            Go to Rental
          </Link>
          {!isReceived && (
            <button
              onClick={() => onDelete(booking._id)}
              className='ml-1 btn btn-danger '
            >
              Delete
            </button>
          )}
        </div>
        <div className='card-footer text-muted'>
          Created at {formatDate(booking.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default BookingItem;
