const express = require('express');
const { authenticateToken } = require('./middleware/auth')

const app = express();
app.use(express.json());
app.use(authenticateToken)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})