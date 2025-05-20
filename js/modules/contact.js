export function init() {
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(form);
      // Aquí podrías usar Formspree u otro servicio
      console.log('Contact form data:', Object.fromEntries(data.entries()));
      alert('Thank you for contacting us!');
      form.reset();
    });
  }
  