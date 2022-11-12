window.addEventListener('hashchange',navigator,false)
window.addEventListener('load',navigator)
searchFormBtn.addEventListener('click',()=>{
    const query=searchFormInput.value
    location.hash=`#search=${query}`
    getMoviesBySearch(query)
})
trendingBtn.addEventListener('click',()=>location.hash="#trends")
arrowBtn.addEventListener('click',()=>location.hash=window.history.back())

function navigator(){
    location.hash.startsWith('#trends') ? trendsPage() :
    location.hash.startsWith('#search=') ? searchPage() :
    location.hash.startsWith('#movie=') ? moviePage() :
    location.hash.startsWith('#category=') ? categoryPage() :
    homePage()
    window.scrollTo(0, 0);
}

const active=(element)=>element.classList.remove('inactive')
const inactive=(element)=>element.classList.add('inactive')


function trendsPage(){
console.log("trends")
console.log("category")
arrowBtn.classList.remove('header-arrow--white')
headerSection.style.background ="";
headerSection.classList.remove('header-container--long');
active(arrowBtn)
active(headerCategoryTitle)
active(genericSection)
inactive(movieDetailSection)
inactive(headerTitle)
inactive(searchForm)
inactive(trendingPreviewSection)
inactive(categoriesPreviewSection)
getTrending()
}
function searchPage(){
    console.log("search")
  
    headerSection.style.background ="";
    headerSection.classList.remove('header-container--long');
    active(arrowBtn)
    arrowBtn.classList.remove('header-arrow--white')

    inactive(headerCategoryTitle)
    active(genericSection)
    inactive(movieDetailSection)
    inactive(headerTitle)
    active(searchForm)
    inactive(trendingPreviewSection)
    inactive(categoriesPreviewSection)

    const [_,query]=location.hash.split("=")
    getMoviesBySearch(query)

    
}
function moviePage(){
    console.log("movie")
    
    headerSection.classList.add('header-container--long');
    // headerSection.style.background ="";
    active(arrowBtn)
    arrowBtn.classList.add('header-arrow--white')
    inactive(headerTitle)
    inactive(headerCategoryTitle)
    inactive(searchForm)
    inactive(trendingPreviewSection)
    inactive(categoriesPreviewSection)
    inactive(genericSection)
    active(movieDetailSection)
    const [_,movieId]=location.hash.split("=")
    getMovieById(movieId)
    

}
function categoryPage(){
    console.log("category")
    arrowBtn.classList.remove('header-arrow--white')
    headerSection.style.background ="";
    headerSection.classList.remove('header-container--long');
    active(arrowBtn)
    active(headerCategoryTitle)
    active(genericSection)
    inactive(movieDetailSection)
    inactive(headerTitle)
    inactive(searchForm)
    inactive(trendingPreviewSection)
    inactive(categoriesPreviewSection)
}
function homePage(){
    console.log("Home")

    headerSection.classList.remove('header-container--long');
    headerSection.style.background ="";
    inactive(arrowBtn)
    inactive(headerCategoryTitle)
    inactive(genericSection)
    inactive(movieDetailSection)
    active(headerTitle)
    active(searchForm)
    active(trendingPreviewSection)
    active(categoriesPreviewSection)

    getTrendingPreview()
    getCategoryPreview()

}