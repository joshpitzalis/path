const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin@ds113670.mlab.com:13670/path');

mongoose.connection
  .once('open', () => console.log('Mongo good to go!'))
  .on('error', (error) => {
    console.warn('Warning', error);
  });

// beforEach(() => {
//   mongoose.connection.collection.
// })
