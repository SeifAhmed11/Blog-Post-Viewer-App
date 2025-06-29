import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up SQLite database
const dbPromise = open({
  filename: path.join(__dirname, 'database.sqlite'),
  driver: sqlite3.Database
});

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Initialize database tables
const initDb = async () => {
  const db = await dbPromise;
  
  // Create users table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  // Create events table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      date TEXT NOT NULL,
      venue TEXT NOT NULL,
      price REAL NOT NULL,
      image TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  // Create bookings table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      event_id INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
      FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE
    )
  `);
  
  // Check if admin user exists
  const adminUser = await db.get('SELECT * FROM users WHERE email = ?', ['admin@example.com']);
  
  if (!adminUser) {
    // Create default admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await db.run(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      ['Admin User', 'admin@example.com', hashedPassword, 'admin']
    );
    console.log('Admin user created');
  }
  
  // Add some sample events if none exist
  const eventsCount = await db.get('SELECT COUNT(*) as count FROM events');
  
  if (eventsCount.count === 0) {
    const sampleEvents = [
      {
        title: 'Summer Music Festival',
        description: 'A weekend of amazing music performances featuring top artists from around the world.',
        category: 'Concert',
        date: '2025-07-15T18:00:00',
        venue: 'Central Park, New York',
        price: 89.99,
        image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg'
      },
      {
        title: 'Tech Conference 2025',
        description: 'The biggest tech conference of the year with speakers from leading technology companies.',
        category: 'Conference',
        date: '2025-09-20T09:00:00',
        venue: 'Convention Center, San Francisco',
        price: 299.99,
        image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg'
      },
      {
        title: 'Art Exhibition: Modern Masters',
        description: 'Explore the works of contemporary artists pushing the boundaries of modern art.',
        category: 'Exhibition',
        date: '2025-08-10T10:00:00',
        venue: 'Metropolitan Museum, New York',
        price: 24.99,
        image: 'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg'
      },
      {
        title: 'Basketball Championship Final',
        description: 'The culmination of the season as the two best teams battle for the championship title.',
        category: 'Sports',
        date: '2025-06-30T19:30:00',
        venue: 'Madison Square Garden, New York',
        price: 129.99,
        image: 'https://images.pexels.com/photos/945471/pexels-photo-945471.jpeg'
      },
      {
        title: 'Web Development Workshop',
        description: 'Learn the latest techniques and tools for modern web development in this hands-on workshop.',
        category: 'Workshop',
        date: '2025-08-05T10:00:00',
        venue: 'Tech Hub, Boston',
        price: 49.99,
        image: 'https://images.pexels.com/photos/574069/pexels-photo-574069.jpeg'
      },
      {
        title: 'Food & Wine Festival',
        description: 'Experience culinary delights from renowned chefs and taste exceptional wines from around the world.',
        category: 'Festival',
        date: '2025-07-25T12:00:00',
        venue: 'Waterfront Park, San Diego',
        price: 75.99,
        image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg'
      },
      {
        title: 'Photography Workshop',
        description: 'Master the art of photography with hands-on training from professional photographers.',
        category: 'Workshop',
        date: '2025-08-15T09:00:00',
        venue: 'Creative Studio, Los Angeles',
        price: 149.99,
        image: 'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg'
      },
      {
        title: 'Comedy Night Special',
        description: 'An evening of laughter with top comedians performing their best material.',
        category: 'Entertainment',
        date: '2025-06-20T20:00:00',
        venue: 'Laugh Factory, Chicago',
        price: 35.99,
        image: 'https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg'
      },
      {
        title: 'Startup Networking Event',
        description: 'Connect with entrepreneurs, investors, and industry experts in this exclusive networking event.',
        category: 'Business',
        date: '2025-09-10T18:00:00',
        venue: 'Innovation Hub, Austin',
        price: 0,
        image: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg'
      },
      {
        title: 'Yoga & Wellness Retreat',
        description: 'A weekend of relaxation, meditation, and yoga sessions with expert instructors.',
        category: 'Wellness',
        date: '2025-07-05T08:00:00',
        venue: 'Mountain Resort, Colorado',
        price: 199.99,
        image: 'https://images.pexels.com/photos/1472887/pexels-photo-1472887.jpeg'
      }
    ];
    
    for (const event of sampleEvents) {
      await db.run(
        'INSERT INTO events (title, description, category, date, venue, price, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [event.title, event.description, event.category, event.date, event.venue, event.price, event.image]
      );
    }
    
    console.log('Sample events added');
  }
};

// Authentication middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
    const db = await dbPromise;
    const user = await db.get('SELECT * FROM users WHERE id = ?', [decoded.id]);
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Admin middleware
const admin = async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// API Routes

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    const db = await dbPromise;
    const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await db.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );
    
    const user = await db.get('SELECT id, name, email, role FROM users WHERE id = ?', [result.lastID]);
    
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({ user, token });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    const db = await dbPromise;
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/auth/user', auth, async (req, res) => {
  try {
    const user = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    };
    
    res.json(user);
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Event routes
app.get('/api/events', async (req, res) => {
  try {
    const db = await dbPromise;
    const events = await db.all('SELECT * FROM events ORDER BY date ASC');
    
    res.json(events);
  } catch (err) {
    console.error('Get events error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const db = await dbPromise;
    const event = await db.get('SELECT * FROM events WHERE id = ?', [id]);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(event);
  } catch (err) {
    console.error('Get event error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/events', auth, admin, async (req, res) => {
  try {
    const { title, description, category, date, venue, price, image } = req.body;
    
    if (!title || !description || !category || !date || !venue || price === undefined) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }
    
    const db = await dbPromise;
    const result = await db.run(
      'INSERT INTO events (title, description, category, date, venue, price, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description, category, date, venue, price, image || null]
    );
    
    const event = await db.get('SELECT * FROM events WHERE id = ?', [result.lastID]);
    
    res.status(201).json(event);
  } catch (err) {
    console.error('Create event error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/events/:id', auth, admin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, date, venue, price, image } = req.body;
    
    if (!title || !description || !category || !date || !venue || price === undefined) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }
    
    const db = await dbPromise;
    await db.run(
      'UPDATE events SET title = ?, description = ?, category = ?, date = ?, venue = ?, price = ?, image = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [title, description, category, date, venue, price, image || null, id]
    );
    
    const event = await db.get('SELECT * FROM events WHERE id = ?', [id]);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(event);
  } catch (err) {
    console.error('Update event error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/events/:id', auth, admin, async (req, res) => {
  try {
    const { id } = req.params;
    
    const db = await dbPromise;
    const result = await db.run('DELETE FROM events WHERE id = ?', [id]);
    
    if (result.changes === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error('Delete event error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Booking routes
app.get('/api/bookings', auth, async (req, res) => {
  try {
    const db = await dbPromise;
    const bookings = await db.all(`
      SELECT b.*, e.title, e.date, e.venue, e.price, e.image
      FROM bookings b
      JOIN events e ON b.event_id = e.id
      WHERE b.user_id = ?
      ORDER BY b.created_at DESC
    `, [req.user.id]);
    
    res.json(bookings);
  } catch (err) {
    console.error('Get bookings error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/bookings', auth, async (req, res) => {
  try {
    const { eventId } = req.body;
    
    if (!eventId) {
      return res.status(400).json({ message: 'Event ID is required' });
    }
    
    const db = await dbPromise;
    
    // Check if the event exists
    const event = await db.get('SELECT * FROM events WHERE id = ?', [eventId]);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Check if the user has already booked this event
    const existingBooking = await db.get(
      'SELECT * FROM bookings WHERE user_id = ? AND event_id = ?',
      [req.user.id, eventId]
    );
    
    if (existingBooking) {
      return res.status(400).json({ message: 'You have already booked this event' });
    }
    
    const result = await db.run(
      'INSERT INTO bookings (user_id, event_id) VALUES (?, ?)',
      [req.user.id, eventId]
    );
    
    const booking = await db.get(`
      SELECT b.*, e.title, e.date, e.venue, e.price, e.image
      FROM bookings b
      JOIN events e ON b.event_id = e.id
      WHERE b.id = ?
    `, [result.lastID]);
    
    res.status(201).json(booking);
  } catch (err) {
    console.error('Create booking error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
app.listen(PORT, async () => {
  try {
    await initDb();
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    console.error('Database initialization error:', err);
  }
});