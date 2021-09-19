const express = require('express');
const app = express()

//set the view engine to ejs for the to do app 
app.set('view engine','ejs');
app.use(express.static("public"));


//-------------------Home Get Request ---------------------//
app.get('/', (req,res)=>{
    
    res.render('index');

});




//------------start the server -------------//
app.listen(3000, ()=>{
    console.log("listening on port 3000")
})

