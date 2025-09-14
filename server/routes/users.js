import express from 'express';
import { searchUsers, followUser, unfollowUser, getFriends, getFriendsFeed } from '../controllers/userController.js';
import { getFriendProfile } from '../controllers/friendProfileController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/search', auth, searchUsers);
router.post('/:id/follow', auth, followUser);
router.post('/:id/unfollow', auth, unfollowUser);
router.get('/friends', auth, getFriends);
router.get('/friends/feed', auth, getFriendsFeed);
router.get('/:id/profile', auth, getFriendProfile);

export default router;
