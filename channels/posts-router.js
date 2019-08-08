const router = require('express').Router()

const posts = require('../posts/postDb')
const users = require('../users/userDb')


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