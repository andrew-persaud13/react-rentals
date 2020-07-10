const data = require('./data');
const Rental = require('../models/rental');

class FakeDB {
  async clean() {
    return await Rental.deleteMany({});
  }

  async addData() {
    return await Rental.create(data);
  }

  async populate() {
    await this.clean();
    await this.addData();
  }
}

const fakeDB = new FakeDB();
module.exports = fakeDB;
