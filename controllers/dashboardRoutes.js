const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Get all posts for homepage
router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: { exclude: ["updatedAt", "user_id"] },
      include: [
        { model: User, attributes: { exclude: ["updatedAt", "password"] } },
        { model: Comment },
      ],
      where: {
        user_id: req.session.user_id,
      },
    });
    const posts = postData
      .map((post) => post.get({ plain: true }))
      .map((a) => ({ ...a, currentUserId: req.session.user_id }));
    console.log(posts[0])

    // fill in the view to be rendered
    res.render("dashboard", {
      payload: { posts, logged_in: req.session.logged_in },
    });
  } catch (err) {
    console.log(err);
    res.redirect("login");
  }
});

// get single post
router.get("/new", withAuth, (req, res) => {
  res.render("new-post");
});

// edit post
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      // serializing the data
      const post = postData.get({ plain: true });

      res.render("edit-post", {
        payload: { post, logged_in: req.session.logged_in },
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.log(err);
    res.redirect("login");
  }
});

module.exports = router;