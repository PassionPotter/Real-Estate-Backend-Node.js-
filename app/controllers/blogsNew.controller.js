const db = require('../models')
const BlogsNew = db.blogsNew


exports.createNewBlog = (req, res) => {
    BlogsNew.create({
      content: req.body.content
    }).then(post => {
      if (post) {
        res.status(200).send({
          id: post.id,
          message: 'Blog post created successfully',
        })
      } else {
        res.status(400).send({
          message: 'Please try again',
        })
      }
    }).catch(err => {
      console.log(err);
      res.status(500).send({message: 'Server error'})
    })
  }

  exports.updateBlogsNew = (req, res) => {
      BlogsNew.findOne({
      where: {
        id: req.body.id,
      }
    }).then(post => {
      if (!post) {
        res.status(400).send({
          message: 'Please try again.'
        })
      }
      post.title = req.body.title;
      post.content = req.body.content;

      post.save()
      res.status(200).send({
        message: 'Blog post update Success'
      })
    }).catch(err => {
      console.log(err);
      res.status(500).send({ message: 'Server error' })
  
    })
  }

  exports.getBlogsNew = (req, res) => {
    let condition = {
      order: [['createdAt','DESC']],
    };
    BlogsNew.findAll(condition)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({message: err.message})
      })
  }

  exports.getBlogsNewById = (req, res) => {
    let condition = {
      where: {
        id: req.query.id
      }
    };
    BlogsNew.findOne(condition)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({message: err.message})
      })
  }

  exports.delPost = (req, res) => {
    BlogsNew.destroy({
      where: {
        id: req.query.id
      }
    }).then(result => {
        res.status(200).send({
          message: 'Post deleted successfully',
        });
    })
  }