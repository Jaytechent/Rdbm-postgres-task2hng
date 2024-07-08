// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Organisation } = require('../models');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

router.post('/register', async (req, res) => {
    console.log('Request Body:', req.body); // Log the request body

  const { firstName, lastName, email, password, phone } = req.body;
  const errors = [];

  if (!firstName) errors.push({ field: 'firstName', message: 'First name is required' });
  if (!lastName) errors.push({ field: 'lastName', message: 'Last name is required' });
  if (!email) errors.push({ field: 'email', message: 'Email is required' });
  if (!password) errors.push({ field: 'password', message: 'Password is required' });
  if (!phone) errors.push({ field: 'phone', message: 'Phone Number is required' });
  if (errors.length) {
    return res.status(422).json({ errors });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        status: 'Bad request',
        message: 'User already exists',
        statusCode: 400
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      userId: uuidv4(),
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone
    });

    const organisation = await Organisation.create({
      orgId: uuidv4(),
      name: `${firstName}'s Organisation`
    });

    await user.addOrganisation(organisation);

    const token = jwt.sign({ userId: user.userId }, 'your_secret_key', { expiresIn: '1h' });

    res.status(201).json({
      status: 'success',
      message: 'Registration successful',
      data: {
        accessToken: token,
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone
        }
      }
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({
      status: 'Internal server error',
      message: 'Registration unsuccessful',
      statusCode: 500
    });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: 'Unauthorized',
        message: 'Authentication failed',
        statusCode: 401
      });
    }

    const token = jwt.sign({ userId: user.userId }, 'your_secret_key', { expiresIn: '1h' });

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        accessToken: token,
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone
        }
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({
      status: 'Internal server error',
      message: 'Authentication failed',
      statusCode: 500
    });
  }
});

module.exports = router;
