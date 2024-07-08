








const request = require('supertest');
const { app, server } = require('../server'); // Adjust the path to your Express application
const { sequelize } = require('../models'); // Adjust the path if needed


// jest.setTimeout(30000); // Extend Jest timeout to 30 seconds

describe('User Registration Endpoint', () => {
  afterAll(async () => {
    await server.close(); // Close the server instance after all tests
  });
  it('should register a user successfully', async () => {
    const userData = {
      firstName: 'JohnM',
      lastName: 'iiiiiii',
      email: 'fasiuulgaa@exaple.com',
      password: 'password123',
       phone: '1234567890'
    };

    const response = await request(app)
      .post('/auth/register')
      .send(userData)
      .expect(201); // Ensure this is the correct status code for successful registration

    // Assertions on the response body
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe('Registration successful');
    expect(response.body.data.accessToken).toBeDefined();
    expect(response.body.data.user).toMatchObject({
      firstName: 'JohnM',
      lastName: 'iiiiiii',
      email: 'fasiuulgaa@exaple.com',
       phone: '1234567890'
     
    });
  });
});
it('should not register a user with an existing email', async () => {
  const userData = {
    firstName: 'Jhn',
    lastName: 'iiiiiiiiiii',
    email: 'favah@example.com',
    password: 'password123',
    phone: '123456789'
  };

  const response = await request(app)
    .post('/auth/register')
    .send(userData)
    .expect(400); // Ensure this is the correct status code for user already exists

  // Assertions on the response body
  expect(response.body.status).toBe('Bad request');
  expect(response.body.message).toBe('User already exists');
});












describe('User Login Endpoint', () => {
  afterAll(async () => {
    await sequelize.close(); // Close the Sequelize connection after all tests
  });

  it('should log in a user successfully', async () => {
    const loginData = {
      email: 'johoooooo@example.com',
  "password": "password123"
    };

    const response = await request(app)
      .post('/auth/login')
      .send(loginData)
      .expect(200);

    expect(response.body.status).toEqual('success');
    expect(response.body.message).toEqual('Login successful');
    expect(response.body.data.accessToken).toBeDefined();
    expect(response.body.data.user).toMatchObject({
      userId: expect.any(String),
      firstName: 'John',
      lastName: 'iiiiiiiiiiiii',
      email: 'johoooooo@example.com',
    });
  });
});
describe('User Registration Endpoint', () => {
  it('should not register a user when required fields are missing', async () => {
    // Missing firstName
    let userData = {
      lastName: 'Doe',
      email: 'johndoei@example.com',
      password: 'password123',
      phone: '1234567890'
    };
    let response = await request(app)
      .post('/auth/register')
      .send(userData)
      .expect(422);

    expect(response.body.errors).toContainEqual({
      field: 'firstName',
      message: 'First name is required'
      });
    })})
   