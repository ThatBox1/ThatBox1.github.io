
const apiKey = '29f868a59b09794bde9b7616b01dca37';

let popularData = [];
let topRatedData = [];
let upcomingData = [];
let genreData = [];

const movieContainer = document.getElementById('movie-container');
const homeLink = document.getElementById('homeLink');
const topRatedId = document.getElementById('topRatedId');
const popularId = document.getElementById('popularId');
const upcomingId = document.getElementById('upcomingId');


async function getPopular() {
  const moviesData = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
  popularData = await moviesData.json();
}

async function getTopRated() {
  const moviesData = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`);
  topRatedData = await moviesData.json();

}

async function getUpcoming() {
  const moviesData = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`);
  upcomingData = await moviesData.json();
}

async function getGenreData() {
  const movieGenreData = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
  genreData = await movieGenreData.json();
}

///////////////
///////////////



function getMovieGenre(genreIds) {
  // map genre ID to its corresponding name using find
  return genreIds.map(genreId => {
    // find genre object with the same id 
    const genre = genreData.genres.find(g => g.id === genreId);
    // returns name
    if (genre) {
      return genre.name;
    } else {
      // returns empty string
      return '';
    }
  }).join(', ');
}

function createCardUI(movieDataArray) {
  // Clear existing content in movieContainer
  movieContainer.innerHTML = '';

  // Loop through the array of movie data
  movieDataArray.forEach(movieData => {

    const cardUI = `
  <div class="card m-3 ml-3" style="width: 17rem;">
    <img src="https://image.tmdb.org/t/p/w500${movieData.poster_path}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${movieData.title}</h5>
      <p class="card-text">${movieData.overview}</p>
      <p class="card-text">Released date: ${movieData.release_date}</p>
      <p class="card-text">Genre: ${getMovieGenre(movieData.genre_ids)}</p>
    </div>
  </div>`;

    // Append the card to movieContainer
    movieContainer.innerHTML += cardUI;
  });
}


async function showAllMovies() {
  await popularCreateCard();
  await topRatedCreateCard();
  await upcomingCreateCard();

}

async function popularCreateCard() {
  await getGenreData()
  await getPopular();
  createCardUI(popularData.results);
}

async function topRatedCreateCard() {
  await getTopRated();
  await getGenreData()
  createCardUI(topRatedData.results);
}
async function upcomingCreateCard() {
  await getUpcoming();
  await getGenreData()
  createCardUI(upcomingData.results);
}


homeLink.addEventListener('click', async () => {
  await showAllMovies();
});
popularId.addEventListener('click', async () => {
  await popularCreateCard();
});

topRatedId.addEventListener('click', async () => {
  await topRatedCreateCard();
});
upcomingId.addEventListener('click', async () => {
  await upcomingCreateCard();
});

popularCreateCard();

// topRatedCreateCard();


