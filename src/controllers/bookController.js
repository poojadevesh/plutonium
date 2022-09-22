import bookModel from '../models/bookModel.js'
import userModel from '../models/userModel.js'
import reviewModel  from '../models/reviewModel.js'

import { dataValidation, isValidObjectId, isValidPhone, isValidEmail, isValidPass, isValidTitleEnum, isValidText, isValidName, isValidReviews, isValidIsbn, isValidDate, } from '../util/bookValidate.js'

// -------------------------------------------createBook---------------------------------------------
//SHAYAN BISWAS
const createBook = async (req, res) => {
  try {
    const reqBody = req.body
    // console.log(reqBody);
    const { title, excerpt, userId, ISBN, category, subcategory, reviews, releasedAt } = reqBody

    //------------------------------body validation-----------------------------------
    if (!dataValidation(reqBody))
      return res.status(400).send({ status: false, message: 'Please fill the data' })

    if (Object.keys(reqBody).length > 8)
      return res.status(400).send({ status: false, message: 'You can\'t add extra field' })
    //------------------------------title validation-----------------------------------
    if (!title)
      return res.status(400).send({ status: false, message: 'title isn\'t present' })

    if (!isValidText(title))
      return res.status(400).send({ status: false, message: 'title isn\'t valid' })
    //------------------------------excerpt validation-----------------------------------
    if (!isValidText(excerpt))
      return res.status(400).send({ status: false, message: 'excerpt isn\'t present' })

    if (!excerpt)
      return res.status(400).send({ status: false, message: 'excerpt isn\'t valid' })

    //---------------------------------userId validation------------------------------
    if (!userId)
      return res.status(400).send({ status: false, message: 'userId isn\'t present' })

    if (!isValidObjectId(userId))
      return res.status(400).send({ status: false, message: 'userId isn\'t valid' })

    //---------------------------------ISBN validation------------------------------
    if (!ISBN)
      return res.status(400).send({ status: false, message: 'ISBN isn\'t present' })

    if (!isValidIsbn(ISBN))
      return res.status(400).send({ status: false, message: 'ISBN isn\'t valid' })

    //---------------------------------category validation------------------------------
    if (!category)
      return res.status(400).send({ status: false, message: 'category isn\'t present' })

    if (!isValidName(category))
      return res.status(400).send({ status: false, message: 'category isn\'t valid' })

    //---------------------------------category validation------------------------------
    if (!subcategory)
      return res.status(400).send({ status: false, message: 'subcategory isn\'t present' })

    if (!isValidName(subcategory))
      return res.status(400).send({ status: false, message: 'subcategory isn\'t valid' })

    //---------------------------------reviews validation------------------------------
    // if (!(reviews >= 1 && reviews <= 5))
    //   return res.status(400).send({ status: false, message: 'give review 1 to 5' })
    
    //--------------------------------- finding user------------------------------
    if (!isValidDate(releasedAt))
      return res.status(400).send({ status: false, message: 'Please use \'YYYY-MM-DD\' this format' });

    // --------------------------------- finding user------------------------------
    const existUser = await userModel.findOne({ _id: userId })
    if (!existUser)
      return res.status(404).send({ status: false, message: 'user doesn\'t exits' })

    //--------------------------------finding book-----------------------------------
    const existBook = await bookModel.find()

    //---------------------------finding duplicate title---------------------------
    for (let i = 0; i < existBook.length; i++) {
      if (existBook[i].title === title)
        return res.status(400).send({ status: false, msg: 'title is Duplicate' })
    }

    //------------------------------finding duplicate ISBN------------------------------
    for (let i = 0; i < existBook.length; i++) {
      if (existBook[i].ISBN === ISBN)
        return res.status(400).send({ status: false, msg: 'ISBN is Duplicate' })
    }

    //------------------------------------book creation-----------------------------------
    const saveData = await bookModel.create(reqBody)
    res.status(201).send({ status: true, message: 'Book created successfully', data: saveData })
  }
  catch (err) {
    res.status(500).send({ status: false, error: err })
  }
}

//=====================================================================================================
//GET /books BY-QUERY
//by Richard

let getBooksByQuery = async (req,res)=>{

  let datas = req.query

let {userId,category,subcategory }= datas


  let book = await bookModel.findOne({userId:userId})
  let user = await userModel.findById(userId)

  // if(book.isDeleted == true)

  // return res.send({message:`The Book ${book.title} By ${user.title}.${user.name} has been Deleted`})

  let result = await bookModel.find({$or:[{userId:userId},{category:category}]}).select({createdAt:0,updatedAt:0,__v:0,subcategory:0,ISBN:0}).sort({title:1})


  return res.send({data:result})

}


//============================================================================================================================================
//GET /books/:bookId 
//BY Richard

const getBook = async (req, res) => {
// TOdo compelete valiataion
  try {

    let bookID = req.params.bookId

    if (!isValidObjectId(bookID)) return res.status(400).send({ status: false, message: `This bookId ${bookID} is Invalid` });

    let bookId = await bookModel.findById(bookID)

    if (!bookId) return res.status(404).send({ status: false, message: `No Book Found By This BookId ${bookID}` })

    if (bookId.isDeleted == true)
      return res.status(404).send({ status: false, message: `The Book Title '${bookId.title}' has been Deleted` })

    let findBook = await bookModel.findById(bookID).select({ __v: 0 ,ISBN:0})
    let review = await reviewModel.find({bookId:bookID}).select({isDelete:0,createdAt:0,updatedAt:0,isDeleted:0,__v:0})
   
    findBook._doc.reviewsData = review
    
    let value = `This book got ${findBook.reviews}👁‍🗨 reviews`

    res.status(200).send({ status: true, message: 'Books List', reviews:value, data: findBook })

  }
  catch (err) {
    res.status(500).send({ status: false, error: err.message })
  }
}


//========================================= book/put =========================================================================>


const updateBook = async (req, res) => {
   
  try {
    let bookId = req.params.bookId;

    if (!ObjectId.isValid(bookId)) {
      return res.status(400).send({ status: false, message: "Book Id is Invalid" });
    }

    let bookDetailToUpdate = req.body;
    if (Object.keys(bookDetailToUpdate).length === 0) {
      return res.status(400).send({ status: false, message: 'Please Provide Details for Update' })
    }

    let { title, excerpt, releasedAt, ISBN } = bookDetailToUpdate;

    let bookObject = {};
    if (Object.keys(bookDetailToUpdate).indexOf('title') !== -1) {
      if (title.trim().length === 0) {
        return res.status(400).send({ status: false, message: 'Please Enter title' })
      }

      let trimmedTitle = title
        .trim()
        .split(" ")
        .filter((word) => word)
        .join(" ")
      const isTitleExist = await bookModel.findOne({ title: trimmedTitle });
      if (isTitleExist) {
        return res
          .status(409)
          .send({ status: false, message: "Title already exists" });
      }
      bookObject.title = trimmedTitle;
    }

    if (Object.keys(bookDetailToUpdate).indexOf('excerpt') !== -1) {
      if (excerpt.length == 0) {
        return res.status(400).send({ status: false, message: 'Please Enter excerpt' })
      }
      bookObject.excerpt = excerpt
        .trim()
        .split(" ")
        .filter((word) => word)
        .join(" ");
    }
    if (Object.keys(bookDetailToUpdate).indexOf("ISBN") !== -1) {
      if (ISBN.length == 0) {
        return res.status(400).send({ status: false, message: 'Please Enter ISBN' })
      }
      let trimmedISBN = ISBN.trim()
        .split("-")
        .filter((word) => word)
        .join("");



      const isIsbnExist = await bookModel.findOne({ ISBN: trimmedISBN });
      if (isIsbnExist) {
        return res.status(409).send({ status: false, message: "ISBN already exists" });
      }
      bookObject.ISBN = trimmedISBN;

    }

    if (Object.keys(bookDetailToUpdate).indexOf("releasedAt") !== -1) {

      if (!(releasedAt)) {

        return res
          .status(400)
          .send({ status: false, message: "Enter Date in YYYY-MM-DD format!!!" });
      }

      if (!(/^((\d{4}[\/-])(\d{2}[\/-])(\d{2}))$/.test(releasedAt))) {

        return res
          .status(400)
          .send({ status: false, message: "Enter Date in YYYY-MM-DD format!!!" });
      }

      bookObject.releasedAt = releasedAt
    }



    let book = await bookModel.findOne({ _id: bookId, isDeleted: false });
    if (!book) {
      return res
        .status(404)
        .send({
          status: false,
          message: 'Book not found',
        });
    }

    let updatedbookDetail = await bookModel.findOneAndUpdate(
      { _id: book._id },
      bookObject,
      { returnDocument: "after" }
    );

    return res
      .status(200)
      .send({ status: true, message: "Success", data: updatedbookDetail });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};



//---------------------------------------------DeleteBook------------------------------------------------------------------------------------------
//SHAYAN BISWAS
const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    if (!bookId)
      return res.status(400).send({ status: false, message: 'Please enter bookId' })

    //-------------------finding Book by id through params-------------------
    const book = await bookModel.findById(bookId)

    if (!book || book.isDeleted === true)
      return res.status(400).send({ status: false, message: 'No book exits' })

    //--------------------------------deleting Book by id-------------------------------------
    const deletedBook = await bookModel.findByIdAndUpdate({ _id: bookId }, { $set: { isDeleted: true} }, { new: true })
    res.status(200).send({ status: true, message: 'Book has been deleted', data: deletedBook })
  }
  catch (err) {
    res.status(500).send({ status: false, error: err.message })
  }

}


export { createBook,getBooksByQuery, getBook, updateBook, deleteBook }
