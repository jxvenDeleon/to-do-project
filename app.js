const express = require('express');
const app = express()

//----- Code to allow use of body parser in req.body"
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//set the view engine to ejs for the to do app 
app.set('view engine','ejs');
app.use(express.static("public"));



// -- random logic 

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

//console.log(today);

//-------------------Home Get Request ---------------------//
app.get('/', (req,res)=>{
    
    res.render('index', {todaysDate: today});

});

app.post('/', (req,res)=>{

    var newItem = req.body.newItem
    console.log(newItem)
    

    res.redirect('index')
});




//------------start the server -------------//
app.listen(3000, ()=>{
    console.log("listening on port 3000")
})

