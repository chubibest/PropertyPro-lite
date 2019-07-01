import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
const ad = {
  type: '2 bedroom',
  state: 'kogi',
  city: 'lokoja',
  address: 'abaji abuja',
  price: 3000,
  image_url: 'djkdfds'
};

describe('Property routes', () => {
  let jwtToken;
  let propid;
  before(async () => {
    const { text } = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        username: 'johngotti',
        password: 'jkjlks'
      });
    jwtToken = JSON.parse(text).data.token;
  });

  describe('Get ads when empty', () => {
    it('should  return a message when there are no ads', async () => {
      const { status, text } = await chai.request(app)
        .get('/api/v1/property')
        .set('authorization', jwtToken)
        .send();
      expect(status).to.eql(200);
      expect(JSON.parse(text).data).to.eql('No ads at this time');
    });
    it('should a message when there are no ads of specific type', async () => {
      const { status, text } = await chai.request(app)
        .get('/api/v1/property?type=2+bedroom')
        .set('authorization', jwtToken)
        .send();
      expect(status).to.eql(200);
      expect(JSON.parse(text).data).to.eql('2 bedroom unavailable at the moment');
    });
  });
  describe('Post Ad route', () => {
    it('should create a new ad', async () => {
      const { status, text } = await chai.request(app)
        .post('/api/v1/property')
        .set('authorization', jwtToken)
        .send(ad);
      expect(status).to.eql(200);
      expect(JSON.parse(text).data.price).to.eql(3000);
      propid = JSON.parse(text).data.id;
    });
    it('should return an error for unauthenticated user', async () => {
      const { status, text } = await chai.request(app)
        .post('/api/v1/property')
        .set('authorization', 'ABCDEFG HIJKLMNOP QRSTUV WXYZ')
        .send(ad);
      expect(status).to.eql(403);
      expect(JSON.parse(text).error).to.eql('Invalid token');
    });
    it('should return an error for unauthenticated user', async () => {
      const { status, text } = await chai.request(app)
        .post('/api/v1/property')
        .set('authorization', '')
        .send(ad);
      expect(status).to.eql(403);
      expect(JSON.parse(text).error).to.eql('Please provide a token');
    });
    it('should return an error for bad data', async () => {
      const { status, text } = await chai.request(app)
        .post('/api/v1/property')
        .set('authorization', jwtToken)
        .send({ crohns: 'disease' });
      expect(status).to.eql(400);
      expect(JSON.parse(text).error).to.eql('"type" is required');
    });
  });

  describe('Update ad', () => {
    it('should update an ad', async () => {
      const { status, text } = await chai.request(app)
        .patch(`/api/v1/property/${propid}`)
        .set('authorization', jwtToken)
        .send({ state: 'lagos', city: 'ikeja' });
      expect(status).to.eql(200);
      expect(JSON.parse(text).data.state).to.eql('lagos');
    });
    it('should return an error for wrong id', async () => {
      const { status, text } = await chai.request(app)
        .patch('/api/v1/property/gbamurokoto')
        .set('authorization', jwtToken)
        .send({ state: 'edo', city: 'ekosodin' });
      expect(status).to.eql(404);
      expect(JSON.parse(text).error).to.eql('Not Found');
    });
    it('should return an error; given bad input', async () => {
      const { status, text } = await chai.request(app)
        .patch(`/api/v1/property/${propid}`)
        .set('authorization', jwtToken)
        .send({ zues: 'lagos', city: 'ikeja' });
      expect(status).to.eql(400);
      expect(JSON.parse(text).error).to.eql('"zues" is not allowed');
    });
  });

  describe('Change ad status', () => {
    it('should change ad status', async () => {
      const { status, text } = await chai.request(app)
        .patch(`/api/v1/property/${propid}/sold`)
        .set('authorization', jwtToken)
        .send();
      expect(status).to.eql(200);
      expect(JSON.parse(text).data.status).to.eql('Sold');
    });
    it('should return an error for wrong id', async () => {
      const { status, text } = await chai.request(app)
        .patch('/api/v1/property/gbamurokoto/sold')
        .set('authorization', jwtToken)
        .send();
      expect(status).to.eql(404);
      expect(JSON.parse(text).error).to.eql('Not Found');
    });
  });

  describe('Get ads', () => {
    it('should return ads', async () => {
      const { status, text } = await chai.request(app)
        .get('/api/v1/property')
        .set('authorization', jwtToken)
        .send();
      expect(status).to.eql(200);
      expect(JSON.parse(text).data.length).to.eql(1);
    });
    it('should ad of given type', async () => {
      const { status, text } = await chai.request(app)
        .get('/api/v1/property?type=2+bedroom')
        .set('authorization', jwtToken)
        .send();
      expect(status).to.eql(200);
      expect(JSON.parse(text).data.length).to.eql(1);
    });
  });

  describe('Get ad by id', () => {
    it('should get ad by id', async () => {
      const { status, text } = await chai.request(app)
        .get(`/api/v1/property/${propid}`)
        .set('authorization', jwtToken)
        .send();
      expect(status).to.eql(200);
      expect(JSON.parse(text).status).to.eql('success');
    });
    it('should return an error for wrong id', async () => {
      const { status, text } = await chai.request(app)
        .get('/api/v1/property/gbamurokoto')
        .set('authorization', jwtToken)
        .send();
      expect(status).to.eql(404);
      expect(JSON.parse(text).error).to.eql('Not Found');
    });
  });

  describe('Delete ad', () => {
    it('should delete an ad', async () => {
      const { status } = await chai.request(app)
        .delete(`/api/v1/property/${propid}`)
        .set('authorization', jwtToken)
        .send();
      expect(status).to.eql(204);
    });
    it('should return an error for wrong id', async () => {
      const { status, text } = await chai.request(app)
        .delete('/api/v1/property/gbamurokoto')
        .set('authorization', jwtToken)
        .send();
      expect(status).to.eql(404);
      expect(JSON.parse(text).error).to.eql('Not Found');
    });
  });
});
