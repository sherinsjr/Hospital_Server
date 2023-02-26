const express = require('express');
const app = new express();
const fs = require('fs');

app.use(express.json()); 

const hospitalData = require('./server.json');

// get method
app.get("/",(req,res)=>{
    res.send(hospitalData)
});


// post method
app.post("/create",(req,res)=>{
    hospitalData.push(req.body)
    fs.writeFile("server.json",JSON.stringify(hospitalData),(err,resp)=>{
        if(err){
            res.send("Data cannot be posted")
        }
        else{
            res.send("Data posted successfully")
        }
    })
})

// put method
app.put("/:HospitalName",(req,res)=>{
    let hospitalName = req.params.HospitalName
    hospitalData.forEach((data)=>{
        if(data.HospitalName==hospitalName){
            data.HospitalLocation=req.body.HospitalLocation
            data.PatientCount = req.body.PatientCount
        }
    })
    fs.writeFile("server.json",JSON.stringify(hospitalData),(err,resp)=>{
        if(err){
            res.send("Data cannot be updated")
        }
        else{
            res.send("Data updated successfully")
        }
    })
})

// delete method
app.delete("/:HospitalName",(req,res)=>{
    let hospitalName = req.params.HospitalName
   let value=hospitalData.filter(data=>data.HospitalName!== hospitalName)
    fs.writeFile("server.json",JSON.stringify(value),(err,resp)=>{
        if(err){
            res.send("Data cannot be deleted")
        }
        else{
            res.send("Data deleted successfully")
        }
    })
})




app.listen(3000,()=>{
    console.log("The server is starting is strating...")
});
