import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchRentalByID } from 'actions';

import RentalInfo from '../components/rental/RentalInfo';

class RentalDetail extends Component {
  componentDidMount() {
    const rentalId = this.props.match.params.id;
    this.props.dispatch(fetchRentalByID(rentalId));
  }

  render() {
    const { rental, loading } = this.props;

    if (loading) return 'Loading...';

    return (
      <section id="rentalDetails">
        <div className="upper-section">
          <div className="row">
            <div className="col-md-6">
              <img src={rental.image} alt={rental.title} />
            </div>
            <div className="col-md-6">
              <img src="#" alt="" />
            </div>
          </div>
        </div>
        <div className="details-section">
          <div className="row">
            <div className="col-md-8">
              <RentalInfo rental={rental} />
            </div>
            <div className="col-md-4"> BOOKING</div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ rental }) => ({
  rental: rental.item,
  loading: rental.isFetching,
});

export default connect(mapStateToProps)(withRouter(RentalDetail));
