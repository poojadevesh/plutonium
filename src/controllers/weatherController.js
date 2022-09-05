let axios = require("axios")

let sortedCities=  async function (req,res){
    try{
        let cities =   ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let cityObjArray =[]
        for (i=0;i<cities.length;i++){
            let obj={city :cities[i]}
            let resp = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=c1721797cc465343c20168bf012bbca3`)
            console.log(resp.data.main.temp)
            obj.temp =resp.data.main.temp
            cityObjArray.push(obj)
        }
        let  sorted =cityObjArray.sort(function(a,b){return a.temp-b.temp})
        console.log(sorted)
        res.status(200).send({status:true,data:sorted})
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
}
}
module.exports.sortedCities=sortedCities
