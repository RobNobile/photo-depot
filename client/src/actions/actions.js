import * as types from '../constants/actionTypes';

export const getPhotos = (photos) => ({
  type: types.GET_PHOTOS,
  payload: photos,
});

export const deletePhoto = (photoId) => ({
  type: types.DELETE_PHOTO,
  payload: photoId,
});

export const addRating = ({ photoId, rating }) => ({
  type: types.ADD_RATING,
  payload: { photoId, rating },
});

export const getTags = (tags) => ({
  type: types.GET_TAGS,
  payload: tags,
});

// Need to wait to get new tagId from the server (database)
export const addTag = ({ photoId, newTag: { tagId, tag } }) => ({
  type: types.ADD_TAG,
  payload: { photoId, newTag },
});

export const removeTag = ({ photoId, trashTag: { tagId, tag } }) => ({
  type: types.REMOVE_TAG,
  payload: { photoId, trashTag },
});
