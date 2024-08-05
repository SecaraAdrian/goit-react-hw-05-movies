import axios from 'axios';

const API_KEY = '0749cec710b71a564db8455b86e66c45';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export async function getHomeMovies() {
  try {
    const { data } = await axios.get('/trending/movie/week', {
      params: { api_key: API_KEY },
    });
    return data.results;
  } catch (error) {
    console.error('Failed to fetch trending movies:', error);
    throw error;
  }
}

export async function getMovieByName(query, page = 1) {
  try {
    const { data } = await axios.get('/search/movie', {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        page,
        query,
      },
    });
    return data.results;
  } catch (error) {
    console.error('Failed to search movies:', error);
    throw error;
  }
}

export async function getMovieDetails(id) {
  try {
    const { data } = await axios.get(`/movie/${id}`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
      },
    });
    return data;
  } catch (error) {
    console.error('Failed to fetch movie details:', error);
    throw error;
  }
}

export async function getMovieCast(id) {
  try {
    const { data } = await axios.get(`/movie/${id}/credits`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
      },
    });
    return data.cast;
  } catch (error) {
    console.error('Failed to fetch movie cast:', error);
    throw error;
  }
}

export async function getMovieReviews(id) {
  try {
    const { data } = await axios.get(`/movie/${id}/reviews`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
      },
    });
    return data.results;
  } catch (error) {
    console.error('Failed to fetch movie reviews:', error);
    throw error;
  }
}
