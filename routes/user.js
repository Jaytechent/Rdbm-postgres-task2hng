// routes/user.js
const express = require('express');
const { User, Organisation } = require('../models');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Example endpoint to add a user to an organisation
router.post('/organisations/:orgId/users', authenticateToken, async (req, res) => {
  const { userId } = req.body;
  const { orgId } = req.params;

  try {
    const organisation = await Organisation.findByPk(orgId);
    if (!organisation) {
      return res.status(404).json({ message: 'Organisation not found' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await organisation.addUser(user);

    res.status(200).json({ status: 'success', message: 'User added to organisation successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user details
router.get('/users/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      status: 'success',
      message: 'User found',
      data: {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get organisations
router.get('/organisations', authenticateToken, async (req, res) => {
  try {
    const organisations = await Organisation.findAll({
      include: [{
        model: User,
        where: { userId: req.user.userId },
      }],
    });

    res.status(200).json({
      status: 'success',
      message: 'Organisations found',
      data: organisations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get specific organisation
router.get('/organisations/:orgId', authenticateToken, async (req, res) => {
  const { orgId } = req.params;

  try {
    const organisation = await Organisation.findByPk(orgId, {
      include: [{
        model: User,
        where: { userId: req.user.userId },
      }],
    });

    if (!organisation) {
      return res.status(404).json({ message: 'Organisation not found' });
    }

    res.status(200).json({
      status: 'success',
      message: 'Organisation found',
      data: {
        orgId: organisation.orgId,
        name: organisation.name,
        description: organisation.description,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create organisation
router.post('/organisations', authenticateToken, async (req, res) => {
  const { name, description } = req.body;

  try {
    const organisation = new Organisation({
      orgId: new mongoose.Types.ObjectId().toString(),
      name,
      description,
    });

    await organisation.save();
    await organisation.addUser(req.user.userId);

    res.status(201).json({
      status: 'success',
      message: 'Organisation created successfully',
      data: {
        orgId: organisation.orgId,
        name: organisation.name,
        description: organisation.description,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;















// // routes/user.js
// const express = require('express');
// const { User, Organisation } = require('../models');
// const auth = require('../middleware/auth');
// const router = express.Router();

// router.get('/users/:id', auth, async (req, res) => {
//   const user = await User.findByPk(req.params.id);
//   res.status(200).json({
//     status: 'success',
//     message: 'User retrieved successfully',
//     data: {
//       userId: user.userId,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       phone: user.phone
//     }
//   });
// });

// router.get('/organisations', auth, async (req, res) => {
//   const user = await User.findByPk(req.user.userId, {
//     include: Organisation
//   });

//   res.status(200).json({
//     status: 'success',
//     message: 'Organisations retrieved successfully',
//     data: {
//       organisations: user.Organisations.map(org => ({
//         orgId: org.orgId,
//         name: org.name,
//         description: org.description
//       }))
//     }
//   });
// });

// router.get('/organisations/:orgId', auth, async (req, res) => {
//   const organisation = await Organisation.findByPk(req.params.orgId);
//   res.status(200).json({
//     status: 'success',
//     message: 'Organisation retrieved successfully',
//     data: {
//       orgId: organisation.orgId,
//       name: organisation.name,
//       description: organisation.description
//     }
//   });
// });

// router.post('/organisations', auth, async (req, res) => {
//   const { name, description } = req.body;

//   if (!name) {
//     return res.status(422).json({
//       errors: [
//         { field: 'name', message: 'Name is required' }
//       ]
//     });
//   }

//   const organisation = await Organisation.create({
//     orgId: uuidv4(),
//     name,
//     description
//   });

//   const user = await User.findByPk(req.user.userId);
//   await user.addOrganisation(organisation);

//   res.status(201).json({
//     status: 'success',
//     message: 'Organisation created successfully',
//     data: {
//       orgId: organisation.orgId,
//       name: organisation.name,
//       description: organisation.description
//     }
//   });
// });

// router.post('/organisations/:orgId/users', auth, async (req, res) => {
//   const { userId } = req.body;
//   const organisation = await Organisation.findByPk(req.params.orgId);

//   if (!organisation) {
//     return res.status(400).json({
//       status: 'Bad request',
//       message: 'Organisation not found',
//       statusCode: 400
//     });
//   }

//   const user = await User.findByPk(userId);
//   if (!user) {
//     return res.status(400).json({
//       status: 'Bad request',
//       message: 'User not found',
//       statusCode: 400
//     });
//   }});

//   await Organisationrganisation.addUser
//   res.status(200).json({
//     status: 'success',
//     message: 'User added to organisation successfully',
//   });
//   module.exports = router;