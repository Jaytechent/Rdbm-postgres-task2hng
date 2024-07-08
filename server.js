const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
let server; // Define server variable outside

server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = {
  app,
  server // Export the server instance for testing purposes
};
