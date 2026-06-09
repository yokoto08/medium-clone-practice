require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2;
const routes = require('./routes/');

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/medium-clone';

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

routes(router);
app.use('/api', router);

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.log(err));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});