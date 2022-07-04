const app = require('./app');
require('dotenv').config()

app.listen(PORT, () => console.log(`Online on port ${ process.env.PORT }`));
