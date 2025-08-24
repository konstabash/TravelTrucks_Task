export const selectCampers = (state) => state.campers.items;
export const selectCampersTotal = (state) => state.campers.total;
export const selectFavoriteIds = (state) => state.campers.favorites;
export const selectIsFavorite = (id) => (state) =>
  state.campers.favorites.includes(String(id));
export const selectCurrentCamper = (state) => state.campers.current;
export const selectIsCurrentLoading = (state) => state.campers.isCurrentLoading;
export const selectIsLoading = (state) => state.campers.isLoading;
