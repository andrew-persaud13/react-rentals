import React from 'react';
import { Redirect } from 'react-router-dom';
import CreateRentalForm from '../components/forms/CreateRentalForm';

import { createRental } from '../actions';
import ApiErrors from 'components/forms/ApiErrors';
class RentalNew extends React.Component {
  state = {
    shouldRedirect: false,
    errors: [],
  };

  handleSubmit = data => {
    createRental(data)
      .then(_ => {
        this.setState({ shouldRedirect: true, errors: [] });
      })
      .catch(errors => this.setState({ errors }));
  };

  render() {
    const { shouldRedirect, errors } = this.state;

    if (shouldRedirect) return <Redirect to={{ pathname: '/' }} />;
    return (
      <>
        <section id='newRental'>
          <div className='bwm-form'>
            <div className='row'>
              <div className='col-md-5'>
                <h1 className='page-title'>
                  Create Rental
                  <CreateRentalForm onSubmit={this.handleSubmit} />
                  <ApiErrors errors={errors} />
                </h1>

                {/* <div>
          <p>
            Some Errors
          </p>
        </div> */}
              </div>
              <div className='col-md-6 ml-auto'>
                <div className='image-container'>
                  <h2 className='catchphrase'>
                    Hundreds of awesome places in reach of few clicks.
                  </h2>
                  <img src='/images/create-rental.jpg' alt='' />
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default RentalNew;
