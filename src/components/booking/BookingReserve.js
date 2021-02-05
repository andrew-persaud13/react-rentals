import React from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';

import BwmModal from 'components/shared/Modal';

class BookingReserve extends React.Component {
  constructor() {
    super();
    this.dateRef = React.createRef();
    this.state = {
      proposedBooking: {
        guests: '',
        endAt: null,
        startAt: null,
      },
    };
  }

  get nights() {
    const { endAt, startAt } = this.state.proposedBooking;
  }

  get totalPrice() {
    const { guests, endAt, startAt } = this.state.proposedBooking;
  }

  get isBookingDataValid() {
    const { guests, endAt, startAt } = this.state.proposedBooking;
    return guests && endAt && startAt;
  }

  reserveRental = () => {
    alert(JSON.stringify(this.state.proposedBooking));
  };

  checkInvalidDates = date => {
    // if date is invalid return true
    return date < moment().add(-1, 'days');
  };
  handleApply = (e, { startDate, endDate }) => {
    this.dateRef.current.value =
      moment(startDate).format('YYYY/MM/DD') +
      ' to ' +
      moment(endDate).format('YYYY/MM/DD');
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        startAt: startDate,
        endAt: endDate,
      },
    });
  };

  handleGuestsChange = e => {
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        guests: e.target.value,
      },
    });
  };

  processAdditionalData = () => {
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        nights: '',
        totalPrice: 0,
      },
    });
  };

  render() {
    const {
      proposedBooking: { guests },
    } = this.state;
    const { rental } = this.props;
    return (
      <div className='booking'>
        <h3 className='booking-price'>
          $ {rental.dailyPrice}{' '}
          <span className='booking-per-night'>per night</span>
        </h3>
        <hr></hr>
        <div className='form-group'>
          <label htmlFor='dates'>Dates</label>
          <DateRangePicker
            onApply={this.handleApply}
            opens='left'
            containerStyles={{ display: 'block' }}
            isInvalidDate={this.checkInvalidDates}
          >
            <input
              ref={this.dateRef}
              type='text'
              id='dates'
              className='form-control'
            />
          </DateRangePicker>
        </div>
        <div className='form-group'>
          <label htmlFor='guests'>Guests</label>
          <input
            onChange={this.handleGuestsChange}
            value={guests}
            type='number'
            className='form-control'
            id='guests'
            aria-describedby='guests'
          ></input>
        </div>
        <BwmModal
          openBtn={() => (
            <button
              onClick={this.processAdditionalData}
              className='btn btn-bwm-main btn-block'
              disabled={!this.isBookingDataValid}
            >
              Reserve place now
            </button>
          )}
          onSubmit={this.reserveRental}
          title='Confirm Booking'
          subtitle={this.dateRef.current?.value}
        >
          <em>12</em> Nights /<em>${rental.dailyPrice}</em> Per night
          <p>Guests: {guests}</p>
          <p>
            Price: <em>${'300'}</em>
          </p>
        </BwmModal>
        <hr></hr>
        <p className='booking-note-title'>
          People are interested into this house
        </p>
        <p className='booking-note-text'>
          More than 500 people checked this rental in last month.
        </p>
      </div>
    );
  }
}

export default BookingReserve;
