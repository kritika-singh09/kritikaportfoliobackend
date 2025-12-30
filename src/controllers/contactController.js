const Contact = require('../models/Contact');

const submitContact = async (req, res) => {
  try {
    console.log('Contact form submission:', req.body);
    const { name, email, company, message } = req.body;

    if (!name || !email || !message) {
      console.log('Validation failed: Missing required fields');
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    const contact = new Contact({
      name,
      email,
      company,
      message
    });

    await contact.save();
    console.log('Contact saved successfully');

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
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  submitContact,
  getContacts
};