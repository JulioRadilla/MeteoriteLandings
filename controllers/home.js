const { default: axios } = require("axios")

module.exports = {
    getHomepage: async (req,res) => {
        const response = await axios.get(`https://data.nasa.gov/resource/gh4g-9sfh.json`)
            const result = response.data
            console.log(result)
            res.render('index', {
                result
            })
    },
    getMeteoriteInfo: async (req,res) => {
        try{
            let { searchTerms } = req.query
            
            console.log(searchTerms)
            let filterParams
            if (searchTerms !== '') {
                let arr;
                if (searchTerms.includes(' ')) {
                  arr = searchTerms.split(' ');
                  searchTerms = arr
                    .map((item) => item[0].toUpperCase() + item.slice(1).toLowerCase())
                    .join(' ');
                } else if (searchTerms.includes('-')) {
                  arr = searchTerms.split('-');
                  searchTerms = arr
                  .map((item) => item[0].toUpperCase() + item.slice(1).toLowerCase())
                  .join('-');
                } else {
                  searchTerms = searchTerms[0].toUpperCase() + searchTerms.slice(1).toLowerCase();
                }
            
                filterParams = `name=${searchTerms}`;
              } else {
                filterParams = '';
              }
            
            console.log(filterParams)
            axios.get(`https://data.nasa.gov/resource/gh4g-9sfh.json?${filterParams}`)
            .then((response) => {
                const datas = response.data
                console.log(datas)                           
                res.render('index', {
                    datas
                })
            })   
        } catch(err){
            console.error(err)
        }
    }
}