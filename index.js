const express =  require('express');
const app = express();
const port = 8080;

const path = require("path");

const { v4: uuidv4 } = require('uuid');


app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended:true}));

const methodOverride = require('method-override');
app.use(methodOverride('_method'))




app.listen(port,()=>{
    console.log(`port listening at port number: ${port}`);
    
});


// / actsas a database :
let posts = [
    {
        id: uuidv4(),
        username : "aakif",
        content : "ive bought my first car!!!!"
    },
    {
        id: uuidv4(),
        username : "Samsung",
        content : "Presenting the all new s50 ultra"
    },
    {
        id: uuidv4(),
        username : "Abbas",
        content : "ive bought my first internship!!!!"
    }
];

app.get("/posts",((req,res)=>{
    res.render("index.ejs",{ posts});
}));

app.get("/posts/new",((req,res)=>{
    res.render("new.ejs");
}));

app.post("/posts",((req,res)=>{
    // posts.push(req.body);
    // res.redirect("/posts");

    console.log(req.body);

    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({
                id,
                username,
                content
            });
    // res.send("New post added Successfully");
    res.redirect("/posts");
    
    
}));


app.get("/posts/:id",((req,res)=>{
    let {id} = req.params;
    // this is uuid
    let post = posts.find((post)=> id === post.id );
    // it will find if the id is available and return posts
    console.log(post);
    
    res.render("show.ejs",{ post })
    
    if(!post){
        res.send("Post Not Found");
    }
}));

// app.patch("/posts/:id",(req,res)=>{
//     let {id} = req.params;
//     // this is uuid
//     let newContent = req.body.content;
//     console.log(newContent);
    
//     // let post = posts.find((post)=> id === post.id );  
//     // post.content = newContent;
//     // console.log(post);
//     res.send("path working properly!!!");
    

// })


app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;

    let post = posts.find((post) => post.id === id);

    if (post) {
        post.content = newContent;
        // res.send(newContent);
        console.log(newContent);
        res.redirect("/posts");
        
    } else {
        res.status(404).send("Post Not Found");
    }
});


app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((post) => post.id === id);

    res.render("edit.ejs", { post });
})


app.delete("/posts/:id", (req, res) => {
    let { id } = req.query;
     posts = posts.filter((post) => post.id !== id);
    //  up let isnt required as we have to change from the existing post.....


    // res.redirect("index.ejs", { posts });
    res.redirect("/posts");

});







