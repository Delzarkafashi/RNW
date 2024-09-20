const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); 
const app = express();
const port = 3000;

// cd server node app.js

// visa mysql -u root -pDelzar_1985! -e "USE items; SHOW TABLES;"


app.use(express.json());
app.use(cors());  // Lägg till denna rad för att aktivera CORS

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

// Endpoint för att hämta alla objekt
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
  
  
  

// Starta servern
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
