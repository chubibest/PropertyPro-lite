import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

const user = {
  username: 'johngotti',
  address: 'newyork city',
  phonenumber: 6789,
  password: 'jkjlks',
  lastname: 'gotti',
  firstname: 'john',
  email: 'johngotti@gmail.com',
  isAdmin: 'false'
};

describe('Create user route', () => {
  it('should create a user given correct input', async () => {
    const { status, text } = await chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user);
    expect(status).to.eql(201);
    expect(JSON.parse(text).data.last_name).to.eql('gotti');
  });
  it('Should return error message with conflicting user names', async () => {
    const { status, text } = await chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user);
    expect(status).to.eql(409);
    expect(JSON.parse(text).error).to.eql('username johngotti alerady exists');
  });
  it('should return an error for bad input', async () => {
    const { status, text } = await chai.request(app)
      .post('/api/v1/auth/signup')
      .send({ crohns: 'disease' });
    expect(status).to.eql(400);
    expect(JSON.parse(text).error).to.eql('"username" is required');
  });
});

describe('Login user route', () => {
  it('should login a user given correct input', async () => {
    const { status, text } = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        username: 'johngotti',
        password: 'jkjlks'
      });
    expect(status).to.eql(200);
    expect(JSON.parse(text).data.last_name).to.eql('gotti');
  });
  it('Should return an error given a non existent username', async () => {
    const { status, text } = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        username: 'emeka',
        password: 'jkjlks'
      });
    expect(status).to.eql(404);
    expect(JSON.parse(text).error).to.eql('emeka does not exist');
  });
  it('Should for incorrect password', async () => {
    const { status, text } = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({ username: 'johngotti', password: 'hfjdkdfd' });
    expect(status).to.eql(401);
    expect(JSON.parse(text).error).to.eql('Incorrect Password');
  });
  it('should return an error; given bad input', async () => {
    const { status, text } = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        username: 'johngotti',
      });
    expect(status).to.eql(400);
    expect(JSON.parse(text).error).to.eql('"password" is required');
  });
});
