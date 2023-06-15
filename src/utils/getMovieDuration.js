export const getMovieDuration = (min) => {
  let hours = Math.floor(min / 60);
  const minutes = min % 60;
  return hours ? `${hours}ч ${minutes}м` : `${minutes}м`;
};
