export const cart = function () {
  const cartBtn = document.querySelector('.button-cart'),
    cart = document.querySelector('#modal-cart'),
    closeBtn = cart.querySelector('.modal-close'),
    goodsContainer = document.querySelector('.long-goods-list'),
    cardTable = document.querySelector('.cart-table__goods');

  const plusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart')),
      newCart = cart.map(good => {
        if (good.id === id) {
          good.count++;
        }
        return good;
      });
    localStorage.setItem('cart', JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem('cart')));
  };

  const minusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart')),
      newCart = cart.map(good => {
        if (good.id === id) {
          good.count <= 1 ? good.count = 1 : good.count--;
        }
        return good;
      });
    localStorage.setItem('cart', JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem('cart')));
  };

  const deleteCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart')),
      newCart = cart.filter(good => good.id !== id);
    localStorage.setItem('cart', JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem('cart')));
  };

  const addToCart = (goodId) => {
    const goods = JSON.parse(localStorage.getItem('data')),
      clickedGood = goods.find(good => good.id === goodId),
      cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    if (cart.some(good => good.id === clickedGood.id)) {
      cart.map(good => {
        if (good.id === clickedGood.id) {
          good.count++;
        }
        return good;
      });
    } else {
      clickedGood.count = 1;
      cart.push(clickedGood);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const renderCartGoods = (cartArray) => {
    const totalElem = document.querySelector('.card-table__total');
    let total = 0;
    cardTable.innerHTML = '';
    cartArray.forEach(element => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${element.name}</td>
        <td>${element.price}</td>
        <td><button class="cart-btn-minus"">-</button></td>
        <td>${element.count}</td>
        <td><button class=" cart-btn-plus"">+</button></td>
        <td>${(+element.count * +element.price).toFixed(2)}$</td>
        <td><button class="cart-btn-delete"">x</button></td>
      `;
      total += +(+element.count * +element.price).toFixed(2);
      cardTable.append(tr);
      tr.addEventListener('click', (e) => {
        const trg = e.target;
        if (trg.classList.contains('cart-btn-plus')) {
          plusCartItem(element.id);
        } else if (trg.classList.contains('cart-btn-minus')) {
          minusCartItem(element.id);
        } else if (trg.classList.contains('cart-btn-delete')) {
          deleteCartItem(element.id);
        }
      });
    });
    totalElem.innerHTML = `${total}$`;
  };

  cartBtn.addEventListener('click', function () {
    const cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    renderCartGoods(cartArray);
    cart.style.display = 'flex';
  });

  closeBtn.addEventListener('click', function () {
    cart.style.display = '';
  });

  if (goodsContainer) {
    goodsContainer.addEventListener('click', (e) => {
      const buttonToCart = e.target.closest('.add-to-cart');
      if (buttonToCart) {
        const goodId = buttonToCart.dataset.id;
        addToCart(goodId);
      }
    });
  }
};