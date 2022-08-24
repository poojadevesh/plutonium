const authorModel = require("../models/authorModel");
const bookModel = require("../models/bookModel");
const publisherModel = require("../models/publisherModel");

const createBook = async function (req, res) {
  let book = req.body;
  let authordata = await authorModel.find().select({ _id: 1 });
  let publisherdata = await publisherModel.find().select({ _id: 1 });
  let authorId = authordata.map(function (x) {
    return x._id.toString();
  });
  let publisherId = publisherdata.map(function (x) {
    return x._id.toString();
  });
  if ((book.authors && book.publisher)) {
    res.send({ msg: "data is missing" });
  } else if (
    (authorId.includes(book.author) && publisherId.includes(book.publisher))
  ) {
    res.send({ msg: "id is not valid" });
  } else {
    let bookdata = await bookModel.create(book);
    res.send({ msg: bookdata })
  }
};

const getBooksWithAuthorDetails = async function (req, res) {
  let specificBook = await bookModel
    .find()
    .populate("author_id")
    .populate("publisher_id");
  res.send({ data: specificBook });
};

const putreq =async function (req,res){
let data =await publisherModel.find({name:{$in:['penguin','HarperCollins']}})
console.log(data)
for(let i=0;i<data.length;i++)
{
    let updatebooks =await bookModel.updateMany({publisher:data[i]._id},
    {$set:{isHardCover:true}},{new:true})
    res.send({msg:updatebooks})
}
// res.send({msg:updatebooks})
}



module.exports.createBook = createBook;

module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails;
module.exports.putreq =putreq