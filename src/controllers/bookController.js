import bookModel from  '../models/bookModel.js'

import { } from '../util/validator.js'





//<=============================================== book/put ==============================>


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



export {updateBook,  }