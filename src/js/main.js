import '@laylazi/bootstrap-rtl/dist/js/bootstrap.min.js';
import "@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css";
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min';
import '../sass/style.scss';



document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
});
  


document.getElementById('fullYear').innerHTML = new Date().getFullYear();