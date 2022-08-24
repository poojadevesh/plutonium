const express = require('express');
const router = express.Router();
const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")
const publisherController = require("../controllers/publisherController")



// middleware
const commonMW =require("../middleware/commonMiddleware")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

// Author routes
router.post("/createAuthor", authorController.createAuthor)

// Publisher routes
router.post("/createPublisher", publisherController.createPublisher)

// Book routes
router.post("/createBook", bookController.createBook  )
router.get("/getAllBooksWithCompleteDetails", bookController.getAllBooksWithCompleteDetails)

router.put("/books", bookController.updateSpecificBooks)




router.get("/basicroute",commonMW.mid1,commonMW.mid2,publisherController.basicCode)

module.exports = router;