'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer  = require('multer')

var storage = multer.memoryStorage();
var upload = multer({ storage: storage, limits: { fileSize: 1000000 } });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// res.json({filename: ' ... ', size: n (in bytes)})
app.post('/api/fileanalyse', upload.single('upfile'), function(req, res) {
  // console.log(req.file.originalname);
  // console.log(req.file.size);
  // console.log(req.file);
  // res.send("In file");
  if (!req.file) return res.json({error: "Invalid filename"}); // if file dne 
  
  return res.json({filename: req.file.originalname, size: req.file.size});
});

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
