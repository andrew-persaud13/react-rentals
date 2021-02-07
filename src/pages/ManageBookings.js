import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { fetchUserBookings, deleteBooking } from 'actions';
import BookingItem from 'components/booking/BookingItem';
import ApiErrors from 'components/forms/ApiErrors';

class ManageBookings extends React.Component {
  componentDidMount() {
    this.props.fetchUserBookings();
  }

  handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      this.props
        .deleteBooking(id)
        .then(_ => toast.success('Booking deleted!', { autoClose: 3000 }));
    }
  };

  render() {
    const { bookings, isFetching, errors } = this.props;

    if (isFetching) return 'Loading...';

    return (
      <section className='booking-listing'>
        <h1 className='page-title'>My bookings</h1>
        <ApiErrors errors={errors} />
        {!isFetching && !bookings.length && (
          <p className='alert alert-warning'>
            You did not reserve any rentals yet.
          </p>
        )}
        <div className='row'>
          {bookings.map(booking => (
            <BookingItem
              onDelete={this.handleDelete}
              booking={booking}
              key={booking._id}
            />
          ))}
        </div>
      </section>
    );
  }
}

const mstp = ({ manage: { bookings } }) => ({
  bookings: bookings.items,
  isFetching: bookings.isFetching,
  errors: bookings.errors,
});

export default connect(mstp, { fetchUserBookings, deleteBooking })(
  ManageBookings
);
