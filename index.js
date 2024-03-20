const express = require('express');
const authorRouter = require('./authorRouter'); 

const app = express();
app.use(express.json());

app.use('/api/authors', authorRouter);


app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

const port = process.env.PORT || 7000;
app.listen(port, () => {
    console.log(`Listening @ ${port}. To God be the glory...`);
});
