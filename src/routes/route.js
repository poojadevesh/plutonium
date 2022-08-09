const express = require('express');
const lodash = require('lodash')
const abc = require('../introduction/intro')
const router = express.Router();

//first assignment

router.get('/test-me', function (req, res) {
  let months =["jan","feb","march","april","may","june","july","august","sep","oct","nov","dec"]
  let result =lodash.chunk(months,3)
  console.log(result)
  let odd =[1,3,5,7,9,11,13,15,17,19]
  let result2=lodash.tail(odd)
  console.log(result2)
  let duplicate =[1,2,3,2,4,2,5,4,6,7,8,4,8]
  let result3 =lodash.union(duplicate)
  console.log(result3)
  let array =[ ["horror","The Shining"],["drama","Titanic"],["thriller","Shutter Island"],["fantasy,","Pans Labyrinth"]
]
   let result4=lodash.fromPairs(array)
   console.log(result4)
    res.send('My second ever api!')
});




router.get('/students', function (req, res){
    let students = ['Sabiha', 'Neha', 'Akash']
    res.send(students)
})
router.get('/student-details/:name', function(req, res){
    /*
    params is an attribute inside request that contains 
    dynamic values.
    This value comes from the request url in the form of an 
    object where key is the variable defined in code 
    and value is what is sent in the request
    */
 // JSON strigify function helps to print an entire object
    // We can use any ways to print an object in Javascript, JSON stringify is one of them
    let requestParams = req.params
    console.log("This is the request "+ JSON.stringify(requestParams))
    let studentName = requestParams.name
    console.log('Name of the student is ', studentName)
    
    res.send('Dummy response')
})

//SECOND ASSIGNMENT
// 1
router.get('/get-movieslist', function(req,res){
    let movies =["harry potter","matrix","illusion","the note book"]
    res.send(movies)
})


router.get("/movies/:indexNumber", function(req, res){
    const movies = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]
    console.log(req.params.indexNumber)
    let movieIndex = req.params.indexNumber
    //check index value. less than 0 or greater than array (length - 1) are not valid
    if(movieIndex<0 || movieIndex>=movies.length) {
        //if the index is invalid send an error message
        return res.send('The index value is not correct, Please check the it')
    }

    //if the index was valid send the movie at that index in response
    let requiredMovie = movies[movieIndex]
    res.send(requiredMovie)
})
//4
router.get('/getfilms',function(req,res){
    let films = [ {
        "id": 1,
        "name": "The Shining"
       }, {
        "id": 2,
        "name": "Incendies"
       }, {
        "id": 3,
        "name": "Rang de Basanti"
       }, {
        "id": 4,
        "name": "Finding Nemo"
       }]
    
       res.send(films)
})

router.get("/films/:filmId", function(req, res){
    const films = [ {
        "id": 1,
        "name": "The Shining"
       }, {
        "id": 2,
        "name": "Incendies"
       }, {
        "id": 3,
        "name": "Rang de Basanti"
       }, {
        "id": 4,
        "name": "Finding Nemo"
       }]

       let filmId = req.params.filmId

       //iterate all the films
       //search for a film whose id matches with the id recevied in request
       for(let i = 0; i < films.length; i++){
           let film = films[i]
           if(film.id == filmId) {
               //if there is a match return the response from here
               return res.send(film)
           }
       }

       //if there is no match give an error response
       res.send("The film id doesn't match any movie")
})


module.exports = router