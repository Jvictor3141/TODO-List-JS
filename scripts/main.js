document.addEventListener('DOMContentLoaded', function() {
  const buttonOpenForm = document.getElementById('add-task');
  const overlay = document.getElementById('overlay');

  buttonOpenForm.addEventListener('click', () => {
    overlay.classList.toggle('active')
  })

  const form = document.getElementById("task-form");

  form.addEventListener('submit', (e) => {
    e.preventDefault();
  })

  overlay.addEventListener('click', (e) => {
    if(e.target == e.currentTarget) {
      overlay.classList.remove("active");
    }
  })
})