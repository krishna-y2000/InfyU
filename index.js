const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000 ;
const server = require('./routes/server');
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.set('view engine' ,'ejs');
app.use(server);
app.listen(PORT , () => {
    console.log('server is running');
});