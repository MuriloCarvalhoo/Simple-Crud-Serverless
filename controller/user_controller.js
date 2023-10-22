const UserRepository = require("../database/repository/user_repository");

const userRepository = new UserRepository();

async function createUser(event) {
  const { name, email, password, cpf, dataNascimento } = JSON.parse(event.body);
  const user = { name, email, password, cpf, dataNascimento };
  const result = await userRepository.create(user);
  return {
    statusCode: 201,
    body: JSON.stringify({ id: result })
  };
}

async function getUser(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;

  const { id } = event.pathParameters;
  const user = await userRepository.read(id);
  if (!user) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'User with '+id+' not found ' })
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify(user)
  };
}

async function updateUser(event) {
  const { id } = event.pathParameters;
  const { name, email, password } = JSON.parse(event.body);
  const user = { name, email, password };
  const result = await userRepository.update(id, user);
  if (result === 0) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'User not found' })
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'User updated' })
  };
}

async function deleteUser(event) {
  const { id } = event.pathParameters;
  const result = await userRepository.delete(id);
  if (result === 0) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'User not found' })
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'User deleted' })
  };
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser
};