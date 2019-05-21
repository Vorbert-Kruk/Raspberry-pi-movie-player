(() => {
    let currentInterval = setInterval(() => {
        getNewMovies();
    }, 1000);
})();

document.querySelectorAll('h4').forEach(bttn => {
    bttn.addEventListener('click', e => {
        playMovie(e);
    })
});

function playMovie(e){
    let allButtons = document.querySelectorAll('h4');
    let currentIndex;
    allButtons.forEach((bttn, bttnIndex) => {
        if(bttn == e.target)
            currentIndex = bttnIndex;
    })
    fetch(`http://192.168.1.69:3000/play/${currentIndex}`)
        .then(response => {
            if(response.status == 200)
                console.log(`Pomyślnie wysłano prośbę o włączenie filmu o nr ${currentIndex}`);
        })
        .catch(err => console.log(`Wystąpił problem z wysłaniem rządania o włączenie filmu.\nError code: ${err}`));
}

function getNewMovies(){
    fetch('http://192.168.1.69:3000/movies/')
        .then(data => data.json())
        .then(movieList => {
            let currentMovies = document.querySelectorAll('.container');
            if(movieList.movies.length > currentMovies.length)
                movieList.movies.forEach((movie, movieIndex) => {
                    if(movieIndex >= currentMovies.length)
                        addMovie(movie.name);
                });
            else
                console.log('Lista filmów jest aktualna');
                console.log(movieList);
        })
        .catch(err => console.log(`Wystąpił problem z pobraniem zawartości.\nKod błędu: ${err}`));
}

function addMovie(movieName){
    let container = document.createElement('div');
    container.classList.add('container');

    let movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    let movieHeader = document.createElement('h2');
    movieHeader.innerHTML = movieName;

    let movieButton = document.createElement('h4');
    movieButton.addEventListener('click', e => {
        playMovie(e);
    })

    movieCard.appendChild(movieHeader);
    movieCard.appendChild(movieButton);
    container.appendChild(movieCard);
    document.querySelector('.container:last-of-type').parentElement.appendChild(container);
}