const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

const helmet = require('helmet');

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    imgSrc: ["'self'"],
  },
}));


// cd server node app.js

// visa mysql -u root -pDelzar_1985! -e "USE items; SHOW TABLES;"


app.use(express.json());
app.use(cors());  //aktivera CORS

// Skapa MySQL-anslutning
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  
  password: 'Delzar_1985!',  
  database: 'items'  
});

// Anslut till MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});
//api
app.post('/add-item', (req, res) => {
    const { name, description } = req.body;
  
    if (!name || !description) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    //       // Logga de mottagna värdena
    //          console.log('Received data:', name, description);
  
    const query = 'INSERT INTO items (name, description) VALUES (?, ?)';

    //       // Logga SQL-frågan
    //         console.log('SQL Query:', query);

    console.log('SQL Query:', query); 
  
    db.query(query, [name, description], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err); // Fler detaljer om felet
        return res.status(500).json({ message: 'Database error' });
      }
  
      res.status(201).json({ message: 'Item added successfully', id: result.insertId });
    });
  });

  // api
app.get('/items', (req, res) => {
  const query = 'SELECT * FROM items';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    res.json(results); // Returnerar JSON-data till frontend
  });
});

//api
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Logga mottagna data
  console.log('Received data:', req.body);

  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(query, [username, hashedPassword], (err, result) => {
    if (err) {
      console.error('Error registering user:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(201).json({ message: 'User registered successfully' });
  });
});




// api
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], async (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  });
});


// Verify JWT middleware (for protected routes)
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
};

// api
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});


  
  

// Starta servern
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


