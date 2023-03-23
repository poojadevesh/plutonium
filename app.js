//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to our page, where we strive to provide you with the best user experience possible. Our page is designed to provide you with comprehensive and up-to-date information on a wide range of topics, from education and health to technology and entertainment.We understand the importance of providing reliable and trustworthy information which is why we ensure that all content on our page is thoroughly researched and fact-checked by our team of experts. Our goal is to help you make informed decisions about the issues that matter most to you"

const aboutContent = "Welcome to our About Page. Here, we would like to introduce ourselves and share our mission, values, and story At our company, our mission is to provide high-quality, trustworthy, and informative content to our readers. We aim to be a reliable source of information and to help people make informed decisions about the things that matter most to them Our company was founded by a team of passionate individuals who share a common goal: to provide people with access to reliable and informative content. Our journey began with a simple idea and has grown into a platform that reaches millions of readers worldwide. . Thank you for taking the time to learn more about us, and we hope you enjoy our content!";
const contactContent = "Thank you for your interest in getting in touch with us. We value your feedback, questions, and comments.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(5000, function() {
  console.log("Server started on port 5000");
});
