/* eslint-disable import/prefer-default-export */
import { SUCCESS, FAILURE, PENDING } from '../../common/util';

const INITIAL_STATE = {
  famousPosts: [],
  lastItemId: '',
  hasMoreItems: true,
  loadItemStatus: '',
};

export const homeReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'LOADED_NEW_POSTS':
      console.log(`fm payload ${payload.length}`);
      return { ...state, hasMoreItems: true, famousPosts: state.famousPosts.concat(payload) };

    case 'UPDATE_LAST_ITEM':
      return { ...state, lastItemId: payload };

    case 'NO_MORE_ITEM':
      return { ...state, hasMoreItems: false };

    case 'LOAD_NEW_POSTS_SUCCESS':
      return { ...state, loadItemStatus: SUCCESS };

    case 'LOAD_NEW_POSTS_FAILURE':
      return { ...state, loadItemStatus: FAILURE };

    case 'LOAD_NEW_POSTS_PENDING':
      return { ...state, loadItemStatus: PENDING };

    case 'POST_LIKE_FAILED':
      const { pos } = payload;
      const { userId } = payload;
      const item = state.famousPosts[pos];
      if (item && userId && item.creatorId == userId) {
        item.isLiked = 0;
        const updatedPosts = [...state.famousPosts.slice(0, pos), item, ...state.famousPosts.slice(pos + 1)];
        return { ...state, famousPosts: updatedPosts };
      }
      return state;

    case 'POST_LIKE_SUCCESS':
      const position = payload.pos;
      const likeUserId = payload.userId;
      const likeItem = state.famousPosts[position];
      if (likeItem && likeUserId && likeItem.creatorId == likeUserId) {
        likeItem.isLiked = likeItem.isLiked == 0 ? 1 : 0;
        const updatedPosts = [...state.famousPosts.slice(0, position), likeItem, ...state.famousPosts.slice(position + 1)];
        return { ...state, famousPosts: updatedPosts };
      }
      return state;

    default:
      return state;
  }
};
