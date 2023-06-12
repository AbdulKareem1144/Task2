const express = require('express');
const app = express();

const fs  = require('fs')
const csv = require('csv-parser')

const result =[]
fs.createReadStream('sample.csv')
.pipe(csv())
.on("data",(data)=>{
  result.push(data)
})
.on("end",()=>{
  console.log(result)
})

app.get('/:city',(req,res)=>{
  const {city} = req.params;

  const data = result.filter(csvData => {
    if(csvData.City === city)
      return csvData.City;
  })
  res.send(data)
})

app.listen(5000,()=> "Server started on 5000")
