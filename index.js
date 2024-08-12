const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer({dest: 'uploads/'})
require('dotenv').config()

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), async function(req, res){
  const uploadedFile = req.file;
  try {
    return res.json({"name": uploadedFile.originalname, "type": uploadedFile.mimetype, "size": uploadedFile.size})
  } catch(err) {
    return res.send(err)
  }
})
/**
 * multer handle file upload??
 * 
 * POST /api/fileanalyse
 * res.json({file.name, file.type, file.size(bytes)})
 */

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
