import bookModel from '../models/bookModel.js'
import userModel from '../models/userModel.js'
import { dataValidation, isValidObjectId, isValidPhone, isValidEmail, isValidPwd, isValidTitleEnum, isValidText, isValidName, isValidReviews, isValidIsbn } from '../util/userValidate.js'

// -----------------data present or not or extra in the body-------------------
const createBook = async (req, res) => {
    try {
        const reqBody = req.body
        const { title, excerpt, userId, ISBN, category, subcategory, reviews } = reqBody

        //------------------------------body validation-----------------------------------
        if (!dataValidation(reqBody))
            return res.status(400).send({ status: false, message: 'Please fill the data' })

        if (Object.keys(reqBody).length > 7)
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

        //---------------------------------finding user------------------------------
        const existUser = await userModel.find({ userId })
        if (!existUser)
            return res.status(400).send({ status: false, message: 'user doesn\'t exits' })

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

        //------------------------------------book creation-----------------------------------
        const saveData = await bookModel.create(reqBody)
        res.status(201).send({ status: true, message: 'Book created successfully', data: saveData })
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.massage })
    }
}


//<========================================= book/put ==================================>

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







export { createBook ,updateBook}
