const express = require('express')
const app = express()
const getData = require('./index').getData
const bodyParser = require('body-parser')

const port = process.env.PORT || 8080

app.use(bodyParser.json())


app.post('/', (req, res) => {
    console.log('POST Data: ', req.body)
    getData(req.body, (status, result) => {
        console.log('Result: ', result)
        res.status(status).json(result)
    })
})

app.listen(port, () => console.log(`Listening on port ${port}!`))