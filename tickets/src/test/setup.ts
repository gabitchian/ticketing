import request from 'supertest';
import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import {app} from '../app';

declare global {
  namespace NodeJS {
    interface Global {
      signup(): string[];
    }
  }
}

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = 'asdf';
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signup = () => {
  //build a JWT payload
  const payload = {
    id: '1lk24j124l',
    email: 'test@test.com',
  };

  //create JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  //build session object
  const session = {jwt: token};

  //turn session into json
  const sessionJSON = JSON.stringify(session);

  //take json and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return a string thats the cookie with the encoded data
  return [`express:sess=${base64}`];
};
