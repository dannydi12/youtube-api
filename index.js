let currentSearch = ``; // I made this global for button functionality, should I do something else instead?

// Helper functions

function renderButtons(next) {
    $('.js-buttons').html(`
    <button class="next" data-next="${next}">Next</button>
    `);
}

function formatList(videos) {
    let html = ``;
    for(video of videos) {
        html += `
        <li>
            <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="blank_">
                <h3>${video.snippet.title}</h3>
                <img src="${video.snippet.thumbnails.high.url}" alt="">
            </a>
        </li>
        `;
    }
    return html;
}

// Printing functions

function printResults(videos, nextPage) {
    $('.js-list').append(formatList(videos));
    renderButtons(nextPage);
}

function fetchVideos(search, pageToken = null) {
    // Is it ok for me to do it this way? 
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyD17MWwk2Uy4MNMAE4RgqTH88To60Eqw00&maxResults=10&type=video&q=${encodeURI(search)}${pageToken ? `&pageToken=` + pageToken : ``}`;

    fetch(url)
    .then(response => {
        if(!response) {
            throw new Error(response);
        }
        return response;
    })
    .then(results => results.json())
    .then(resultsJson => printResults(resultsJson.items, resultsJson.nextPageToken))
    .catch(error => alert(error));
}

// Event Listeners

function handleNext() {
    $('.js-buttons').on('click', '.next', function (event) {
        fetchVideos(currentSearch, $(this).data('next'));
    });
}

function handleSearch() {
    $('form').submit(function (event) {
        event.preventDefault();
        $('.js-list').empty();
        currentSearch = $('#search').val();
        fetchVideos(currentSearch);
    });
}

function main() {
    handleSearch();
    handleNext();
}

$(main);