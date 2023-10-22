const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserRepository = require('../repository/user_repository');
const db = require("../database/connect");
const userRepository = new UserRepository(db);

async function login(event) {
  const { email, password } = JSON.parse(event.body);
  const user = await userRepository.findByEmail(email);
  if (!user) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Invalid email or password' })
    };
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Invalid email or password' })
    };
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  return {
    statusCode: 200,
    body: JSON.stringify({ token })
  };
}

module.exports = {
  login
};