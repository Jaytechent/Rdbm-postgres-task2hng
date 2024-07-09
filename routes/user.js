




// routes/user.js
const express = require('express');
const { User, Organisation } = require('../models');
const auth = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid'); // Add uuid for generating unique IDs
const router = express.Router();

router.get('/users/:id', auth, async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.status(200).json({
    status: 'success',
    message: 'User retrieved successfully',
    data: {
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone
    }
  });
});

router.get('/organisations', auth, async (req, res) => {
  const user = await User.findByPk(req.user.userId, {
    include: Organisation
  });

  res.status(200).json({
    status: 'success',
    message: 'Organisations retrieved successfully',
    data: {
      organisations: user.Organisations.map(org => ({
        orgId: org.orgId,
        name: org.name,
        description: org.description
      }))
    }
  });
});

router.get('/organisations/:orgId', auth, async (req, res) => {
  const organisation = await Organisation.findByPk(req.params.orgId);
  res.status(200).json({
    status: 'success',
    message: 'Organisation retrieved successfully',
    data: {
      orgId: organisation.orgId,
      name: organisation.name,
      description: organisation.description
    }
  });
});

router.post('/organisations', auth, async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(422).json({
      errors: [
        { field: 'name', message: 'Name is required' }
      ]
    });
  }

  const organisation = await Organisation.create({
    orgId: uuidv4(),
    name,
    description
  });

  const user = await User.findByPk(req.user.userId);
  await user.addOrganisation(organisation);

  res.status(201).json({
    status: 'success',
    message: 'Organisation created successfully',
    data: {
      orgId: organisation.orgId,
      name: organisation.name,
      description: organisation.description
    }
  });
});

router.post('/organisations/:orgId/users', auth, async (req, res) => {
  const { userId } = req.body;
  const organisation = await Organisation.findByPk(req.params.orgId);

  if (!organisation) {
    return res.status(400).json({
      status: 'Bad request',
      message: 'Organisation not found',
      statusCode: 400
    });
  }

  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(400).json({
      status: 'Bad request',
      message: 'User not found',
      statusCode: 400
    });
  }

  await organisation.addUser(user);
  res.status(200).json({
    status: 'success',
    message: 'User added to organisation successfully',
  });
});

module.exports = router;
