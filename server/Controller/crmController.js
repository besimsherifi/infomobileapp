const axios = require("axios");
const { response } = require("express");
const geolib = require("geolib");


exports.crmdata = (req,res,next) => {
  const {latitude,longitude,radius} = req.body;
// axios.get('http://88.99.184.172:82/api/companyapi/index',)
axios.get('linkapi/companyapi/index',)
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
            radius //meters 
            
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