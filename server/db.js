const mongoose = require('mongoose');
// consider for url validation https://www.npmjs.com/package/mongoose-type-url

mongoose.connect(process.env.DBURI);
  // plug in the promise library:
mongoose.Promise = global.Promise;

mongoose.connection.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
  process.exit(1);
});

const TutorialSchema = new mongoose.Schema({
  image: String,
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  edited: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Tutorial', TutorialSchema);
