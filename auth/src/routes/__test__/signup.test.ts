import request from 'supertest';
import {app} from '../../app';

it('returns 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
});

it('returns 400 with an invalid email/password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'tes.com',
      password: 'password',
    })
    .expect(400);

  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'rd',
    })
    .expect(400);
});

it('returns 400 without email and/or password', async () => {
  return request(app).post('/api/users/signup').send({}).expect(400);
});

it('disallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

it('sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
