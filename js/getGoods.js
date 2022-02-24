const getGoods = () => {
  fetch('https://glo-wb-38b0a-default-rtdb.firebaseio.com/db.json')
    .then(res => res.json())
    .then(data => console.log(data));
};
getGoods();