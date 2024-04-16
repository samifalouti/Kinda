const products = [
  { name: 'عباية أفغان جاني بوركا', price: '9000 DA', image: './images/item1.png' },
  { name: 'بورخا بالحجاب', price: '13000 DA', image: './images/item2.png' },
  { name: 'عباية كرزية برخا', price: '20000 DA', image: './images/item3.png' },
  { name: 'Product 4', price: '4500 DA', image: './images/item1.png' },
  { name: 'Product 5', price: '9000 DA', image: './images/item2.png' },
  { name: 'Product 6', price: '22000 DA', image: './images/item3.png' },
  { name: 'Product 7', price: '7400 DA', image: './images/item1.png' },
  { name: 'Product 8', price: '4500 DA', image: './images/item2.png' },
  { name: 'Product 9', price: '22000 DA', image: './images/item3.png' },
  { name: 'Product 10', price: '13000 DA', image: './images/item1.png' },
  { name: 'Product 11', price: '9000 DA', image: './images/item2.png' },
  { name: 'Product 12', price: '7400 DA', image: './images/item3.png' }
];

const carousel = document.getElementById('carousel');
const overlay = document.getElementById('overlay');

const menuIcon = document.getElementById('menu-icon');
menuIcon.addEventListener('click', () => {
  overlay.style.width = overlay.style.width === '190px' ? '0' : '190px';
});

window.addEventListener('click', (event) => {
  if (event.target !== overlay && event.target !== menuIcon) {
    overlay.style.width = '0';
  }
});

function createCard(product) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.productId = product.name;

  const img = document.createElement('img');
  img.src = product.image;
  img.alt = product.name;

  const price = document.createElement('div');
  price.classList.add('price');
  price.textContent = product.price;

  const title = document.createElement('div');
  title.classList.add('title');
  title.textContent = product.name;

  const frame = document.createElement('div');
  frame.classList.add('frame');

  frame.addEventListener('click', (event) => {
    event.stopPropagation();
    const modal = document.getElementById('myModal');
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h2>${product.name}</h2>
      <p>${product.price}</p>
    `;
    modal.style.display = 'block';
  });

  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(price);
  card.appendChild(frame);

  return card;
}

function createCardContainer() {
  const container = document.createElement('div');
  container.classList.add('card-container');
  return container;
}

const productGroups = products.reduce((acc, product) => {
  const groupIndex = Math.floor(acc.length / 3);
  if (!acc[groupIndex]) {
    acc[groupIndex] = [];
  }
  acc[groupIndex].push(product);
  return acc;
}, []);

productGroups.forEach(group => {
  const cardContainer = createCardContainer();
  group.forEach(product => {
    const card = createCard(product);
    cardContainer.appendChild(card);
  });
  carousel.appendChild(cardContainer);
});

fullNameInput.addEventListener('input', validateForm);
numberInput.addEventListener('input', validateForm);
productOptions.addEventListener('change', validateForm);

document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('myModal');
  const modalContent = document.querySelector('.modal-content');
  const span = document.getElementsByClassName('close')[0];

  function openModal(productName) {
    const product = products.find(product => product.name === productName);
    if (product) {
      const modalImage = document.getElementById('modal-image');
      modalImage.src = product.image;
      modalImage.alt = product.name;

      const modalTitle = document.getElementById('modal-title');
      modalTitle.textContent = product.name;

      const modalPrice = document.getElementById('modal-price');
      modalPrice.textContent = product.price;

      const titleInput = document.getElementById('titleInput');
      const priceInput = document.getElementById('priceInput');
      titleInput.value = product.name;
      priceInput.value = product.price;

      modal.style.display = 'block';
    } else {
      console.error(`Product with name "${productName}" not found.`);
    }
  }

  function closeModal() {
    modal.style.display = 'none';
  }

  span.onclick = closeModal;

  window.onclick = function (event) {
    if (event.target == modal) {
      closeModal();
    }
  };

  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const productName = card.dataset.productId;
      openModal(productName);
    });
  });

  modalContent.addEventListener('click', function (event) {
    event.stopPropagation();
  });
});

function validateForm() {
  if (fullNameInput.value.trim() !== '' && numberInput.value.trim() !== '' && productOptions.value.trim() !== '') {
      sendButton.disabled = true;
      sendButton.style.opacity = 1;
  }
}
