const httpStatus = require('http-status');
const { User } = require('../model');

const createUser = async (userBody) => {
    if (await User.isEmailTaken(userBody.email)) {
      throw new Error('Email already taken');
    }
    return User.create(userBody);
  };

const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw Error('Invalid User');
  }
  return user;
};

module.exports = {
   createUser,
   getUserByEmail,
   loginUserWithEmailAndPassword
}

