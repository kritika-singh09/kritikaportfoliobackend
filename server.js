const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

console.log('Starting server...');
console.log('Environment:', process.env.NODE_ENV);
console.log('MongoDB URI exists:', !!process.env.MONGO_URI);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio Backend API', status: 'running' });
});

// Simple contact route without database
app.post('/api/contact', (req, res) => {
  try {
    console.log('Contact form submission:', req.body);
    const { name, email, company, message } = req.body;

    if (!name || !email || !message) {
      console.log('Validation failed: Missing required fields');
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    console.log('Contact form data received successfully');
    res.status(201).json({ 
      message: 'Contact form submitted successfully',
      success: true 
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});