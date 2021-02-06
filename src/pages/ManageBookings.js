import React from 'react';
import { connect } from 'react-redux';

import { fetchUserBookings } from 'actions';

class ManageBookings extends React.Component {
  componentDidMount() {
    this.props.fetchUserBookings();
  }

  render() {
    const { bookings, isFetching } = this.props;

    if (isFetching) return 'Loading...';

    return <h1>{bookings.length}</h1>;
  }
}

const mstp = ({ manage: { bookings } }) => ({
  bookings: bookings.items,
  isFetching: bookings.isFetching,
});

export default connect(mstp, { fetchUserBookings })(ManageBookings);
