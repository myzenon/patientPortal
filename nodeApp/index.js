const express = require('express')
const app = express()
const path = require('path')

const server = {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 80
}

// serve static files from build folder
app.use(express.static(__dirname + '/build'))

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '/build/index.html'))
})

app.listen(
    server.port,
    server.host,
    () => console.log(`Server started at ${server.host}:${server.port}`)
)