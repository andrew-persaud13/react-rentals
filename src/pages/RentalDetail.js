import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchRentalByID } from 'actions';

import RentalInfo from '../components/rental/RentalInfo';
import TomMap from 'components/map/TomMap';
import BookingReserve from 'components/booking/BookingReserve';

class RentalDetail extends Component {
  componentDidMount() {
    const rentalId = this.props.match.params.id;
    this.props.dispatch(fetchRentalByID(rentalId));
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'UNMOUNT_RENTAL' });
  }

  get location() {
    const {
      rental: { street, city },
    } = this.props;
    return street && city && city + ', ' + street;
  }

  render() {
    const { rental, loading, isAuth } = this.props;

    if (loading || !rental._id) return 'Loading...';

    return (
      <section id='rentalDetails'>
        <div className='upper-section'>
          <div className='row'>
            <div className='col-md-6'>
              <img src={rental.image} alt={rental.title} />
            </div>
            <div className='col-md-6'>
              <TomMap location={this.location} />
            </div>
          </div>
        </div>
        <div className='details-section'>
          <div className='row'>
            <div className='col-md-8'>
              <RentalInfo rental={rental} />
            </div>
            <div className='col-md-4'>
              <BookingReserve isAuth={isAuth} rental={rental} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ rental, auth }) => ({
  rental: rental.item,
  loading: rental.isFetching,
  isAuth: auth.isAuth,
});

export default connect(mapStateToProps)(withRouter(RentalDetail));
