export const getMovieImg = (posterPath: string | null) =>
  posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : 'https://via.placeholder.com/500x750?text=NO+PREVIEW';
