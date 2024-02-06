import * as sinon from 'sinon';
import * as chai from 'chai';
import { App } from '../app';
import Validations from '../middlewares/validations';
import SequelizeUser from '../../src/database/models/SequelizeUser';
import {   
  user,
  userWithoutPassword,
  invalidEmailLoginBody,
  invalidPasswordLoginBody,
  validLoginBody,
  wrongPassUser,
  userRegistered, } from './mocks/User.mocks';

// @ts-ignore

import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App();

describe('Users Test', function() {
  it('should return a user', async function() {
    it('should return all users', async function() {
      sinon.stub(SequelizeUser, 'findAll').resolves(user as any);
  
      const { status, body } = await chai.request(app).get('/users');
  
      expect(status).to.equal(200);
      expect(body).to.deep.equal(user);
  })
  it('should return a user by id', async function() {
    sinon.stub(SequelizeUser, 'findByPk').resolves(userWithoutPassword as any);

    const { status, body } = await chai.request(app).get('/users/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(userWithoutPassword);
  })
  it('should return a message when user is not found', async function() {
    sinon.stub(SequelizeUser, 'findByPk').resolves(null);

    const { status, body } = await chai.request(app).get('/users/1');

    expect(status).to.equal(404);
    expect(body.message).to.equal('User not found');
  });
  it('should return a token when user is autenticated', async function () {
    const response = await chai.request(app).post('/login').send(validLoginBody);
    expect(response.status).to.equal(200);
    expect(response.body).to.haveOwnProperty('token');    
  })
  it('should return a message when email is invalid', async function () {
    const response = await chai.request(app).post('/login').send(invalidEmailLoginBody);
    expect(response.status).to.equal(400);
    expect(response.body).to.haveOwnProperty('message');
  })
  it('should return a message when password is invalid', async function () {
    const response = await chai.request(app).post('/login').send(invalidPasswordLoginBody);
    expect(response.status).to.equal(400);
    expect(response.body).to.haveOwnProperty('message');
  })
  afterEach(sinon.restore)
})
})