const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const contactSchema = new Schema({
  contactName: {
    type: String,
    required: 'Please name your contact',
    minlength: 1,
    maxlength: 100,
    trim: true,
  },
  contactZipCode: {
    type: String,
    required: 'Please add contact zip code'
  },
  contactAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  events: [
    {
      eventName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
      },
      eventDate: {
        type: String,
        require: true,
      }
    },
  ],
});

const Contact = model('Contact', contactSchema);

module.exports = Contact;
