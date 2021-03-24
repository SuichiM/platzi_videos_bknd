const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

const USER = encodeURIComponent(config.db_user);
const PASS = encodeURIComponent(config.db_pass);
const DB_NAME = config.db_name;

const MONGO_URI = (config.dev) ? 
   `${config.db_protocol}://${USER}:${PASS}@${config.db_host}:${config.db_port}/?retryWrites=true&w=majority`
:
    `${config.db_protocol}://${USER}:${PASS}@${config.db_host}/?retryWrites=true&w=majority`

console.log(MONGO_URI);

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.dbName = DB_NAME;
  }

  async connect() {
    if (! this.client.isConnected()) {
      await this.client.connect()
    }
    return this.client.db(this.dbName)
  }

  async getAll(collection, query) {
    const db = await this.connect();
    const data = await db.collection(collection).find(query).toArray();
    const totalCount = await db.collection(collection).countDocuments();
    return { data, count: data.length, totalCount };
  }

  async get(collection, id) {
    const db = await this.connect();
    return db.collection(collection).findOne({ _id: ObjectId(id) });
  }

  async create(collection, data) {
    const db = await this.connect();
    const record = await db.collection(collection).insertOne(data);
    return record.insertedId;
  }

  async update(collection, id, data) {
    const db = await this.connect();
    const result = await db
      .collection(collection)
      .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
    return result.upsertedId || id;
  }

  async delete(collection, id) {
    const db = await this.connect();
    const record = await db
      .collection(collection)
      .deleteOne({ _id: ObjectId(id) });
    return id;
  }
}

module.exports = MongoLib;
