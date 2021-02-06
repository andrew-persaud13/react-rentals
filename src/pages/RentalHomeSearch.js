/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import RentalCard from 'components/rental/RentalCard';
import { capitalize } from 'helpers/functions';

import { connect } from 'react-redux';
import { fetchRentals } from 'actions';

class RentalHomeSearch extends Component {
  componentDidMount() {
    this.getRentals();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.location.toLowerCase() !==
      this.location.toLowerCase()
    ) {
      this.getRentals();
    }
  }

  get location() {
    return this.props.match.params.location;
  }

  getRentals() {
    this.props.fetchRentals(this.location);
  }

  renderRentals = rentals =>
    rentals.map(rental => (
      <div key={rental._id} className='col-md-3'>
        <RentalCard rental={rental} />
      </div>
    ));

  render() {
    const { rentals, loading } = this.props;
    const { location } = this.props.match.params;

    if (loading) return 'Loading...';

    return (
      <div className='card-list'>
        <h1 className='page-title'>
          Your Home {location ? ` in "${capitalize(location)}"` : ''}
        </h1>
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

export default connect(mapStateToProps, { fetchRentals })(
  withRouter(RentalHomeSearch)
);
