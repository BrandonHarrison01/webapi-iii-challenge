const router = require('express').Router()

const posts = require('../posts/postDb')
const users = require('../users/userDb')


//middleware

function validatePost(req, res, next) {

    if (Object.keys(req.body).length > 0) {
        res.status(400).json({ message: 'missing post data' })
    } else if (!req.body.text) {
        res.status(400).json({ message: 'missing required text field' })
    } else {
        next()
    }
}


// create new post 

router.post('/:id', validatePost, (req, res) => {
    req.body.user_id = req.params.id
    const newPost = req.body;

    posts.insert(newPost)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(err => {
        res.status(500).json({ error: 'there was a problem adding a post' })
    })
})


// get posts by user

router.get('/:id', (req, res) => {
    const userId = req.params.id
    
    users.getUserPosts(userId)
        .then(post => {
            console.log('user post', post)
            res.status(200).json(post)
        })
        .catch(error => {
            res.status(500).json({ error: 'there was an error retrieving posts' })
        })
})

module.exports = router