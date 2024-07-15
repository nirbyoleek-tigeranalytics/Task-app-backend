const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

const mongoURI = 'mongodb+srv://Niyan:Niyan@cluster0.ajs67ll.mongodb.net/TASK-APP?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json()); // Middleware to parse JSON bodies

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
