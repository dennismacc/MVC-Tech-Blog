const router = require("express").Router();
const { User, Post, Comment } = require("../models");
// const withAuth = require('../utils/auth');

// Get all posts for homepage
router.get("/", async (req, res) => {
  try {
    // we need to get all Posts and include the User for each
    const postData = await Post.findAll({
      attributes: { exclude: ["user_id", "updatedAt"] },
      include: [
        { model: User, attributes: { exclude: ["password", "createdAt"] } },
        { model: Comment },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData
      .map((post) => post.get({ plain: true }))
      .map((a) => ({ ...a, currentUserId: req.session.user_id }));

    // Pass serialized data and session flag into template to render all othe posts
    res.render("homepage", {
      payload: { posts, logged_in: req.session.logged_in },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single post
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: {
        exclude: ["user_id", "updatedAt"],
      },

      include: [
        {
          model: User,
          attributes: {
            exclude: ["password", "createdAt"],
          },
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: { exclude: ["password"] },
          },
        },
      ],
    });

    if (postData) {
      // serialize the data
      const post = postData.get({ plain: true });
      console.log("status", req.session.logged_in);
      res.render("single-post", {
        payload: { posts: [post], logged_in: req.session.logged_in },
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// login route
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// sign up route
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

module.exports = router;