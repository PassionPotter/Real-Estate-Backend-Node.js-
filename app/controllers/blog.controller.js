const db = require('../models')
const Blog = db.blog

exports.getBlogs = (req, res) => {
  const count = Number(req.query.count) ? Number(req.query.count) : 20
  Blog.findAll({
    limit: count,
    order: ['createdAt'],
  })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json({message: err.message})
    })
}

exports.createBlog = (req, res) => {
  console.log('[date]', req.body.date);
  Blog.create({
    userId: req.body.userId,
    title: req.body.title,
    thumbnail: req.body.thumbnail,
    content: req.body.content,
    date: req.body.date
  }).then(site => {
    if (site) {
      res.status(200).send({
        message: 'Site setting created successfully',
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

exports.saveBlog = (req, res) => {
  Blog.findOne({
    where: {
      id: req.body.id,
    }
  }).then(blog => {
    if (!blog) {
      res.status(400).send({
        message: 'Blog not found',
      })
    }

    blog.userId = req.body.userId
    blog.title = req.body.title
    blog.thumbnail = req.body.thumbnail
    blog.content = req.body.content
    blog.date = req.body.date;
    blog.save()
    res.status(200).send({
      message: 'Blog approved successfully',
    })
  })
}
