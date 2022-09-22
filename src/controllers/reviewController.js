const validate = ('validator')
const bookModel = ('../models/bookModel.js')
const reviewModel = ('../models/reviewModel.js')
const {isValidRating,isValidDate} = ('../controllers/reviewValidate.js');

//POST /books/:bookId/review
//

const addReview = async(req,res)=>{
    try{ 
        let id = req.params.bookId

        let datas = req.body

        let{reviewedBy,reviewedAt,rating,review} = datas

        if(!validate.isMongoId(id))
        return res.status(400).send({status:false,message:`This BookId '${id}' is Invalid`})
    
        let findBook = await bookModel.findById(id)
        
        if(!findBook)
        return res.status(404).send({status:false,message:`Book Not Found`})

        if(findBook.isDeleted == true)
        return res.status(404).send({status:false,message:`The book '${findBook.title}' has been Deleted `})

         if(reviewedBy == '')
        return res.status(400).send({status:false,message:`The Reviewer Name is Required`})

        if(!reviewedAt)
        return res.status(400).send({status:false,message:`The reviewedAt Field is Required`})

        if(!isValidDate(reviewedAt))
        return res.status(400).send({status:false,message:`Please follow this date 'YYYY-MM-DD formate'`})

        if(!rating)
        return res.status(400).send({status:false,message:`The Rating Field is Required`})

        if(!review)
        return res.status(400).send({status:false,message:`The review Field is Required`})

        if(isValidRating(rating))
        return res.status(400).send({status:false,message:`The review rating should be 1 to 5)`})

        datas.bookId = id
        let result = await reviewModel.create(datas)
        await bookModel.findOneAndUpdate({_id:id},{$inc:{reviews:1}},{new:true})

        let finalOp = await reviewModel.findOne({_id:result._id}).select({isDeleted: 0, createdAt:0, updatedAt: 0,__v:0})
        finalOp.reviewedAt= new Date()

         res.status(201).send({status:true,message:`New Review added Sucessfully to the Book📕 '${findBook.title}'`,data:finalOp})     
    
 }catch(err){      
     return res.status(500).send({status:false,message:err.message})
 }}

mpdule.exports = { addReview }