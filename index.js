const express =  require('express');
const app = express();
const port = 8080;

const path = require("path");

const { v4: uuidv4 } = require('uuid');


app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended:true}));


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
}))






