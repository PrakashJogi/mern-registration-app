const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./Routes/userRoutes');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/Uploads', express.static('Uploads'));

mongoose.connect('mongodb://localhost:27017/mern-registration', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/users', userRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
