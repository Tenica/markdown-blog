const express = require('express')
const articleRouter = require('./routes/articles')
const Article = require('./models/article')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()

const port = process.env.PORT || 3000

mongoose.connect('mongodb://localhost/markblog',{
useNewUrlParser: true, useUnifiedTopology: true
})
mongoose.set('useCreateIndex', true)
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))


app.get('/', async (req,res) => {
    const articles = await Article.find().sort({createdAt: 'desc' })
     
    res.render('articles/index', {articles: articles})
})

app.use('/articles', articleRouter)

app.listen(port,  () => {
    console.log( 'server is running on port ' + port)
} )