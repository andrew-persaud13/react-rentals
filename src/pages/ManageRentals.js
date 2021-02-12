import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchUserRentals, deleteRental } from 'actions';
import RentalCard from 'components/rental/RentalCard';
import ApiErrors from 'components/forms/ApiErrors';

class ManageRentals extends React.Component {
  componentDidMount() {
    this.props.fetchUserRentals();
  }

  deleteRental = id => {
    if (window.confirm('Are you sure you want to delete this rental?')) {
      this.props
        .deleteRental(id)
        .then(_ => toast.success('Booking deleted!', { autoClose: 3000 }));
    }
  };

  renderRentals = rentals =>
    rentals.map(rental => (
      <div key={rental._id} className='col-md-3'>
        <RentalCard
          rental={rental}
          renderMenu={() => (
            <>
              <button
                onClick={() => this.deleteRental(rental._id)}
                className='btn btn-danger'
              >
                Delete
              </button>
              <Link
                to={`/rentals/${rental._id}/edit`}
                className='ml-2 btn btn-bwm-main'
              >
                Update
              </Link>
            </>
          )}
        />
      </div>
    ));

  render() {
    const { rentals, isFetching, errors } = this.props;

    if (isFetching) return 'Loading...';

    return (
      <div className='card-list'>
        <h1 className='page-title'>My Rentals</h1>
        <ApiErrors errors={errors} />
        {!isFetching && !rentals.length && (
          <p className='alert alert-warning'>
            You did not list any rentals yet.
          </p>
        )}
        <div className='row'>{this.renderRentals(rentals)}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ manage: { rentals } }) => ({
  rentals: rentals.items,
  isFetching: rentals.isFetching,
  errors: rentals.errors,
});

export default connect(mapStateToProps, { fetchUserRentals, deleteRental })(
  ManageRentals
);
