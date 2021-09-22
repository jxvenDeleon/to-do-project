const express = require('express');
const app = express();
const mongoose = require('mongoose');


//----- Code to allow use of body parser in req.body"
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//set the view engine to ejs for the to do app 
app.set('view engine','ejs');
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/todolistDB');

//---------database code ---------//

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);

//--default items to add to database -//

const task1 = new Item ({
    name: "Welcome To Your To Do List!"
})

const task2 = new Item ({
    name: "Hit the + button to add a new item!"
})

const task3 = new Item ({
    name: "Check the box to delete an item!"
})

const defaultItems= [task1, task2, task3];



// -- random logic 

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

//console.log(today);

//-------------------Home Get Request ---------------------//
app.get('/', (req,res)=>{


    //look for all the items in the databse, will return an array 
    Item.find({}, (err,foundItems)=>{
        if (err){
            console.log(err);
        }
        //console.log(foundItems);

        if(foundItems.length === 0){
            Item.insertMany(defaultItems, (err)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log("Success!");
                }
            });     
            res.redirect('/');
        }
        //console.log("funciton succesS")
        res.render('index', {todaysDate: today, newListItems: foundItems});
    });
    
});


//---------------------- home post requests-----------------//

app.post('/', (req,res)=>{

    const newItem = req.body.newItem;

    const newTask = new Item({
        name:newItem
    });

    
    newTask.save();
    res.redirect('/')
  
});


app.post('/delete',(req,res)=>{
    console.log(req.body);
    const checkedItemID = req.body.checkbox;

    Item.findByIdAndRemove(checkedItemID, (err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("successfully removed");
        }
    })

    res.redirect('/');
});



//------------start the server -------------//
app.listen(3000, ()=>{
    console.log("listening on port 3000")
})

