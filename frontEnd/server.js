var express = require('express');
var app = express();
var path = require('path')

app.use('/public',express.static(path.join(__dirname)));
app.get('/',(req,res)=>{
  console.log("root accessed...")
  res.sendFile(path.join(__dirname,'index.html'));
})

var port = "3000"
app.listen(port, () => {
  console.log(`Server started on ` + port);
});