import React from 'react';
import { connect } from 'react-redux';
import { fetchUserRentals } from 'actions';
import RentalCard from 'components/rental/RentalCard';

class ManageRentals extends React.Component {
  componentDidMount() {
    this.props.fetchUserRentals();
  }

  renderRentals = rentals =>
    rentals.map(rental => (
      <div key={rental._id} className='col-md-3'>
        <RentalCard rental={rental} />
      </div>
    ));

  render() {
    const { rentals, isFetching } = this.props;

    if (isFetching) return 'Loading...';

    return (
      <div className='card-list'>
        <h1 className='page-title'>Your Home All Around the World</h1>
        <div className='row'>{this.renderRentals(rentals)}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ manage: { rentals } }) => ({
  rentals: rentals.items,
  isFetching: rentals.isFetching,
});

export default connect(mapStateToProps, { fetchUserRentals })(ManageRentals);
