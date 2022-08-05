
// Module 2 : src/util/helper.js

// - printDate() : prints the current date
// - printMonth() : prints the current month
// - getBatchInfo() : prints batch name, week#, Day#, the topic being taught today is ….. For example - Radon, W3D3, the topic for today is Nodejs module system’
	
// 	Call all these functions in route.js inside the test-me route handler
const printDate=function(){
    let currentDate=new Date()
    console.log(currentDate)
}
const printMonth=function(){
    let currentDate=new Date()
        let currentMonth =currentDate.getMonth()+1 
        console.log(currentMonth)
    
}


const getBatchInfo  =function(){
    
    console.log("plutonium,week3,day5,the opic being taught today is node js")
}


module.exports.getBatchInfo=getBatchInfo
module.exports.printDate=printDate
module.exports.printMonth= printMonth