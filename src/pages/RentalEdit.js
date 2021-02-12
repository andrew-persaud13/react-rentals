import React, { Component, useState, useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  fetchRentalByID,
  verifyRentalOwner,
  updateRental,
  unMountRental,
} from 'actions';

import RentalInfo from '../components/rental/RentalInfo';
import TomMap from 'components/map/TomMap';

import RentalAssets from 'components/rental/RentalAssets';
import { capitalize } from 'helpers/functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditableInput from 'components/editable/EditableInput';
import { toast } from 'react-toastify';

const withUserCheck = Component => props => {
  const [guard, setGuard] = useState({
    canProceed: false,
    isChecking: true,
  });
  const { canProceed, isChecking } = guard;

  const { id } = props.match.params;

  useEffect(() => {
    verifyRentalOwner(id)
      .then(_ => setGuard({ canProceed: true, isChecking: false }))
      .catch(_ => setGuard({ canProceed: false, isChecking: false }));
  }, [id]);

  if (isChecking) return 'Loading...';

  if (canProceed && !isChecking) return <Component {...props} />;

  if (!canProceed && !isChecking) return <Redirect to={`/rentals/${id}`} />;
};

class RentalEdit extends Component {
  componentDidMount() {
    const rentalId = this.props.match.params.id;
    this.props.fetchRentalByID(rentalId);
  }

  componentWillUnmount() {
    this.props.unMountRental();
  }

  get location() {
    const {
      rental: { street, city },
    } = this.props;
    return street && city && city + ', ' + street;
  }

  updateData = (data, field, onSuccess, onFail) => {
    const { id } = this.props.match.params;
    this.props
      .updateRental(id, data)
      .then(_ => {
        toast.success(`Updated ${field}`);
        onSuccess();
      })
      .catch(_ => {
        toast.error(_[0].detail);
        onFail();
      });
  };

  render() {
    const { rental, loading } = this.props;

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
              {/* <RentalInfo rental={rental} /> */}
              <div className='rental'>
                <h2 className={`rental-type type-${rental.category}`}>{`${
                  rental.shared ? 'Shared' : 'Whole'
                } ${rental.category}`}</h2>

                {/* <h1 className='rental-title'>{rental.title}</h1> */}
                <EditableInput
                  entity={rental}
                  field='title'
                  className='rental-title'
                  onUpdate={this.updateData}
                />
                <EditableInput
                  entity={rental}
                  field='city'
                  className='rental-city'
                  onUpdate={this.updateData}
                />
                <EditableInput
                  entity={rental}
                  field='street'
                  className='rental-city'
                  onUpdate={this.updateData}
                />
                <div className='rental-room-info'>
                  <span>
                    <FontAwesomeIcon className='fa fa-building'></FontAwesomeIcon>
                    {rental.numOfRooms}{' '}
                    {rental.numOfRooms > 1 ? 'Bedrooms' : 'Bedroom'}
                  </span>

                  <span>
                    <FontAwesomeIcon className='fa fa-user'></FontAwesomeIcon> 8
                    guests
                  </span>
                  {/* // <!-- TODO: Display numOfRooms + 2 --> */}
                  <span>
                    <FontAwesomeIcon className='fa fa-bed'></FontAwesomeIcon>{' '}
                    {rental.numOfRooms} {rental.numOfRooms > 1 ? 'Beds' : 'Bed'}
                  </span>
                </div>
                {/* <!-- TODO: Display description --> */}
                <p className='rental-description'>{rental.description}</p>
                <hr />
                <RentalAssets />
              </div>
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
});

export default connect(mapStateToProps, {
  fetchRentalByID,
  updateRental,
  unMountRental,
})(withRouter(withUserCheck(RentalEdit)));
