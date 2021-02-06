import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const RentalSearch = () => {
  const [location, setLocation] = useState('');
  const history = useHistory();

  const handleSearch = () =>
    location.trim()
      ? history.push(`/rentals/${location}/homes`)
      : history.push('/');

  const handleKeyPress = e => {
    if (e.key === 'Enter') handleSearch();
  };
  return (
    <div className='form-inline my-2 my-lg-0'>
      <input
        className='form-control mr-sm-2 bwm-search'
        type='search'
        placeholder='Search by city...'
        aria-label='Search'
        value={location}
        onChange={e => setLocation(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button
        className='btn btn-outline-success my-2 my-sm-0 btn-bwm-main'
        type='button'
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default RentalSearch;
