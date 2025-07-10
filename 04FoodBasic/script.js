// Initialize AOS (Animate on Scroll)
AOS.init({
  duration: 800,
  once: true,
});

// Form submission handling
function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  let isValid = true;

  form.querySelectorAll('input[required]').forEach(input => {
    const errorMessage = input.nextElementSibling;
    if (!input.value || (input.type === 'number' && input.value < 1)) {
      input.classList.add('error');
      if (errorMessage && errorMessage.classList.contains('error-message')) {
        errorMessage.style.display = 'block';
      }
      isValid = false;
    } else {
      input.classList.remove('error');
      if (errorMessage && errorMessage.classList.contains('error-message')) {
        errorMessage.style.display = 'none';
      }
    }
  });

  if (isValid) {
    // Replace with actual form submission (e.g., to OpenTable or backend)
    alert('Reservation submitted! You will receive a confirmation soon.');
    form.reset();
  }
}