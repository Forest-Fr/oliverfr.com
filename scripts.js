// ---------------------------
// DOM Elements
// ---------------------------
const carouselTrack = document.getElementById('carouselTrack');
const downloadButton = document.getElementById('download-vcard');
const mainModal = document.getElementById('main-modal');
const phoneModal = document.getElementById('phone-modal');
const closeMainModalBtn = document.getElementById('close-main-modal');
const closePhoneModalBtn = document.getElementById('close-phone-modal');
const sendPhoneButton = document.getElementById('send-phone');
const confirmPhoneButton = document.getElementById('confirm-phone');
const cancelPhoneButton = document.getElementById('cancel-phone');
const playPauseBtn = document.getElementById('playPauseBtn');

// ---------------------------
// Data for Carousel
// ---------------------------
const carouselItems = [
  { img: 'earpod-1.png', name: 'Earbuds 1', description: 'High quality sound' },
  { img: 'earpod-2.png', name: 'Earbuds 2', description: 'Comfortable fit' },
  { img: 'earpod-3.png', name: 'Earbuds 3', description: 'Noise-cancelling' },
  { img: 'earpod-4.png', name: 'Earbuds 4', description: 'Long-lasting battery' },
  { img: 'earpod-5.png', name: 'Earbuds 5', description: 'Waterproof' },
  { img: 'earpod-6.png', name: 'Earbuds 6', description: 'Portable charging case' },
];

// ---------------------------
// Carousel Logic (continuous scroll)
// ---------------------------
let currentIndex = 0;

function createCarouselItem(item, index) {
  const div = document.createElement('div');
  div.classList.add('carousel-item');
  div.style.left = `${index * 300}px`; // Position items side by side
  div.innerHTML = `
    <img src="${item.img}" alt="${item.name}">
    <span>${item.name}</span>
    <span>${item.description}</span>
  `;
  return div;
}

// Add carousel items to the track
function populateCarousel() {
  carouselTrack.innerHTML = ''; // Clear previous items
  carouselItems.forEach((item, index) => {
    const carouselItem = createCarouselItem(item, index);
    carouselTrack.appendChild(carouselItem);
  });
}

// Function to move carousel (scroll)
function moveCarousel() {
  currentIndex++;
  if (currentIndex >= carouselItems.length) {
    currentIndex = 0; // Reset to first item for continuous scroll
  }

  const offset = -currentIndex * 300; // Shift by the width of each item
  carouselTrack.style.transition = 'transform 0.5s ease-in-out';
  carouselTrack.style.transform = `translateX(${offset}px)`;
}

// Auto scroll the carousel
setInterval(moveCarousel, 2000); // Move every 2 seconds
populateCarousel(); // Initial population of carousel items

// ---------------------------
// Modal Logic
// ---------------------------

// Show a modal
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = 'flex';
}

// Close a modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = 'none';
}

// Show the main modal when the vCard button is clicked
downloadButton.addEventListener('click', function() {
  showModal('main-modal');
});

// Close the main modal
closeMainModalBtn.addEventListener('click', function() {
  closeModal('main-modal');
});

// Show phone modal when "Send to my phone" is clicked
sendPhoneButton.addEventListener('click', function() {
  showModal('phone-modal');
});

// Close the phone modal
closePhoneModalBtn.addEventListener('click', function() {
  closeModal('phone-modal');
});

// Confirm sending contact to phone
confirmPhoneButton.addEventListener('click', function() {
  // Simulating the contact download process
  // You can replace this with actual phone sending functionality (e.g., API call)
  document.getElementById('phone-success').style.display = 'block';
  document.getElementById('phone-error').style.display = 'none';
  setTimeout(function() {
    closeModal('phone-modal');
  }, 2000);
});

// Cancel phone download
cancelPhoneButton.addEventListener('click', function() {
  closeModal('phone-modal');
});

// ---------------------------
// Play/Pause Button Logic
// ---------------------------
let isPlaying = true; // Initial state: playing

playPauseBtn.addEventListener('click', function() {
  if (isPlaying) {
    playPauseBtn.textContent = 'Play';
    // You can add additional logic to pause music or any other functionality
  } else {
    playPauseBtn.textContent = 'Pause';
    // You can add additional logic to play music or any other functionality
  }
  isPlaying = !isPlaying; // Toggle state
});

// ---------------------------
// vCard Download Logic
// ---------------------------
function downloadVCard() {
  const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Oliver Fang
TEL:1234567890
EMAIL:oliver@example.com
ORG:Mefan Solution
END:VCARD`;

  const blob = new Blob([vCardData], { type: 'text/vcard' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'oliver_fang.vcf';
  link.click();
}

// Attach vCard download logic to the download button
downloadButton.addEventListener('click', function() {
  downloadVCard();
});
