const result = document.querySelector('#result');
const btn = document.querySelector('.j-btn-test');

btn.addEventListener('click', () => {
  let res = 'Ширина окна';
  // console.log(window.screen.width, window.screen.height, window.innerWidth, window.innerHeight );
  window.alert('Ширина экрана: '+ window.screen.width + '\nВысота экрана: ' + window.screen.height + '\nШирина окна с прокруткой: ' + window.innerWidth + '\nВысота окна с прокруткой: ' + window.innerHeight  + '\nШирина окна без прокрутки: ' + document.documentElement.clientWidth + '\nВысота окна Без прокрутки: ' + document.documentElement.clientHeight);
  
});