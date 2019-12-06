const express = require('express');
const commentRouter = require('./comment.js')
const posts = require('../data/db.js')

const router = express.Router()

router.use('/:id/comments', commentRouter)


router.get('/', (req, res) => {
    const opts = {
        limit: req.query.limit,
        sortby: req.query.sortby,
        sortdir: req.query.sortdir,
      }

    posts.find(opts)
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(err => {
        res.status(500).json({
          error: 'The posts information could not be retrieved.'
        });
      });
  });

  router.get('/:id', (req, res) => {
    const id = req.params.id;
  
    posts.findById(id)
      .then(post => {
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({
            message: 'The post with the specified ID does not exist.'
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          error: 'The post information could not be retrieved.'
        });
      });
  });

router.post('/', (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  } else {
    posts.insert(req.body)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        res.status(500).json({
          error: 'There was an error while saving the post to the database'
        });
      });
  }
});

router.put('/:id', (req, res) => {  
    if (!req.body.title || !req.body.contents) {
      res.status(400).json({
        errorMessage: 'Please provide title and contents for the post.'
      });
    }
    if (!id) {
      res.status(404).json({
        message: 'The post with the specified ID does not exist.'
      });
    } else {
      posts.update(req.params.id, req.body)
        .then(post => {
          res.status(200).json(post);
        })
        .catch(err => {
          res.status(500).json({
            error: 'The post information could not be modified.'
          });
        });
    }
  });


router.delete('/:id', (req, res) => {
  posts.remove(req.params.id)
    .then(deletedPost => {
      if (deletedPost) {
        res.status(204).end();
      } else {
        res.status(404).json({ 
            message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The post could not be removed' });
    });
});

module.exports = router;