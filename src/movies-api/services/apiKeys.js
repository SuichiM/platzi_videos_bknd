const MongoLib = require('../lib/mongodb');

class ApiKeyService {
  constructor() {
    this.collection = 'api-keys';
    this.mongoDB = new MongoLib();
  }

  async get({ token }) {
    const {data:[apiKey]} = await this.mongoDB.getAll(this.collection, { token });
    return apiKey;
  }
}

module.exports = ApiKeyService;
