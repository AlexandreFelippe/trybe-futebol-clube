import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeModel from '../database/models/SequelizeTeam';
import { teams, teamId } from './mocks/Team.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams Test', () => {
  it('should return all teams', async function() {
    sinon.stub(SequelizeModel, 'findAll').resolves(teams as any);
    const response = await chai.request(app).get('/teams');
    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(teams);
    sinon.restore();
  })

  it('should return a team by id', async function() {
    sinon.stub(SequelizeModel, 'findByPk').resolves(teamId as any);
    const response = await chai.request(app).get('/teams/5');
    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(teamId);
    sinon.restore();
  });

  it('should return a not found', async function() {
    sinon.stub(SequelizeModel, 'findByPk').resolves(null);
    const response = await chai.request(app).get('/teams/6');
    expect(response.status).to.be.eq(404);
    sinon.restore();
  })
});
