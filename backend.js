  // Trigger redeployrequire('dotenv').config();
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const fs = require('fs');

const DB_FILE = process.env.DB_FILE || 'inventory.db';
const PORT = process.env.PORT || 4000;

const localProducts = [
  { id: 'solene' },
  { id: 'amea' },
  { id: 'liora' },
  { id: 'celestine' },
  { id: 'seraphine' },
  { id: 'aurelia' },
  { id: 'zia' }
];

// Create inventory table with string IDs
const dbExists = fs.existsSync(DB_FILE);
const db = new sqlite3.Database(DB_FILE);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS inventory (
    id TEXT PRIMARY KEY,
    stock INTEGER NOT NULL,
    preorderAvailable INTEGER NOT NULL DEFAULT 0
  )`);

  // Remove inventory rows not in localProducts
  db.all('SELECT id FROM inventory', [], (err, rows) => {
    if (!err && rows) {
      const idsToRemove = rows.filter(row => !localProducts.find(p => p.id === row.id)).map(row => row.id);
      idsToRemove.forEach(id => {
        db.run('DELETE FROM inventory WHERE id = ?', [id]);
      });
    }
  });

  // Add or update inventory for all local products
  localProducts.forEach(p => {
    db.get('SELECT * FROM inventory WHERE id = ?', [p.id], (err, row) => {
      if (!row) {
        db.run('INSERT INTO inventory (id, stock, preorderAvailable) VALUES (?, ?, ?)', [p.id, 10, 0]);
      }
    });
  });
});

const app = express();
app.use(bodyParser.json());

// CORS for frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// GET /inventory/:id
app.get('/inventory/:id', (req, res) => {
  db.get('SELECT * FROM inventory WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!row) return res.status(404).json({ error: 'Product not found' });
    row.preorderAvailable = !!row.preorderAvailable;
    res.json(row);
  });
});

// GET /inventory
app.get('/inventory', (req, res) => {
  db.all('SELECT * FROM inventory', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    rows.forEach(row => row.preorderAvailable = !!row.preorderAvailable);
    res.json(rows);
  });
});

// PATCH /inventory/:id/stock
app.patch('/inventory/:id/stock', (req, res) => {
  const { stock } = req.body;
  if (typeof stock !== 'number' || stock < 0) {
    return res.status(400).json({ error: 'Invalid stock value' });
  }
  db.run('UPDATE inventory SET stock = ? WHERE id = ?', [stock, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (this.changes === 0) return res.status(404).json({ error: 'Product not found' });
    res.json({ success: true, stock });
  });
});

// PATCH /inventory/:id/preorder
app.patch('/inventory/:id/preorder', (req, res) => {
  const { preorderAvailable } = req.body;
  if (typeof preorderAvailable !== 'boolean') {
    return res.status(400).json({ error: 'Invalid preorderAvailable value' });
  }
  db.run('UPDATE inventory SET preorderAvailable = ? WHERE id = ?', [preorderAvailable ? 1 : 0, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (this.changes === 0) return res.status(404).json({ error: 'Product not found' });
    res.json({ success: true, preorderAvailable });
  });
});

// POST /orders
app.post('/orders', (req, res) => {
  const { productId, quantity } = req.body;
  if (typeof productId !== 'string' || typeof quantity !== 'number' || quantity <= 0) {
    return res.status(400).json({ error: 'Invalid productId or quantity' });
  }
  db.get('SELECT * FROM inventory WHERE id = ?', [productId], (err, product) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    if (product.stock >= quantity) {
      db.run('UPDATE inventory SET stock = stock - ? WHERE id = ?', [quantity, productId], function(err) {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json({ success: true, type: 'purchase', productId, quantity });
      });
    } else if (product.stock === 0 && product.preorderAvailable) {
      res.json({ success: true, type: 'preorder', productId, quantity });
    } else {
      res.status(400).json({ error: 'Not enough stock and preorder not available' });
    }
  });
});

// POST /create-checkout-session
app.post('/create-checkout-session', async (req, res) => {
  const { cartItems } = req.body;
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  try {
    const line_items = cartItems.map(item => ({
      price_data: {
        currency: 'gbp',
        product_data: {
          name: item.name + (item.selectedVase ? ` + Vase: ${item.selectedVase.name}` : ''),
        },
        unit_amount: Math.round((item.price + (item.selectedVase?.price || 0)) * 100),
      },
      quantity: item.quantity,
    }));

    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:3000/checkout?success=true',
      cancel_url: 'http://localhost:3000/checkout?canceled=true',
    });
    res.json({ sessionId: session.id });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: 'Stripe session creation failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Inventory backend running on http://localhost:${PORT}`);
}); 