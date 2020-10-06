const express = require('express');

const app = express();

const routers = require('./router/route');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routers);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`);
});