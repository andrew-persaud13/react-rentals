const data = require('./data');
const Rental = require('../models/rental');
const User = require('../models/user');
const Booking = require('../models/booking');

const { users, rentals } = data;

class FakeDB {
  async clean() {
    await Rental.deleteMany({});
    await User.deleteMany({});
    await Booking.deleteMany({});
  }

  async addData() {
    await Rental.create(rentals);
    await User.create(users);
  }

  async populate() {
    await this.clean();
    await this.addData();
  }
}

const fakeDB = new FakeDB();
module.exports = fakeDB;
