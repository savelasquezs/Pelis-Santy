const api=new axios.create({
    baseURL:'https://api.themoviedb.org/3/',
    headers:{
        'Content-Type':'application/json;charset=utf-8'
    },
    params:{
        'api_key':API_KEY,
        'language':'es'
    }
});
// Utils:--------------------------------------

function showCategory(id,cat){
    location.hash=`#category=${id}-${cat}`
    getMoviesByCategory(id);
    headerCategoryTitle.innerText=cat
}

function changeHash(id){
    location.hash=`#movie=${id}`
}

function createHtml(movies){
    let moviesInHtml=`${movies.map(movie=>`
    <div class="movie-container">
        <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" class="movie-img" onclick="changeHash('${movie.id}')"
        alt="${movie.original_title}" />
    </div>
    `).join("")}`
    return moviesInHtml
}

function createCategories(genres){
    let genresHtml=`${genres.map(genre=>`
    <div class="category-container" onclick="showCategory('${genre.id}','${genre.name}')">
         <h3 id="id${genre.id}" class="category-title">${genre.name}</h3>
    </div>
    `).join("")}`
    return genresHtml
}

// API call-----------------------------------

async function getTrendingPreview(){
    const {data}=await api('trending/movie/day')
    const movies=data.results    
    trendingMoviesPreviewList.innerHTML=createHtml(movies)
}

async function getCategoryPreview(){
    const {data}=await api(`genre/movie/list`)
    const genres=data.genres
    categoriesPreviewList.innerHTML=createCategories(genres) 
}

async function getMoviesByCategory(id){
    const {data}=await api('discover/movie',{
        params:{
            with_genres:id
        }
    })
    const movies=data.results
    genericSection.innerHTML=createHtml(movies)
}

async function getMoviesBySearch(query){
    const {data}=await api('search/movie',{
        params:{
            query
        }
    })
    const movies=data.results
    genericSection.innerHTML=createHtml(movies)
}

async function getTrending(){
    const {data}=await api('trending/movie/day')
    const movies=data.results
    headerCategoryTitle.innerHTML="Tendencias"
    genericSection.innerHTML=createHtml(movies)
}

async function getMovieById(id){
    // de inicio se recibe la info de la pelicula, pero el parametro por defecto que arroja axios es data, entonces en el diccionario le cambiamos el nombre
    const {data:movie}=await api(`/movie/${id}`)
    movieDetailTitle.textContent=movie.title
    movieDetailDescription.textContent=movie.overview
    movieDetailScore.textContent=movie.vote_average
    imageUrl=`https://image.tmdb.org/t/p/w300${movie.poster_path}`
    headerSection.style.background=`linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),url("${imageUrl}")`
    createCategories(movie.genres)
    movieDetailCategoriesList.innerHTML=createCategories(movie.genres)
    getRelatedMoviesById(id)
}

async function getRelatedMoviesById(id){
    const {data}=await api(`/movie/${id}/recommendations`)
    const movies=data.results
    relatedMoviesContainer.innerHTML=createHtml(movies)
    relatedMoviesContainer.scrollTo(0,0)
}


