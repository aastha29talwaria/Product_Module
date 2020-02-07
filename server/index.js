const express = require('express');
const upload = require('express-fileupload');
const productRouter = require('./routers/products');
const Path =  require('path');
const app = express();  
// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.use(upload());
app.use(productRouter);
app.use('/static', express.static(Path.join(__dirname, 'data', 'productImages')));
// app.use(express.static(Path.join(process.cwd(), "server", "data", "ProductImage")));
app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
