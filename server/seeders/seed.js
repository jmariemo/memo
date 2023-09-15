const db = require('../config/connection');
const { User, Contact } = require('../models');
const userSeeds = require('./userSeeds.json');
const contactSeeds = require('./contactSeeds.json');

db.once('open', async () => {
  try {
    await Contact.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < contactSeeds.length; i++) {
      const { _id, contactAuthor } = await Contact.create(contactSeeds[i]);
      const user = await User.findOneAndUpdate(
        { userName: contactAuthor },
        {
          $addToSet: {
            contacts: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
