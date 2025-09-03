document.addEventListener('DOMContentLoaded', async () => {
  const movieId = localStorage.getItem('selectedMovie');
  const seatLayout = document.getElementById('seatLayout');
  const bookButton = document.getElementById('bookButton');
  const loadingDiv = document.getElementById('loading');

  
  if (!movieId) {
    alert('No movie selected. Redirecting to movies page.');
    window.location.href = 'movies.html';
    return;
  }

  try {
    
    const response = await fetch(`http://localhost:4200/api/movies/${movieId}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const movie = await response.json();

  
    console.log('Movie data:', movie);
    console.log('Booked seats:', movie.bookedSeats || 'None');

  
    loadingDiv.style.display = 'none';

    const rows = 5, cols = 6;
    let selectedSeat = null;

    
    seatLayout.innerHTML = '';

    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {''
        const seatId = `${i + 1}-${j + 1}`;
        const seat = document.createElement('div');
        seat.className = 'seat';
        seat.textContent = seatId;

        
        const isBooked = Array.isArray(movie.bookedSeats) && movie.bookedSeats.includes(seatId);
        seat.classList.add(isBooked ? 'booked' : 'available');

        
        console.log(`Seat ${seatId}: ${isBooked ? 'booked' : 'available'}`);

        
        seat.addEventListener('click', () => {
          console.log(`Clicked seat: ${seatId}, Classes: ${seat.className}`);
          if (!seat.classList.contains('booked')) {
            
            document.querySelectorAll('.seat').forEach(s => {
              s.classList.remove('selected');
            });
            seat.classList.add('selected');
            selectedSeat = seatId;
            bookButton.disabled = false;
            console.log('Selected seat:', selectedSeat);
          } else {
            console.log('Seat is booked, ignoring click');
          }
        });

        seatLayout.appendChild(seat);
      }
    }

    
    console.log('Rendered seats:', Array.from(seatLayout.children).map(s => ({
      id: s.textContent,
      classes: s.className
    })));

    
    bookButton.addEventListener('click', async () => {
      if (!selectedSeat) {
        alert('No seat selected');
        return;
      }

      try {
        console.log('Booking seat:', selectedSeat);
        const response = await fetch('http://localhost:4200/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ movieId, seat: selectedSeat })
        });
        const booking = await response.json();
        if (response.ok) {
          localStorage.setItem('bookingId', booking._id);
          window.location.href = 'payment.html';
        } else {
          alert(booking.message || 'Failed to book seat');
          console.error('Booking error:', booking);
        }
      } catch (error) {
        alert('Error booking seat: ' + error.message);
        console.error('Booking request error:', error);
      }
    });
  } catch (error) {
    alert('Error loading movie: ' + error.message);
    console.error('Movie fetch error:', error);
    loadingDiv.textContent = 'Failed to load seats. Please try again.';
  }
});