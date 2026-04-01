const express = require('express');

const userRoutes = require('./routes/userRoutes')
require('./db');

const port = 3000;
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extennded: true}));
//

//App Routes
app.use('/users', userRoutes);
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