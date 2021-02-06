import React from 'react';
import { connect } from 'react-redux';
import { fetchUserReceivedBookings } from 'actions';

class ReceivedBookings extends React.Component {
  componentDidMount() {
    this.props.fetchUserReceivedBookings();
  }

  render() {
    const { bookings, isFetching } = this.props;
    if (isFetching) return 'Loading...';
    return <h1>hip: {bookings.length}</h1>;
  }
}

const mstp = ({ manage: { receivedBookings } }) => ({
  bookings: receivedBookings.items,
  isFetching: receivedBookings.isFetching,
});

export default connect(mstp, { fetchUserReceivedBookings })(ReceivedBookings);
