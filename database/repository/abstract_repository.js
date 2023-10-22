'use strict';

const connectToDatabase = require('../connect');

class AbstractRepository {
  constructor(Model) {
    this.Model = Model;
  }

  async getAll() {
    return connectToDatabase().then(() => {
      return this.Model.find().then((result) => {
        return result;
      }).catch((err) => {
        return err;
      });
    });
  }

  async create(data) {
    return connectToDatabase().then(() => {
      return this.Model.create({
        name: data.name,
        password: data.password,
        cpf: data.cpf,
        email: data.email,
        dataNascimento: data.dataNascimento,
      }).then((result) => {
        return result;
      }).catch((err) => {
        return err;
      });
    });
  }

  async read(id) {
    return connectToDatabase().then(() => {
      return this.Model.findById(id).then((result) => {
        return result;
      }).catch((err) => {
        return err;
      });
    });
  }

  async update(id, data) {
    return connectToDatabase().then(() => {
      return this.Model.findByIdAndUpdate(id, data, { new: true }).then((result) => {
        return result;
      }).catch((err) => {
        return err;
      });
    });
  }

  async delete(id) {
    return connectToDatabase().then(() => {
      return this.Model.findByIdAndRemove(id).then((result) => {
        return result;
      }).catch((err) => {
        return err;
      });
    });
  }
}

module.exports = AbstractRepository;