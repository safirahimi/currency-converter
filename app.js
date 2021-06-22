const selectLabelFrom = document.querySelector('#label-from');
const selectLabelTo = document.querySelector('#label-to');
const currenciesFrom = document.querySelector('.from');
const currenciesTo = document.querySelector('.to');
const currencyFrom = document.querySelectorAll('.currency-from');
const currencyTo = document.querySelectorAll('.currency-to');
const inputAmount = document.querySelector('#input-amount');
const computeBtn = document.querySelector('#btn');
const resultRight = document.querySelector('#result-right');
const secondResultRight = document.querySelector('#second-result-right');
const resultLeft = document.querySelector('#result-left');
const detailRight = document.querySelector('#detail-right');
const secondDetailRight = document.querySelector('#second-detail-right');
const detailLeft = document.querySelector('#detail-left');
const exchangeIcon = document.querySelector('#exchange-icon');
const filterFrom = document.querySelector('#search-from');
const filterTo = document.querySelector('#search-to');
const update = document.querySelector('#last-update');
const updateInfo = document.querySelector('#update-info');

let currencyFromId = '', currencyToId = '';

// Events
computeBtn.addEventListener('click', compute);
inputAmount.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    compute();
  }
});


selectLabelFrom.addEventListener('click', () => {
  currenciesFrom.classList.toggle('active');
});

selectLabelTo.addEventListener('click', () => {
  currenciesTo.classList.toggle('active');
});

// when the user click outside of currencies label
window.addEventListener('click', e => {
  const select1 = document.querySelector('.select-from-block');
  const select2 = document.querySelector('.select-to-block');
  if (!select1.contains(e.target)) {
    currenciesFrom.classList.remove('active');
  }
  if (!select2.contains(e.target)) {
    currenciesTo.classList.remove('active');
  }
});


currencyFrom.forEach(option => {
  option.addEventListener('click', () => {
    selectLabelFrom.innerHTML = option.innerHTML;
    currenciesFrom.classList.toggle('active');

    currencyFromId = option.id.toUpperCase();
  })
});

currencyTo.forEach(option => {
  option.addEventListener('click', () => {
    selectLabelTo.innerHTML = option.innerHTML;
    currenciesTo.classList.toggle('active');

    currencyToId = option.id.toUpperCase();
  })
});


function compute() {
  fetch(`https://v6.exchangerate-api.com/v6/12aef315c7b600395ce20f95/latest/${currencyFromId}`)
  .then(res => res.json())
  .then(res => {
    const new_rate = res.conversion_rates[currencyToId];

    resultLeft.innerHTML = `${inputAmount.value} ${currencyFromId} = `;
    resultRight.innerHTML = `${inputAmount.value * new_rate} `;
    secondResultRight.innerHTML = `${currencyToId}`

    detailLeft.innerHTML = `1 ${currencyFromId} = `;
    detailRight.innerHTML = `${new_rate} `;
    secondDetailRight.innerHTML = `${currencyToId}`

    updateInfo.innerHTML = 'Last Update : ';
    update.innerHTML = res.time_last_update_utc;
  })
};

exchangeIcon.addEventListener('click', () => {
  const temp1 = selectLabelFrom.innerHTML;
  selectLabelFrom.innerHTML = selectLabelTo.innerHTML;
  selectLabelTo.innerHTML = temp1;

  const temp2 = currencyFromId;
  currencyFromId = currencyToId;
  currencyToId = temp2;

  compute();
});


filterFrom.addEventListener('keyup', e => {
  const text = e.target.value.toLowerCase();
  
  currencyFrom.forEach(currency => {
    const item = currency.children[1].children[0].textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      currency.style.display = 'flex';
    } else {
      currency.style.display = 'none';
    }

    console.log(item);
    console.log(item.toLowerCase().indexOf(text));
  });
});

filterTo.addEventListener('keyup', e => {
  const text = e.target.value.toLowerCase();
  
  currencyTo.forEach(currency => {
    const item = currency.children[1].children[0].textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      currency.style.display = 'flex';
    } else {
      currency.style.display = 'none';
    }
  });
});