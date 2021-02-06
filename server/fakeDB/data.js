const ObjectId = require('mongoose').Types.ObjectId;

const user1Id = ObjectId();
const user2Id = ObjectId();

const data = {
  users: [
    {
      _id: user1Id,
      username: 'tenshu',
      email: 'tips@meeps.com',
      password: '123456',
      avatar:
        'https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/19/UP2477-CUSA06694_00-AV00000000000039/image?w=320&h=320&bg_color=000000&opacity=100&_version=00_09_000',
    },
    {
      _id: user2Id,
      username: 'mapleton',
      email: 'mip@meeps.com',
      password: '123456',
      avatar:
        'https://i.pinimg.com/736x/36/16/1e/36161e373bb92df4a1aea6d58c35c31a.jpg',
    },
  ],
  rentals: [
    {
      title: 'Nice view on ocean',
      city: 'San Francisco',
      street: 'Main street',
      category: 'condo',
      image:
        'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg',
      numOfRooms: 4,
      shared: true,
      description: 'Very nice apartment in center of the city.',
      dailyPrice: 43,
      owner: user1Id,
    },
    {
      title: 'Modern apartment in center',
      city: 'New York',
      street: 'Time Square',
      category: 'apartment',
      image:
        'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg',
      numOfRooms: 1,
      shared: false,
      description: 'Very nice apartment in center of the city.',
      dailyPrice: 11,
      owner: user2Id,
    },
    {
      title: 'Old house in nature',
      city: 'Bratislava',
      street: 'Letna 7',
      category: 'house',
      image:
        'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg',
      numOfRooms: 5,
      shared: true,
      description: 'Very nice apartment in center of the city.',
      dailyPrice: 23,
      owner: user2Id,
    },
  ],
};

module.exports = data;
