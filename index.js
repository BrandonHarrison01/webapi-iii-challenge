const express = require('express');

const usersRouter = require('./channels/users-router')
const postsRouter = require('./channels/posts-router')

const server = express();


function validatePost(req, res, next) {

}

server.use(express.json());
server.use('/users', usersRouter)
server.use('/posts', postsRouter)


// test get request

server.get('/', (req, res) => {
    res.status(200).json({ api: 'api is running...' })
})

const port = process.env.PORT || 3333;

server.listen(port, () => console.log(`api is running on port ${port}`))