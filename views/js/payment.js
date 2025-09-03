document.getElementById('paymentForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const bookingId = localStorage.getItem('bookingId');

  const response = await fetch(`http://localhost:4200/api/bookings/confirm/${bookingId}`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  });

  const data = await response.json();
  if (response.ok) {
    alert('Ticket booked successfully!');
    window.location.href = 'booked-tickets.html';
  } else {
    alert(data.message);
  }
});