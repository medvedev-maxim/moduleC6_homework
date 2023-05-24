const wsUri = "wss://echo-ws-service.herokuapp.com";

const input = document.querySelector('.input');
const btnSend = document.querySelector('.j-btn-send');
const btnGeo = document.querySelector('.j-btn-geo');
const board = document.querySelector('#message_board');

let websocket = null;

// Функция проверки типа ответа от сервера для выборочного вывода в чат
function geoInJson(strData) {
    try {
        if (JSON.parse(strData).type == 'geo'){
          return true;
        }
    } catch (e) {
        return false;
    }
}

function webConnect() {
  return new Promise(resolve => {
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) {
      writeToScreen(3, "CONNECTED");
      resolve('success');
    }
    websocket.onclose = function(evt) {
      writeToScreen(3, "DISCONNECTED");
      websocket = null;
    };
    websocket.onmessage = function(evt) {
      // console.log(evt.data);
      if(!geoInJson(evt.data)){
        writeToScreen(2, evt.data);        
      }
    };
    websocket.onerror = function(evt) {
      writeToScreen(3, "ERROR" + evt.data);
    };
  });
}

async function request (send) {
  if(websocket == null){
      await webConnect();
    }
  // console.log(websocket);  
  websocket.send(send);
}

function writeToScreen(mode, message) {
  let post = document.createElement("p");
  post.classList.add('message')
  if(mode == 1){
    post.classList.add('client');
  } else if (mode == 2){
    post.classList.add('server');
  } else if (mode == 3){
    post.classList.add('system');
  }
  post.innerHTML = message;
  board.appendChild(post);
}

btnGeo.addEventListener('click', () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
      // console.log(latitude, longitude);
      
      //Отправка данных на сервер согласно заданию
      request(`{"latitude":"${latitude}","longitude":"${longitude}","type":"geo"}`);
      
      //Вывод ссылки в чате
      writeToScreen(1, `<a target="_blank" href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}">Гео-локация</a>`);
      },() => {writeToScreen(1,'Недоступна')}
    );
  } else {
    writeToScreen(1, 'Не поддерживается браузером');
  }

});

btnSend.addEventListener('click', async () => {
  await request(input.value);
  writeToScreen(1, input.value);
});