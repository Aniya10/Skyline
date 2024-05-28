const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach((dropdown) => {
    const input = dropdown.querySelector('input');
    const options = dropdown.querySelector('.options');

    input.addEventListener('click', (event) => {
      event.stopPropagation();
      options.classList.toggle('hidden');
    });
    
    const travelerType = options.querySelector('.traveler-type');
    const adultInput = travelerType.querySelector('#adult');
    const childInput = travelerType.querySelector('#child');
    const infantInput = travelerType.querySelector('#infant');
    const doneButton = options.querySelector('.done');

    const updatePlaceholder = () => {
      const adultCount = adultInput.value;
      const childCount = childInput.value;
      const infantCount = infantInput.value;
      input.value = `${adultCount} Adult${adultCount > 1 ? 's' : ''}, ${childCount} Child${childCount > 1 ? 'ren' : ''}, ${infantCount} Infant${infantCount > 1 ? 's' : ''}`;
    };
    
    

    adultInput.addEventListener('input', updatePlaceholder);
    childInput.addEventListener('input', updatePlaceholder);
    infantInput.addEventListener('input', updatePlaceholder);

    doneButton.addEventListener('click', (event) => {
      event.preventDefault();
      options.classList.add('hidden');
      updatePlaceholder();
    });
  });


  const faqQuestions = document.querySelectorAll('.faq-question');
  const faqAnswers = document.querySelectorAll('.faq-answer');
  
  faqQuestions.forEach((faqQuestion, index) => {
    faqQuestion.addEventListener('click', () => {
      faqAnswers.forEach((faqAnswer, answerIndex) => {
        if (index === answerIndex) {
          faqAnswer.hidden = !faqAnswer.hidden;
        } else {
          faqAnswer.hidden = true;
        }
      });
    });
  });

  
  function openBookingPage() {
    window.open('booking.html', '_blank');
  }

  function openFlightPage() {
    window.open('flight.html', '_blank');
  }
  function openLoginPage() {
    window.open('login.html', '_blank');
  }

  document.addEventListener("DOMContentLoaded", function() {
    const featureItems = document.querySelectorAll(".feature-item");
  
    function checkVisibility() {
      featureItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        const itemBottom = item.getBoundingClientRect().bottom;
  
        if (itemTop < window.innerHeight && itemBottom >= 0) {
          setTimeout(() => {
            item.classList.add("slide-in-animation");
          }, index * 200); // Delay each item by 200ms
        } else {
          item.classList.remove("slide-in-animation");
        }
      });
    }
  
    window.addEventListener("scroll", checkVisibility);
    window.addEventListener("resize", checkVisibility);
  
    checkVisibility(); // Check visibility on page load
  });

  document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("book-ticket").addEventListener("click", function() {
      document.getElementById("payment-section").scrollIntoView({ behavior: "smooth" });
    });
  });

var modal = document.getElementById('paymentModal');

var btn = document.querySelector('.Payment-btn');

var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var form = document.getElementById('paymentForm');

var submitButton = document.querySelector('#paymentForm input[type="submit"]');

var thankYouModal = document.getElementById('thankYouModal');

var thankYouClose = document.querySelector('#thankYouModal .close');

form.onsubmit = function(event) {
  event.preventDefault();
  
  var loadingSpinner = document.createElement('div');
  loadingSpinner.innerHTML = 'Loading...';
  modal.appendChild(loadingSpinner);
  
  submitButton.disabled = true;
  
  setTimeout(function() {
    modal.removeChild(loadingSpinner);
    
    modal.style.display = "none";
    
    thankYouModal.style.display = "block";
    
    thankYouModal.style.top = "20px";
    thankYouModal.style.right = "20px";
  }, 1000); // 3 second delay
};



