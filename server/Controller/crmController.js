const axios = require('axios');
const { response } = require('express');
const geolib = require('geolib');

exports.crmdata = (req,res,next) => {
    const {latitude,longitude} = req.body;
  axios.get('https://localhost:44364/api/companyapi/index',)
    .then(async function (response) {
        const company = response.data;
        var companies = [];
           company.forEach(c => {
            c.addresses.forEach(adress => {
            const latitudee = adress.latLng.lat;
            const longitudee = adress.latLng.lng;

            var geolibi = geolib.isPointWithinRadius(
              { latitude: latitude, longitude: longitude },
              { latitude: latitudee, longitude: longitudee },
              50000 //meters 
              
            );
              if(geolibi){
                  companies.push(c);
                }
              }) 
            })  
          res.status(200).json(
            companies
        )
      })
          .catch(function (error) {
             console.log(error);
           });
          }






