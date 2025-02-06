const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// API routes or other server logic can go here

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
