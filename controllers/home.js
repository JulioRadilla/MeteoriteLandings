const { default: axios } = require("axios");


let originalData = []; 

module.exports = {
    getHomepage: async (req,res) => {
      try {
        const response = await axios.get(`https://data.nasa.gov/resource/gh4g-9sfh.json`);
        originalData = response.data; // Store the API response in the originalData variable
        
        
      // Pagination logic
      const page = parseInt(req.query.page) || 1; // Get the page number from the query parameter (default to 1 if not specified)
      const itemsPerPage = 50;
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedData = originalData.slice(startIndex, endIndex);

        res.render('index', {
          matchingElement:  paginatedData,
          currentPage: page
        });
      } catch (err) {
        console.error(err);
      }
    },
    getMeteoriteInfo: async (req,res) => {
        
        try{
            let { searchTerms } = req.query
            
            if (!searchTerms || searchTerms.trim() === '') {
              console.log("Original Data:", originalData);
              res.render('index', {
                  matchingElement: originalData
              });
              return; // Exit the function early
          }

            const response = await axios.get(`https://data.nasa.gov/resource/gh4g-9sfh.json`)
            const result = response.data                     
            const regexPattern = /[\s|-]/g;
            searchTerms = searchTerms.toLowerCase().replace(regexPattern, '')
            let matchingElement = []
            result.forEach(element => {
              if(element.name.toLowerCase().replace(regexPattern, '') == searchTerms){
                matchingElement.push(element)                                
              }             
            });
            res.render('index', {
              matchingElement
            })
        } catch(err){
            console.error(err)
        }
    }
}
