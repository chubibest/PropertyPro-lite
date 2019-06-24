import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

const user = {
  username: 'johngotti',
  address: 'newyork city',
  phonenumber: '6789',
  password: 'jkjlks',
  lastname: 'gotti',
  firstname: 'john',
  email: '6789'
};

// let jwtToken;

describe('Create user route', () => {
  it('should create a user given correct input', async () => {
    const { status, text } = await chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user);
    expect(status).to.eql(200);
    expect(JSON.parse(text).data.last_name).to.eql('gotti');
  });
  it('Should return error message with conflicting user names', async () => {
    const { status, text } = await chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user);
    expect(status).to.eql(409);
    expect(JSON.parse(text).error).to.eql('username johngotti alerady exists');
  });
});

describe('Login user route', () => {
  it('should login a user given correct input', async () => {
    const { status, text } = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user);
    expect(status).to.eql(200);
    expect(JSON.parse(text).data.last_name).to.eql('gotti');
    // const { data: { token } } = JSON.parse(text);
    // jwtToken = token;
  });
  it('Should return error message with conflicting user names', async () => {
    const { status, text } = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({ username: 'emeka' });
    expect(status).to.eql(404);
    expect(JSON.parse(text).error).to.eql('emeka does not exist');
  });
  it('Should return error message with conflicting user names', async () => {
    const { status, text } = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({ username: 'johngotti', password: 'hfjdkdfd' });
    expect(status).to.eql(401);
    expect(JSON.parse(text).error).to.eql('Incorrect Password');
  });
});

// export default jwtToken;
