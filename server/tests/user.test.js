import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

const user = {
  address: 'newyork city',
  phone_number: 6789,
  password: 'jkjlks',
  last_name: 'gotti',
  first_name: 'john',
  email: 'johngotti@gmail.com'
};

const sameEmail = {
  address: 'newyork city',
  phone_number: 6789,
  password: 'jkjlks',
  last_name: 'gotti',
  first_name: 'john',
  email: 'johngotti@gmail.com'
};
describe('Create user route', () => {
  it('should create a user given correct input', async () => {
    const { status, text } = await chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user);
    expect(status).to.eql(201);
    expect(JSON.parse(text).data.last_name).to.eql('gotti');
  });
  it('Should return error message with conflicting emails', async () => {
    const { status } = await chai.request(app)
      .post('/api/v1/auth/signup')
      .send(sameEmail);
    expect(status).to.eql(409);
  });
  it('should return an error for bad input', async () => {
    const { status, text } = await chai.request(app)
      .post('/api/v1/auth/signup')
      .send({ crohns: 'disease' });
    expect(status).to.eql(400);
    expect(JSON.parse(text).error).to.eql('"password" is required');
  });
});

describe('Login user route', () => {
  it('should login a user given correct input', async () => {
    const { status, text } = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'johngotti@gmail.com',
        password: 'jkjlks'
      });
    expect(status).to.eql(200);
    expect(JSON.parse(text).data.last_name).to.eql('gotti');
  });
  it('Should return an error given a non existent username', async () => {
    const { status, text } = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'emeka@g.com',
        password: 'jkjlks'
      });
    expect(status).to.eql(404);
    expect(JSON.parse(text).error).to.eql('user does not exist');
  });
  it('Should for incorrect password', async () => {
    const { status, text } = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({ email: 'johngotti@gmail.com', password: 'hfjdkdfd' });
    expect(status).to.eql(401);
    expect(JSON.parse(text).error).to.eql('Incorrect Password');
  });
  it('should return an error; given bad input', async () => {
    const { status, text } = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'johngotti@gmail.com',
      });
    expect(status).to.eql(400);
    expect(JSON.parse(text).error).to.eql('"password" is required');
  });
});

describe('Change Password Route', () => {
  let jwtToken;
  before(async () => {
    const { text } = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'johngotti@gmail.com',
        password: 'jkjlks'
      });
    jwtToken = JSON.parse(text).data.token;
  });
  it('Should send password to email when request body is missing', async () => {
    const { status } = await chai.request(app)
      .post('/auth/chubi.best@gmail.com/reset_password')
      .send();
    expect(status).to.eql(204);
  });
  it('Should reset password when details are provided', async () => {
    const { status } = await chai.request(app)
      .post('/auth/johngotti@gmail.com/reset_password')
      .set('authorization', jwtToken)
      .send({ oldpass: 'jkjlks', newpass: 'fireboy' });
    expect(status).to.eql(204);
  });
  it('Should return an error for wrong credentials', async () => {
    const { status } = await chai.request(app)
      .post('/auth/johngotti@gmail.com/reset_password')
      .set('authorization', jwtToken)
      .send({ oldpass: 'jkjlks', newpass: 'fireboy' });
    expect(status).to.eql(403);
  });
});
