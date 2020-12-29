exports.decodeAdress = (req, res) => {
    var NodeGeocoder = require('node-geocoder');
   
    var {latitude, longitude} = req.body
   
    var options = {
      provider: 'mapquest',
    
      // Optionnal depending of the providers
      httpAdapter: 'https', // Default
      apiKey: 'XxgajmI3oN2gLyp3LttYcHds0d0rv9ee', // for Mapquest, OpenCage, Google Premier
      formatter: null         // 'gpx', 'string', ...
    };
    
    var geocoder = NodeGeocoder(options);
    
    geocoder.reverse({lat:latitude, lon:longitude})
    .then(function(adress) {
  
     
       console.log(adress);
      res.status(200).json(adress)
    })
    .catch(function(err) {
      console.log(err);
    });
    // Using callback
    
    // output :
    [{
      latitude: latitude,
      longitude: longitude,
      provider: 'Mapquest'
    }]
    
  }