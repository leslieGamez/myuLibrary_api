const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const databaseConfig = require('./config/database');
const bookRoutes = require('./src/routes/bookRoutes');
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');
const requestBooks = require('./src/routes/resquestedBookRoutes');

const app = express();
const port = process.env.PORT || 3088;


app.use(bodyParser.json());


app.use(cors());

mongoose.connect(databaseConfig.url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Database connection error:'));
db.once('open', () => {
  console.log('Database connection successful.');
});

app.use(express.json());

app.use('/api', bookRoutes);
app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', requestBooks);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
