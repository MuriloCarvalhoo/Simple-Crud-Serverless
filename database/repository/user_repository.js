const connectToDatabase = require('../connect');
const User = require("../models/User");
const AbstractRepository = require('./abstract_repository');

class UserRepository extends AbstractRepository {
  constructor() {
    super(User);
    this.Model = User;
  }

  async findByEmail(email) {
    return connectToDatabase().then(() => {
      return this.Model.findOne({ email }).then((result) => {
        return result;
      }).catch((err) => {
        return err;
      });
    });
  }

  async findByUsername(name) {
    connectToDatabase().then(() => {
      return this.Model.findOne({ name }).then((result) => {
        return result;
      }).catch((err) => {
        return err;
      });
    });
  }

  async findByCpf(cpf) {
    connectToDatabase().then(() => {
      return this.Model.findOne({ cpf }).then((result) => {
        return result;
      }).catch((err) => {
        return err;
      });
    });
  }
}

module.exports = UserRepository;