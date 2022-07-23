const axios = require('axios').default;
const cheerio = require('cheerio');
const fs = require('fs');
const categories = require('./vanipedia_essential_categories')

const categoriesLength = categories.length
let currentIter = 0

fs.appendFileSync('categories.js', `{\n`,() => {});

fetchOnePage()


async function fetchOnePage() {
   const data = await axios(`https://vanipedia.org${categories[currentIter].href}`)
   const currentCategory = categories[currentIter].categoryName.toLowerCase()
   fs.appendFileSync('categories.js', `"${currentCategory}": [\n\t`,() => {});

   const $ = cheerio.load(data.data);
   $('.vaniquotebox td a').each((index,element) => {
     const text = $(element).text().replace(/"/g, "'").replace(/\n/g, " ").trim();
     const writeText = `"${text}",\n\t`
     fs.appendFileSync('categories.js', writeText,() => {});
   })
   fs.appendFileSync('categories.js', `],\n`,() => {});


   if(currentIter < categoriesLength) {
       currentIter++
       fetchOnePage()
   } else {
       fs.appendFileSync('categories.js', `}`,() => {});
    }

}


