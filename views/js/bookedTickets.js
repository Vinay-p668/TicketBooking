document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('http://localhost:4200/api/bookings/user', {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  });
  const bookings = await response.json();
  const bookedTickets = document.getElementById('bookedTickets');

  bookings.forEach(booking => {
    const div = document.createElement('div');
    div.className = 'bg-gray-50 p-4 rounded-lg shadow';
    div.innerHTML = `
      <div>
        <h3 class="text-lg font-semibold text-gray-800">${booking.movieId.title}</h3>
        <p class="text-gray-600">Seat: ${booking.seat}</p>
        <p class="text-gray-600">Showtime: ${booking.movieId.showtime}</p>
        <p class="text-gray-600">Status: ${booking.status}</p>
      </div>
    `;
    bookedTickets.appendChild(div);
  });
});