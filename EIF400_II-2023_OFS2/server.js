const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');

const fs = require('fs');
const path = require('path');


const app = express();
const port = 3000; // Change this port as needed

app.use(cors());

app.use(bodyParser.json());

// Serve static content (e.g., React build)
app.use(express.static('build'));

// Process endpoint
app.post('/process', (req, res) => {
  // Process the input and echo it with a timestamp
  const timestampedText = `Echo from server: at ${new Date().toISOString()}: ${req.body.text}`;
  console.log(timestampedText)
  res.json({ result: timestampedText });
});

// About endpoint (for future implementation)
app.get('/about', (req, res) => {
  res.send('About page (to be implemented)');
});



// Load the keywords list from a JSON file


function loadKeywordsList() {
  const keywordsFilePath = path.join(__dirname, 'keywords.json');
  try {
    const keywordsData = fs.readFileSync(keywordsFilePath, 'utf8');
    return JSON.parse(keywordsData);
  } catch (error) {
    console.error('Error loading keywords list:', error);
    return [];
  }
}
const keywordsList = loadKeywordsList();

app.get('/keywords', (req, res) => {
  res.json({ keywords: keywordsList });
});

app.get('/word', (req, res) => {
  const { key } = req.query;
  const isKeyword = keywordsList.includes(key.trim());
  const data = { text: key, isKeyword };
  //console.log(data)
  res.json(data);
});


function loadScripts() {
  const scriptFilePath = path.join(__dirname, 'scripts.json');
  try {
    const scriptData = fs.readFileSync(scriptFilePath, 'utf8');
    const scripts = JSON.parse(scriptData);
    return scripts;
  } catch (error) {
    console.error('Error loading script:', error);
    return {};
  }
}

app.post('/scripts', (req, res) => {
  
  const scripts = loadScripts();
  const newScript = req.body;
  newScript.id = String(scripts.length + 1);
  scripts.push(newScript);
  fs.writeFileSync('scripts.json', JSON.stringify(scripts));
  res.json({ message: 'Script saved' });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
