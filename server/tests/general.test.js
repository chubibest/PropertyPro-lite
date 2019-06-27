import chai, { expect } from 'chai';
import chatHttp from 'chai-http';
import app from '../index';

chai.use(chatHttp);

describe('General tests', () => {
  it('should display a welcome message at api base', async () => {
    const { status } = await chai.request(app)
      .get('/api/v1').send();
    expect(status).to.eql(200);
  });
});

describe('General tests', () => {
  it('should redirect home from unknown path', async () => {
    const { status } = await chai.request(app)
      .get('/gjhk').send();
    expect(status).to.eql(404);
  });
});
