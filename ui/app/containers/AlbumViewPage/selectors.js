import dotProp from 'dot-prop';
import { createSelector } from 'reselect';

// Memorized selectors
export const selectAlbum = state => state.mediaGallery.albums || [];
export const selectPage = state => state.mediaGallery.albumViewPage;
export const selectSection = state => state.mediaGallery;

export const makeSelectAlbumLoading = () => createSelector(
  selectPage,
  pageState => pageState.albumLoading,
);

export const makeSelectAlbumError = () => createSelector(
  selectPage,
  pageState => pageState.albumError,
);

export const makeSelectAlbumName = () => createSelector(
  selectAlbum,
  albumState => albumState.album,
);

export const makeSelectMemories = () => createSelector(
  selectSection,
  (sectionState) => {
    const {
      album,
      gallery,
    } = sectionState;

    return dotProp.get(sectionState, `${gallery}.${album}.memories`, []);
  },
);

export const selectNextPage = (state) => {
  const pageState = selectPage(state);
  const albumState = selectAlbum(state);
  const {
    album,
    gallery,
  } = albumState;

  return {
    album,
    gallery,
    memories: albumState[gallery][album].memories, // memories is an Array (not Immutable)
    page: pageState.page,
  };
};

export const makeSelectNextPage = () => createSelector(
  selectPage,
  selectAlbum,
  selectNextPage,
);

export const makeSelectMoreThumbs = () => createSelector(
  selectPage,
  pageState => pageState.hasMore,
);

export const makeSelectCurrentMemory = () => createSelector(
  selectAlbum,
  (albumState) => {
    const {
      currentMemory,
    } = albumState;

    return currentMemory || null;
  },
);
