require('dotenv').config();
const express = require('express');

const userRoutes = require('./routes/userRoutes')
const taskRoutes = require('./routes/taskRoutes');

const AppError = require('./utils/AppError');
const protect = require('./middleware/auth')
require('./db');

const port = 8000;
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//

//App Routes
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
//

//global handler
app.use((err,req,res,next)=>{
    console.log('error', err);
    const statusCode = err.statusCode ||500;
    res.status(statusCode).json({msessage: 'something went wrong'});
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})