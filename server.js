import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Oi');

    res.end();
});

app.listen(3333);