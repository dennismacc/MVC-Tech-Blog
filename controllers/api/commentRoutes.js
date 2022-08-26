// Import
const router = require('express').Router();
const { Comment} = require('../../models');
const withAuth = require('../../utils/auth');


// Create a new comment 
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json('Something went wrong', err);
    }
});

// Update comment
router.put('/:id', async (req, res) => {
    try {
        const updateComment = await Comment.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        if (!updateComment) {
            res.status(404).json('No Comment found with that id');
            return
        }
        res.status(200).json({ message: 'Comment has been updated' })
    } catch (err) {
        res.status(500).json('Something went wrong', err)
    }
});

// Delete comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const delComment = await Comment.destroy({
            where: {
                id: req.params.id
            },
        })
        if (!delComment) {
            res.status(404).json({ message: 'No Comment found with that id' });
        }
        res.status(200).json({ message: 'Comment has been deleted' })
    } catch (err) {
        res.status(500).json('Something went wrong', err)
    }
});

// Export
module.exports = router;