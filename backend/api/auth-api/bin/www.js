const App = require('../app.js');
const dotenv = require('dotenv');
dotenv.config();

const app = new App();
app.listen(process.env.PORT);