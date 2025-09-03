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
        <p class="text-gray-600">Total Tickets: ${movie.totalTickets}</p>
      </div>
      <div class="space-x-2">
        <button onclick="editMovie('${movie._id}')" class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition">Edit</button>
        <button onclick="deleteMovie('${movie._id}')" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Delete</button>
      </div>
    `;
    movieList.appendChild(div);
  });
});

document.getElementById('addMovieForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const movie = {
    title: document.getElementById('title').value,
    showtime: document.getElementById('showtime').value,
    price: document.getElementById('price').value,
    totalTickets: document.getElementById('totalTickets').value
  };

  const response = await fetch('http://localhost:4200/api/movies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(movie)
  });

  if (response.ok) {
    window.location.reload();
  } else {
    alert('Error adding movie');
  }
});

async function editMovie(id) {
  const title = prompt('Enter new title');
  const showtime = prompt('Enter new showtime');
  const price = prompt('Enter new price');
  const totalTickets = prompt('Enter new total tickets');

  const response = await fetch(`http://localhost:4200/api/movies/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ title, showtime, price, totalTickets })
  });

  if (response.ok) {
    window.location.reload();
  } else {
    alert('Error updating movie');
  }
}

async function deleteMovie(id) {
  if (confirm('Are you sure you want to delete this movie?')) {
    const response = await fetch(`http://localhost:4200/api/movies/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });

    if (response.ok) {
      window.location.reload();
    } else {
      alert('Error deleting movie');
    }
  }
}