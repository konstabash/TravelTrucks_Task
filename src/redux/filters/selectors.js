export const selectFilters = (state) => state.filters;
export const selectLocationFilter = (state) => state.filters.location;

export const selectFilteredCampers = (state) => {
  const items = state.campers.items;
  const { location, equipment, vehicleType } = state.filters;

  const q = location.trim().toLowerCase();
  let res = q
    ? items.filter((c) => c.location.toLowerCase().includes(q))
    : items;

  if (equipment?.AC) res = res.filter((c) => c.AC);
  if (equipment?.kitchen) res = res.filter((c) => c.kitchen);
  if (equipment?.TV) res = res.filter((c) => c.TV);
  if (equipment?.bathroom) res = res.filter((c) => c.bathroom);
  if (equipment?.automatic)
    res = res.filter((c) => c.transmission === "automatic");

  if (vehicleType) res = res.filter((c) => c.form === vehicleType);

  return res;
};

export const selectFilteredTotal = (state) =>
  selectFilteredCampers(state).length;
