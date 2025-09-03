document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('http://localhost:4200/api/movies', {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  });
  const movies = await response.json();
  const movieList = document.getElementById('movieList');

  movies.forEach(movie => {
    const div = document.createElement('div');
    div.className = 'bg-gray-50 p-4 rounded-lg shadow flex justify-between items-center';
    div.innerHTML = `
      <div>
        <h3 class="text-lg font-semibold text-gray-800">${movie.title}</h3>
        <p class="text-gray-600">Showtime: ${movie.showtime}</p>
        <p class="text-gray-600">Price: $${movie.price}</p>
        <p class="text-gray-600">Available Tickets: ${movie.availableTickets}</p>
      </div>
      <button onclick="bookMovie('${movie._id}')" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Book</button>
    `;
    movieList.appendChild(div);
  });
});
function bookMovie(movieId) {
  localStorage.setItem('selectedMovie', movieId);
  window.location.href = 'booking.html';
}