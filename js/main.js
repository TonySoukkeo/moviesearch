const URL = "https://www.omdbapi.com/";

$(document).ready(() => {
  // Search for movie / show
  $(".search-input").on("keyup", searchMovie);

  // Open up more details for movie / show
  $(".display__list").on("click", ".display__card--btn", movieDetails);

  // Close out of details modal
  $(".popup").on("click", ".popup__close", closeDetails);
});

// Function to search for movie
function searchMovie(e) {
  const value = $(".search-input").val();

  // Ajax request
  $.get(URL + "?s=" + value + "&apikey=606fdfe0", data => {
    let output = "";

    if (data.Response === "False") {
      $(".display__list").html(`${data.Error}`);
    } else {
      // Loop through search results and create list items for each
      $.each(data.Search, (index, item) => {
        output += ` <li class="display__card">
        <div class="display__card-poster">
          <img
            class="display__card-poster--img"
            src="${item.Poster}"
            alt="banner"
          />
        </div>

        <div class="display__card--body">
          <h3 class="display__card--title">${item.Title}</h3>

          <p><b>Release Date:</b> <em>${item.Year}</em></p>
          <br />
          <p><b>Type:</b> <em>${item.Type}</em></p>
        </div>

        <div id=${item.imdbID} class="display__card--btn">
          <p>Info</p>
        </div>
      </li>`;
      });
    }

    // Display output to display list
    $(".display__list").html(output);
  });
}

// Open popup function
function movieDetails() {
  // Activate popup
  $(".popup").fadeIn();

  // Activate dark overlay
  $(".overlay").fadeIn();

  const movieId = this.id;

  // Make a request to fetch movie details
  $.get(URL + "?i=" + movieId + "&apikey=606fdfe0", data => {
    const output = `
      <div class="popup__close">
        &times;
      </div>

    <div class="popup__header">
      <div class="popup__image">
        <img 
        class="popup__image--poster"
        src="${data.Poster}" 
        alt="banner" />
      </div>

      <div class="popup__details">
    <div class="popup__info">
      <h5><b>Rating:</b> <em>${data.Rated}</em></h5>
      <h5><b>${data.Runtime}</b></h5>
    </div>  
    
    <div class="popup__ratings">
      <div class="popup__ratings--imdb">
      <i class="fab fa-imdb icon"></i>
        <h5><b>imdb:</b><em>${data.imdbRating}</em></h5>
      </div>

      <div class="popup__ratings--metascore">
      <i class="fas fa-star icon"></i>
      <h5><b>Metascore:</b><em>${data.Metascore}</em></h5>
      
      </div>
      
    </div>
     
     <div class="popup__genre container">
      <h4><b>Genre:</b> <em>${data.Genre}</em></h4>
     </div>

    </div>
    </div>
     <div class="popup__plot">${data.Plot}</div>
    `;

    // Add html to popup div
    $(".popup").html(output);
  });
}

// Close modal
function closeDetails() {
  // Remove class on popup
  $(".popup").fadeOut();

  // Remove class on overlay
  $(".overlay").fadeOut();
}
