
const axios = require('axios');



exports.crmdata = (req,res,next) => {

  
  
  
  axios.get('https://localhost:44364/api/companyapi/index',)


  .then(async function (response) {
   
 
    res.status(200).json({
      
      response: response.data,
      
      
     })
     
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  }); 

}






