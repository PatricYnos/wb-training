export const cart = function () {
  const cartBtn = document.querySelector('.button-cart'),
    cart = document.querySelector('#modal-cart'),
    closeBtn = cart.querySelector('.modal-close');

  cartBtn.addEventListener('click', function () {
    cart.style.display = 'flex';
  });

  closeBtn.addEventListener('click', function () {
    cart.style.display = '';
  });
};