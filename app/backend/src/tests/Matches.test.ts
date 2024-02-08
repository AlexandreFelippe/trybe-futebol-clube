import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeModel from '../database/models/SequelizeMatches';
import { finishedGame, matchGames } from './mocks/Match.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches Test', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return all Matches', async function () {
    sinon.stub(SequelizeModel, 'findAll').resolves(matchGames as any);

    const response = await chai.request(app).get('/matches');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.eq(matchGames);
  })

  it('should return a finished match', async () => {
    sinon.stub(SequelizeModel, 'findAll').resolves(finishedGame as any);
    const { status, body } = await chai
      .request(app)
      .get('/matches?inProgress=false');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(finishedGame);
  });
  it('should return a inProgress match', async () => {
    sinon.stub(SequelizeModel, 'findAll').resolves(matchGames as any);
    const { status, body } = await chai
      .request(app)
      .get('/matches?inProgress=true');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(matchGames);
  });
  it('should return a created match', async () => {
    sinon.stub(SequelizeModel, 'create').resolves(matchGames[0] as any);
    const { status, body } = await chai
      .request(app)
      .post('/matches')
      .send(matchGames[0]);
    expect(status).to.be.equal(201);
    expect(body).to.be.deep.equal(matchGames[0]);
  })
});
