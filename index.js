const express = require('express');
const cors = require('cors');
require('dotenv').config()

const app = express();

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage });

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// POST /api/fileanalyse
app.post('/api/fileanalyse', upload.single('upfile'), function(req, res){
  const { originalname, mimetype, size } = req.file;
  
  console.log(req.file);

  return res.end(JSON.stringify({
    name: originalname,
    type: mimetype,
    size: parseInt(size),
  }))
  console.log(req.file)
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
