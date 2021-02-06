import React from 'react';
import { Link } from 'react-router-dom';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import Moment from 'moment';
import { toast } from 'react-toastify';
import { extendMoment } from 'moment-range';

import BwmModal from 'components/shared/Modal';
import ApiErrors from 'components/forms/ApiErrors';

import { createBooking, getBookingsByRental } from 'actions';

const moment = extendMoment(Moment);

class BookingReserve extends React.Component {
  constructor() {
    super();
    this.dateRef = React.createRef();
    this.bookedOutDates = [];
    this.state = {
      errors: [],
      proposedBooking: {
        guests: 1,
        endAt: null,
        startAt: null,
      },
    };
  }

  componentDidMount() {
    const { rental } = this.props;
    // getBookingsByRental(rental._id)
    //   .then(res => res.data)
    //   .then(({ bookings }) =>
    //     this.setState({
    //       bookings,
    //     })
    //   );
    getBookingsByRental(rental._id)
      .then(({ data }) => data)
      .then(({ bookings }) => {
        this.bookedOutDates = bookings;
      });
  }

  get nights() {
    const { endAt, startAt } = this.state.proposedBooking;
    if (!endAt || !startAt) return null;

    return Array.from(moment.range(startAt, endAt).by('days')).length - 1;
  }

  get totalPrice() {
    const { rental } = this.props;

    return rental.dailyPrice * this.nights;
  }

  get isBookingDataValid() {
    const { guests, endAt, startAt } = this.state.proposedBooking;
    return guests && endAt && startAt;
  }

  reserveRental = done => {
    createBooking(this.state.proposedBooking)
      .then(newBooking => {
        toast.success('Rental successfully booked!!', { autoClose: 2000 });
        this.bookedOutDates.push(newBooking);
        this.resetData();
        done();
      })
      .catch(errors => {
        debugger;
        this.setState({ errors });
      });
  };

  resetData = () => {
    this.dateRef.current.value = '';
    this.setState({
      errors: [],
      proposedBooking: {
        guests: 1,
        endAt: null,
        startAt: null,
      },
    });
  };

  checkInvalidDates = date => {
    const isBookedOut =
      (this.bookedOutDates.length &&
        this.bookedOutDates.some(booking => {
          return moment.range(booking.startAt, booking.endAt).contains(date);
        })) ||
      false;
    return date < moment().add(-1, 'days') || isBookedOut;
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
        guests: +e.target.value,
      },
    });
  };

  processAdditionalData = () => {
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        nights: this.nights,
        price: this.totalPrice,
        rental: this.props.rental,
      },
    });
  };

  resetError = () => this.setState({ errors: [] });

  render() {
    const {
      proposedBooking: { guests, nights },
      errors,
    } = this.state;
    const { rental, isAuth } = this.props;
    return (
      <div className='booking'>
        <h3 className='booking-price'>
          $ {rental.dailyPrice}
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

        {isAuth && (
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
            resetError={this.resetError}
          >
            <em>{nights}</em> Nights /<em>${rental.dailyPrice}</em> Per night
            <p>Guests: {guests}</p>
            <p>
              Price: <em>${this.totalPrice}</em>
            </p>
            <div className='pt-2'>
              <ApiErrors errors={errors} />
            </div>
          </BwmModal>
        )}
        {!isAuth && (
          <Link
            className='btn btn-bwm-main btn-block'
            to={{
              pathname: '/login',
              state: { redirectTo: `/rentals/${this.props.rental._id}` },
            }}
          >
            Please login to complete reservation.
          </Link>
        )}

        <hr></hr>
      </div>
    );
  }
}

export default BookingReserve;
