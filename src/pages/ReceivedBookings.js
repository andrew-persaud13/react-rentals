import React from 'react';
import { connect } from 'react-redux';
import { fetchUserReceivedBookings } from 'actions';
import BookingItem from 'components/booking/BookingItem';

class ReceivedBookings extends React.Component {
  componentDidMount() {
    this.props.fetchUserReceivedBookings();
  }

  render() {
    const { bookings, isFetching } = this.props;
    if (isFetching) return 'Loading...';
    return (
      <section className='booking-listing'>
        <h1 className='page-title'>Received Bookings</h1>
        {!isFetching && !bookings.length && (
          <p className='alert alert-warning'>
            You did not receive any reservations on your rentals yet.
          </p>
        )}
        <div className='row'>
          {bookings.map(booking => (
            <BookingItem booking={booking} key={booking._id} isReceived />
          ))}
        </div>
      </section>
    );
  }
}

const mstp = ({ manage: { receivedBookings } }) => ({
  bookings: receivedBookings.items,
  isFetching: receivedBookings.isFetching,
});

export default connect(mstp, { fetchUserReceivedBookings })(ReceivedBookings);
