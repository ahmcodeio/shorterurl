const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const ShortUrl = require('./models/shortUrl')
const app = express()



mongoose.connect(process.env.MONGODB_HOST

).then(() => console.log(process.env))
.catch((e) => console.log(e))



app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find()
    res.render('index', {shortUrls: shortUrls})

})

app.post('/shortUrls', async (req, res) => {
    console.log("=================urlrlllllll=======================")
   await ShortUrl.create({full: req.body.fullUrl})
   res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({short: req.params.shortUrl})
    console.log(shortUrl, "===================testiiiiiiiiiiiing===========================================")
    
    if (shortUrl == null) return res.sendStatus(404)

    shortUrl.clicks++
    shortUrl.save()


    res.redirect(shortUrl.full)
})

app.listen(process.env.PORT || 5000);



// mongoose.connect('mongodb+srv://ahm:coba123@cluster0.5kije.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
// , {
//     useNewUrlParser: true, useUnifiedTopology: true
// }
// ).then(() => console.log('sukses'))
// .catch((e) => console.log(e))