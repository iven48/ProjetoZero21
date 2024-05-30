document.addEventListener("DOMContentLoaded", function() {
    const box = document.getElementById("box");
    const img = document.getElementById("product-image");
    const lens = document.getElementById("lens");

    function moveLens(e) {
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const lensWidth = lens.offsetWidth / 2;
        const lensHeight = lens.offsetHeight / 2;

        let left = x - lensWidth;
        let top = y - lensHeight;

        if (left < 0) left = 0;
        if (top < 0) top = 0;
        if (left > box.offsetWidth - lens.offsetWidth) left = box.offsetWidth - lens.offsetWidth;
        if (top > box.offsetHeight - lens.offsetHeight) top = box.offsetHeight - lens.offsetHeight;

        lens.style.left = left + 'px';
        lens.style.top = top + 'px';

        const zoomFactor = 3;
        img.style.transformOrigin = `${(left + lensWidth) / box.offsetWidth * 100}% ${(top + lensHeight) / box.offsetHeight * 100}%`;
        img.style.transform = `scale(${zoomFactor})`;
    }

    box.addEventListener("mousemove", moveLens);

    box.addEventListener("mouseenter", () => {
        lens.style.display = "block";
        img.style.transform = "scale(3)"; // Ajuste o fator de zoom conforme necessário
    });

    box.addEventListener("mouseleave", () => {
        lens.style.display = "none";
        img.style.transform = "scale(1)";
    });
});



// Avaliação do Produto 

function login() {
    var username = document.getElementById('username').value;
    if (username) {
        localStorage.setItem('loggedInUser', username);
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('review-section').style.display = 'block';
        document.getElementById('welcome-message').innerText = 'Bem-vindo, ' + username + '!';
        loadReviews();
    } else {
        alert('Por favor, insira seu nome de usuário.');
    }
}

let selectedRating = 0;

document.querySelectorAll('.star').forEach(function(star) {
    star.addEventListener('click', function() {
        selectedRating = this.getAttribute('data-value');
        updateStars();
    });
});

function updateStars() {
    document.querySelectorAll('.star').forEach(function(star) {
        if (star.getAttribute('data-value') <= selectedRating) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
    });
}

function postReview() {
    var reviewBox = document.getElementById('review-box');
    var review = reviewBox.value;
    var username = localStorage.getItem('loggedInUser');

    if (review && selectedRating > 0) {
        var reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.push({ username: username, review: review, rating: selectedRating });
        localStorage.setItem('reviews', JSON.stringify(reviews));

        reviewBox.value = '';
        selectedRating = 0;
        updateStars();
        displayReviews(reviews);

    // Captura o valor do textarea
    var reviewText = document.getElementById("review-box").value;

    // Adiciona o texto capturado na div avaliacao2
    document.getElementById("avaliacao2").innerText = reviewText;

    // Limpa o textarea após o envio
    document.getElementById("review-box").value = "";
        
    } else {
        alert('Por favor, escreva uma avaliação e selecione uma nota.');
    }
}


function loadReviews() {
    var reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    displayReviews(reviews);
}

function displayReviews(reviews) {
    var reviewsContainer = document.getElementById('reviews');
    reviewsContainer.innerHTML = '';

    reviews.forEach(function(review) {
        var reviewElement = document.createElement('div');
        reviewElement.className = 'review';
        reviewElement.innerHTML = `<strong>${review.username}</strong> - Nota: ${review.rating} estrelas<br>${review.review}`;
        reviewsContainer.appendChild(reviewElement);
    });
}

window.onload = function() {
    var loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('review-section').style.display = 'block';
        document.getElementById('welcome-message').innerText = 'Bem-vindo, ' + loggedInUser + '!';
        loadReviews();
    }
}
