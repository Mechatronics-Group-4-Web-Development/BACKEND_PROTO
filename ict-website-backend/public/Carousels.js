let currentIndex = 0;
const dots = document.querySelectorAll('.dot');
const totalImages = dots.length; // Total number of images

// Fetch images from the backend API
const fetchImages = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/images');
    const images = await response.json();
    
    const carouselImages = document.querySelector('.carousel-images');
    carouselImages.innerHTML = ''; // Clear existing images

    // Add images to the carousel
    images.forEach(image => {
      const imgElement = document.createElement('img');
      imgElement.src = image.url;
      imgElement.alt = image.title;
      carouselImages.appendChild(imgElement);
    });

    updateCarousel(); // Initial update of the carousel
  } catch (error) {
    console.error('Error fetching images:', error);
  }
};

// Update carousel position and active dot
const updateCarousel = () => {
  const offset = currentIndex * -100;
  document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;

  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
};

// Navigation buttons and dot navigation
const nextImage = () => {
  currentIndex = (currentIndex + 1) % totalImages;
  updateCarousel();
};

const prevImage = () => {
  currentIndex = (currentIndex - 1 + totalImages) % totalImages;
  updateCarousel();
};

document.querySelector('.next').addEventListener('click', nextImage);
document.querySelector('.prev').addEventListener('click', prevImage);

dots.forEach(dot => {
  dot.addEventListener('click', (e) => {
    currentIndex = parseInt(e.target.dataset.index);
    updateCarousel();
  });
});

setInterval(nextImage, 5000); // Automatic carousel slide every 5 seconds

// Initial fetch of images when the page loads
window.onload = fetchImages;