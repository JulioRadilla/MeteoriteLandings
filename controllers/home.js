const { default: axios } = require("axios")

module.exports = {
    getHomepage: (req,res) => {
        res.render('index')
    },
    getMeteoriteInfo: async (req,res) => {
        try{
            const searchTerms = req.query

            let filterParams
            if(searchTerms !== ''){
                filterParams = `name=${searchTerms}`
            } else {
                filterParams = `Please insert search term name`
            }

            let response = await axios.get(`https://data.nasa.gov/resource/gh4g-9sfh.json?${filterParams}`);
            let datas = await response
            res.render('index', {
                datas
            })
        } catch(err){
            console.error(err)
        }
    }
}