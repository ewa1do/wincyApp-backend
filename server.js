const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

app.listen(4000, '127.0.0.1', () => {
  console.log('App running on Port: 4000');
});
