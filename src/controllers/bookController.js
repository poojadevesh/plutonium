const bookModel = require('../models/bookModel.js')
const userModel = require('../models/userModel.js')
const reviewModel = require('../models/reviewModel.js')

const { dataValidation, isValidObjectId, isValidText, isValidName, isValidIsbn, isValidDate, } = require('../util/bookValidate.js')

// -------------------------------------------createBook--------------------------------------
const createBook = async (req, res) => {
  try {
    const reqBody = req.body
    const { title, excerpt, userId, ISBN, category, subcategory, reviews, releasedAt } = reqBody

    if (!dataValidation(reqBody))
      return res.status(400).send({ status: false, message: 'data is not present' })

    if (Object.keys(reqBody).length > 8)
      return res.status(400).send({ status: false, message: 'You cant add more field' })

    if (!title)
      return res.status(400).send({ status: false, message: 'title is mandatory' })

    if (!isValidText(title))
      return res.status(400).send({ status: false, message: 'please enter title valid' })

    if (!isValidText(excerpt))
      return res.status(400).send({ status: false, message: 'plesae enter  valid excerpt ' })

    if (!excerpt)
      return res.status(400).send({ status: false, message: 'please enter excerpt  valid' })

    if (!userId)
      return res.status(400).send({ status: false, message: 'please enter userId' })

    if (!isValidObjectId(userId))
      return res.status(400).send({ status: false, message: 'please enter userId valid' })

    if (!ISBN)
      return res.status(400).send({ status: false, message: 'please enter ISBN' })

    if (!isValidIsbn(ISBN))
      return res.status(400).send({ status: false, message: 'please enter valid ISBN ' })

    if (!category)
      return res.status(400).send({ status: false, message: 'category isn\'t present' })

    if (!isValidName(category))
      return res.status(400).send({ status: false, message: 'category isn\'t valid' })

    if (!subcategory)
      return res.status(400).send({ status: false, message: 'subcategory isn\'t present' })

    if (!isValidName(subcategory))
      return res.status(400).send({ status: false, message: 'subcategory isn\'t valid' })

    if (!releasedAt)
      return res.status(400).send({ status: false, message: 'releasedAt isn\'t present' })

    if (!isValidDate(releasedAt))
      return res.status(400).send({ status: false, message: 'Please use \'YYYY-MM-DD\' this format' });
    
    if (req.user.userId != userId)
      return res.status(403).send({ status: false, msg: `This '${userId}' person is Unathorized.` });
    
    const existUser = await userModel.findOne({ _id: userId })
    if (!existUser)
      return res.status(404).send({ status: false, message: 'user doesn\'t exits' })

    const existBook = await bookModel.find()
    for (let i = 0; i < existBook.length; i++) {
      if (existBook[i].title === title)
        return res.status(400).send({ status: false, msg: 'title is Duplicate' })
    }

    for (let i = 0; i < existBook.length; i++) {
      if (existBook[i].ISBN === ISBN)
        return res.status(400).send({ status: false, msg: 'ISBN is Duplicate' })
    }

    const saveData = await bookModel.create(reqBody)
    res.status(201).send({ status: true, message: 'Book created successfully', data: saveData })
  }
  catch (err) {
    res.status(500).send({ status: false, error: err.message })
  }
}
//=====================================================================================================
//GET /books BY-QUERY
 
const getBooksQuery = async function (req, res) {
  try {
      let data = req.query
      let filter = { isDeleted: false, ...data };
      if (Object.keys(data).length == 0) return res.status(400).send({status:false, message: "please inter data in query"})
      // if (req.query.hasOwnProperty('userId')) {
      //     if (!validator.isValidObjectId(req.query.userId)) return res.status(400).send({ status: false, message: "please enter the valid UserId...!" })
      // }

      let findBooks = await bookModel.find(filter).select({ title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1, _id: 1 }).sort({ title: 1 })
      if (!findBooks) return res.status(404).send({ status: false, msg: "No Book found" })
      if (findBooks.length == 0) return res.status(404).send({ status: false, msg: "please enter existing Book" })

      return res.status(200).send({ status: true, message: 'Books list', data: findBooks })

  }
  catch (err) { return res.status(500).send({ status: false, message: err.message }); }
};


//============================================================================================================================================
//GET /books/:bookId 
const getBookById = async (req, res) => {
  try {
        let bookID = req.params.bookId

    if (!isValidObjectId(bookID)) return res.status(400).send({ status: false, message: `This bookId ${bookID} is Invalid` });

    let bookId = await bookModel.findById(bookID)
    if (!bookId) return res.status(404).send({ status: false, message: `No Book Found By This BookId ${bookID}` })

    if (bookId.isDeleted == true)
      return res.status(404).send({ status: false, message: `The Book Title '${bookId.title}' has been Deleted` })

    let findBook = await bookModel.findById(bookID).select({ __v: 0, ISBN: 0 })
    let review = await reviewModel.find({ bookId: bookID }).select({ isDelete: 0, createdAt: 0, updatedAt: 0, isDeleted: 0, __v: 0 })

    findBook._doc.reviewsData = review

    let value = `This book got ${findBook.reviews}👁‍🗨 reviews`
    res.status(200).send({ status: true, message: 'Books List', reviews: value, data: findBook })
}
  catch (err) {
    res.status(500).send({ status: false, error: err.message })
  }}

//========================================= book/put ====================================================>

const updateBookById = async (req, res) => {
 // try {
    const bookId = req.params.bookId;
    if (!isValidObjectId(bookId)) {return res.status(400).send({status: false, message: `Book Id in params is Invalid`})}
    const book = await bookModel.findOne({_id: bookId,isDeleted: false,});
    if (!book)
      return res.status(404).send({status: false,message: "Book not found",});

    const reqBody = req.body;
    if (Object.keys(reqBody).length === 0)
      return res.status(400).send({ status: false, message: "Please Provide Details for Update" });

    const { title, excerpt, releasedAt, ISBN } = reqBody;
    const bookObject = {};

    if (title){
    //   return res.status(400).send({ status: false, message: "Please Enter title" });
         
    //const trimmedTitle = title.trim().split(" ").filter(word=>word).join(" ");
    const isTitleExist = await bookModel.findOne({ title: title });

    if (isTitleExist) return res.status(409).send({ status: false, message: "Title  already exists" });
    bookObject.title = title;}
    // if (excerpt.)
    //   return res.status(400).send({ status: false, message: "Please Enter excerpt" });

    bookObject.excerpt = excerpt;

    if (ISBN){
     // return res.status(400).send({ status: false, message: "Please Enter ISBN" });
      if (!isValidIsbn(ISBN))
        return res.status(400).send({status: false,message: "ISBN isn't valid"});
    const trimmedISBN = ISBN.trim();

    const isIsbnExist = await bookModel.findOne({ ISBN: trimmedISBN });

    if (isIsbnExist)  return res.status(409).send({ status: false, message: "ISBN already exists" });

    bookObject.ISBN = trimmedISBN;}
    if (releasedAt){
     // return res.status(400).send({ status: false, message: "Enter Date in YYYY-MM-DD format!!!" });

    if(!/^((\d{4}[\/-])(\d{2}[\/-])(\d{2}))$/.test(releasedAt))
      return res.status(400).send({ status: false, message: "Enter Date in YYYY-MM-DD format!!!" });
    
    bookObject.releasedAt = releasedAt.trim();}

    const updatedBookDetail = await bookModel.findOneAndUpdate(
      { _id: book._id },bookObject,{ returnDocument: "after" });

    return res.status(200).send({ status: true, message: "Success", data: updatedBookDetail });
  // 
};

//---------------------------------------------DeleteBook--------------------------
const deleteBookById = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    if (!bookId) return res.status(400).send({ status: false, message: 'Please enter bookId' })

    const book = await bookModel.findById(bookId)
    if (!book || book.isDeleted === true)
      return res.status(400).send({ status: false, message: 'No book exits' })

    const deletedBook = await bookModel.findByIdAndUpdate({ _id: bookId }, { $set: { isDeleted: true } }, { new: true })
    res.status(200).send({ status: true, message: 'Book has been deleted', data: deletedBook })

  }catch (err) {
    res.status(500).send({ status: false, error: err.message })
  }}
module.exports = { createBook, getBooksQuery, getBookById, updateBookById, deleteBookById }