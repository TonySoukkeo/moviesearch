const URL = "http://www.omdbapi.com/";

$(document).ready(() => {
  // $(".search-input").on("keyup", searchMovie);
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
        output += `<li class="display__card">
                      <h3 class="display__card--title">${item.Title}</h3>
                   </li>`;
      });
    }

    // Display output to display list
    $(".display__list").html(output);
  });
}
