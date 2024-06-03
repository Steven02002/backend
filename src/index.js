const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const clientRoutes = require('./routes/clientRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Usar las rutas
app.use('/api/clients', clientRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
