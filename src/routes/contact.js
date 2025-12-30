const express = require('express');
const { submitContact, getContacts } = require('../controllers/contactController');

const router = express.Router();

// POST /api/contact - Submit contact form
router.post('/', submitContact);

// GET /api/contact - Get all contacts (admin)
router.get('/', getContacts);

module.exports = router;