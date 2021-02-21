const data = require('./data');
const Rental = require('../models/rental');
const User = require('../models/user');
const Booking = require('../models/booking');
const Cloudinary = require('../models/cloudinary-image');

const { users, rentals, images } = data;

class FakeDB {
  async clean() {
    await Rental.deleteMany({});
    await User.deleteMany({});
    await Booking.deleteMany({});
    await Cloudinary.deleteMany({});
  }

  async addData() {
    await Rental.create(rentals);
    await User.create(users);
    await Cloudinary.create(images);
  }

  async populate() {
    await this.clean();
    await this.addData();
  }
}

const fakeDB = new FakeDB();
module.exports = fakeDB;
