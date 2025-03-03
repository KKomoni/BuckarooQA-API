const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


function generateRandomId(prefix, length, chars) {
 let result = prefix;
 for (let i = 0; i < length; i++) {
 result += chars.charAt(Math.floor(Math.random() * chars.length));
 }
 return result;
}

app.use(bodyParser.json());

// MerchantGroup Endpoint
app.post('/v1/merchantgroup', (req, res) => {
 const merchantGroupId = generateRandomId('mg_', 8, '0123456789');
 const response = {
 id: merchantGroupId,
 ...req.body
 };
 res.status(200).json(response);
});

// Merchant Endpoint
app.post('/v1/merchant', (req, res) => {
 const newMerchantId = generateRandomId('m_', 8, '0123456789');
 const response = {
 id: newMerchantId,
 merchantGroupId: req.body.merchantGroupId,
 ...req.body
 };
 res.status(200).json(response);
});

// Start the server
app.listen(port, () => {
 console.log(`Server is running on http://localhost:${port}`);
});