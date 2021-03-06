/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from 'react';

import RentalCard from 'components/rental/RentalCard';

import { connect } from 'react-redux';
import { fetchRentals } from 'actions';

class RentalHome extends Component {
  componentDidMount() {
    this.props.dispatch(fetchRentals());
  }

  renderRentals = rentals =>
    rentals.map(rental => (
      <div key={rental._id} className='col-md-3'>
        <RentalCard rental={rental} />
      </div>
    ));

  render() {
    const { rentals, loading } = this.props;

    if (loading) return 'Loading...';

    return (
      <div className='card-list'>
        <h1 className='page-title'>Your Home All Around the World</h1>
        <div className='row'>{this.renderRentals(rentals)}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ rentals }) => {
  return {
    rentals: rentals.items,
    loading: rentals.isFetching,
  };
};

export default connect(mapStateToProps)(RentalHome);
