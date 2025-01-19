// ---------------------------
// Modal Logic (unchanged)
// ---------------------------
const mainModal = document.getElementById('main-modal');
const phoneModal = document.getElementById('phone-modal');

const downloadVCard = document.getElementById('download-vcard');
const sendPhoneButton = document.getElementById('send-phone');

const closeMainModal = document.getElementById('close-main-modal');
const closePhoneModal = document.getElementById('close-phone-modal');

const confirmPhone = document.getElementById('confirm-phone');
const cancelPhone = document.getElementById('cancel-phone');

const phoneError = document.getElementById('phone-error');
const phoneSuccess = document.getElementById('phone-success');

downloadVCard.addEventListener('click', () => {
  mainModal.style.display = 'flex';
});
closeMainModal.addEventListener('click', () => {
  mainModal.style.display = 'none';
});
sendPhoneButton.addEventListener('click', () => {
  mainModal.style.display = 'none';
  phoneModal.style.display = 'flex';
  resetPhoneModal();
});
closePhoneModal.addEventListener('click', () => {
  phoneModal.style.display = 'none';
});
cancelPhone.addEventListener('click', () => {
  phoneModal.style.display = 'none';
});
confirmPhone.addEventListener('click', () => {
  resetPhoneModal();
  try {
    phoneModal.style.display = 'none';
    window.location.href = 'OliverF.vcf';
    phoneSuccess.textContent = 'Contact successfully saved to your phone.';
    phoneSuccess.style.display = 'block';
    phoneError.style.display = 'none';
    setTimeout(() => {
      phoneSuccess.style.display = 'none';
    }, 3000);
  } catch (error) {
    console.error("Error during file download:", error);
    phoneError.textContent = 'Failed to save contact.';
    phoneError.style.display = 'block';
    phoneSuccess.style.display = 'none';
    setTimeout(() => {
      phoneError.style.display = 'none';
    }, 3000);
  }
});
function resetPhoneModal() {
  phoneError.style.display = 'none';
  phoneSuccess.style.display = 'none';
}
window.addEventListener('click', (event) => {
  if (event.target === mainModal) {
    mainModal.style.display = 'none';
  }
  if (event.target === phoneModal) {
    phoneModal.style.display = 'none';
  }
});

// ---------------------------
// 6 Modules Data
// ---------------------------
const modulesData = [
  {
    href: "https://wa.me/12817839998",
    img: "https://cdn-icons-png.flaticon.com/512/124/124034.png",
    text1: "WhatsApp",
    text2: "+1 281 783 9998"
  },
  {
    href: "mailto:sales@oliverfr.com",
    img: "https://cdn-icons-png.flaticon.com/512/732/732200.png",
    text1: "Email",
    text2: "sales@oliverfr.com"
  },
  {
    href: "tel:+12817839998",
    img: "https://cdn-icons-png.flaticon.com/512/126/126509.png",
    text1: "Phone",
    text2: "+1 281 783 9998"
  },
  {
    href: "https://linkedin.com/in/oliver-f-448b8a287",
    img: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    text1: "LinkedIn",
    text2: ""
  },
  {
    href: "https://web.skype.com/?openPstnPage=true",
    img: "Skype Logo.png",
    text1: "Skype",
    text2: ""
  },
  {
    href: "weixin://dl/chat?wxid=wxid_kesvxwp296ci12",
    img: "WeChat Logo.png",
    text1: "WeChat",
    text2: ""
  }
];

const carouselTrack = document.getElementById('carouselTrack');
let isPlaying = true; // by default, animation is on
let speed = 0.5;      // how many px per frame
let lastTimestamp = 0;
let nextItemIndex = 0;
let itemId = 0;

// Store all created items to position them
const itemsOnScreen = [];

// Create initial items for the carousel
for (let i = 0; i < 6; i++) {
  createItem();
}

// Function to create new items for the carousel
function createItem() {
  const data = modulesData[nextItemIndex];
  nextItemIndex = (nextItemIndex + 1) % modulesData.length;

  const newItem = document.createElement('a');
  newItem.className = 'carousel-item';
  newItem.href = data.href;
  newItem.target = '_self';
  
  const offsetX = (itemsOnScreen.length === 0) ? 0 : (itemsOnScreen[itemsOnScreen.length - 1].x + 300); 
  newItem.style.left = offsetX + 'px';

  newItem.innerHTML = `
    <img src="${data.img}" alt="${data.text1}" style="width:40px;height:40px;">
    <span>${data.text1}</span>
    <span>${data.text2}</span>
  `;

  const itemObj = {
    el: newItem,
    x: offsetX,
    width: 300,
    id: itemId++
  };

  itemsOnScreen.push(itemObj);
  carouselTrack.appendChild(newItem);
}

// Move all carousel items to the left
function animate(timestamp) {
  if (!isPlaying) {
    requestAnimationFrame(animate);
    return;
  }

  const delta = timestamp - lastTimestamp;
  lastTimestamp = timestamp;
  const moveDist = speed * (delta / 16.67); 

  for (let i = 0; i < itemsOnScreen.length; i++) {
    const item = itemsOnScreen[i];
    item.x -= moveDist; 
    item.el.style.left = item.x + 'px';
  }

  const lastItem = itemsOnScreen[itemsOnScreen.length - 1];
  if (lastItem.x + lastItem.width < (window.innerWidth + 300)) {
    createItem();
  }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

// Play/Pause button logic for the carousel
const playPauseBtn = document.getElementById('playPauseBtn');
playPauseBtn.addEventListener('click', () => {
  isPlaying = !isPlaying;
  playPauseBtn.textContent = isPlaying ? 'Pause' : 'Play';
});
