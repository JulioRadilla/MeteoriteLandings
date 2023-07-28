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

      // Handle empty search term
      let { searchTerms } = req.query;
      if (!searchTerms || searchTerms.trim() === '') {
        console.log("Original Data:", originalData);
        res.render('index', {
          matchingElement: paginatedData, // Render the paginated data for the first 50 items
          currentPage: page
        });
        return; // Exit the function early
      }

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

            // Pagination logic
            const page = parseInt(req.query.page) || 1; // Get the page number from the query parameter (default to 1 if not specified)
            const itemsPerPage = 50;
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedData = originalData.slice(startIndex, endIndex);
            
            if (!searchTerms || searchTerms.trim() === '') {
              console.log("Original Data:", originalData);
              res.render('index', {
                  matchingElement: paginatedData,
                  currentPage: page
              });
              return; // Exit the function early
          }

            const response = await axios.get(`https://data.nasa.gov/resource/gh4g-9sfh.json`, {
              timeout: 5000 // Set the timeout to 5000 milliseconds (5 seconds) if api response takes too long
            })
            const result = response.data                     
            const regexPattern = /[\s|-]/g;
            searchTerms = searchTerms.toLowerCase().replace(regexPattern, '')
            let matchingElement = []
            result.forEach(element => {
              if(element.name.toLowerCase().replace(regexPattern, '') == searchTerms){
                matchingElement.push(element)                                
              }             
            });

            const paginatedMatchingElement = matchingElement.slice(startIndex, endIndex);

            res.render('index', {
              matchingElement: paginatedMatchingElement,
              currentPage: 1
            })
        } catch(err){
          if (err.code === 'ECONNABORTED') {
            // Handle timeout error
            res.render('error', { message: 'The request took too long. Please try again later.' });
          } else {
            console.error(err)
            res.render('error', { message: 'An error occurred while processing your request.' });
          }
        }
    }
}
