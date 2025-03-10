

const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOWI1M2NhZjJhNzNjOWJmNTNiOTU4MzMyYzdmNWRjMCIsIm5iZiI6MTc0MDY0NjY2NS4yNzQsInN1YiI6IjY3YzAyOTA5MTRhNDM5NmNhZmM4ZDc1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gYsMedMosp2-gD0uTfJFlkRPSNMu3YXOWwAfzedV9bc'

export const getAllMovie = async (_: any,{page}:{page:number}) => {
  const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: token
  }
};

const res = await fetch(url, options)
const data = res.json()
return data;
}


export const getAllActor = async (_: any,{page}:{page:number}) => {
  const url = `https://api.themoviedb.org/3/person/popular?language=en-US&page=${page}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: token
    }
  };
  
  const res = await fetch(url, options)
  const data = res.json()
  return data;
}


export const getAllPeople = async (_: any,{page}:{page:number}) => {
  const url = 'https://api.themoviedb.org/3/trending/person/day?language=en-US';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: token
    }
  };  
  const res = await fetch(url, options)
  const data = res.json()
  return data;
}

export const getTrendingMovie = async () => {
  const url = 'https://api.themoviedb.org/3/trending/person/day?language=en-US';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: token
    }
  };  
  const res = await fetch(url, options)
  const data = res.json()
  return data;
}

export const getMovieById = async (_:any, {id}:{id:string}) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=e9b53caf2a73c9bf53b958332c7f5dc0&language=en-US`;
  const options = {
    method: 'GET',
   
  };  
  const res = await fetch(url, options)
  const data = res.json()
  return data;
}

export const searchMovieByName = async (_:any, {movieName}:{movieName:string}) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=e9b53caf2a73c9bf53b958332c7f5dc0&language=en-US`;
  const options = {
    method: 'GET',
   
  };  
  const res = await fetch(url, options)
  const data = res.json()
  return data;
}
