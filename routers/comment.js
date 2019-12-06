const express = require('express')
const posts = require('../data/db.js')

const router = express.Router({
    mergeParams: true
})

router.get("/", (req, res) => {
	// req.params.id is the Hub ID, inherited from the parent router
	posts.findPostComments(req.params.id)
		.then(data => {
			res.json(data)
		})
		.catch(err => {
			res.status(500).json({
				message: "Could not get post messages",
			})
		})
})

router.get('/:commentId', (req, res) => {
    posts.findCommentById(req.params.id, req.params.commentId)
      .then(comments => {
        if (comments) {
          res.status(200).json(comments);
        } else {
          res.status(404).json({
            message: 'The post with the specified ID does not exist.'
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          error: 'The comments information could not be retrieved.'
        });
      });
  });

router.post('/', (req, res) => {
    // const id = req.params.id;
    // const text = req.body.text;
    // const comment = req.body;
  
    if (!req.body.text) {
      res.status(400).json({
        errorMessage: 'Please provide text for the comment'
      });
    } 

      posts.insertComment(req.params.id, req.body)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
          res.status(500).json({
            error: 'There was an error while saving the comment to the database.'
          });
        });
    });
  
  module.exports = router