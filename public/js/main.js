document.querySelector('h1').addEventListener('click', async ()=>{

    let response = await fetch('https://data.nasa.gov/resource/gh4g-9sfh.json')
    let data = await response.json()                        
    console.log(data)
})

