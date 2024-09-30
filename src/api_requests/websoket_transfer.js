import {message} from "antd";

let ws // будущий объект класса Websocket
export function createWebSocket(initiator, onMessage) {
    // initiator - имя текущего пользователя, который инициирует соединение
    // onMessage - функция, которая добавляет входящие сообщения в список сообщений
    // return: ws
    // создание объекта Websocket
    // подключаемся к url адресу сервера, на котором стоит обработчик вебсокетов
    ws = new WebSocket(`ws://localhost:8000/chat/ws?client_username=${initiator}`);

    //методы для прослушивания событий класса Websocket
    // При принятии ответного рукопожатия от сервера
    ws.onopen = () => {
        message.success('WebSocket соединение установлено')
    }
    // Получены данные с сервера
    ws.onmessage = (e) => {
        const message = JSON.parse(e.data); // Извлекаем данные
        const standardmessage = {username_sender: message.client_username, text_message: message.message, message_at: new Date().toISOString()}
        console.log(message)
        onMessage(standardmessage) // добавляем эти данные в список
    }
    // Соединение закрыто
    ws.onclose = () => {
        message.info('Соединение разорвано')
    }
    // Ошибка возникшая при работе вебсокета
    ws.onerror = (e) => {
        message.error('Какая-то ошибка', e)
    }

    return ws
}

// Отправка данных (сообщений) серверу
export function sendMessage(message,initiator,destUsername, chatID) {
    // message - текст сообщения
    // initiator - имя того кто отправляет сообщенией. Обычно текущий пользователь
    // destUsername - имя пользователя, кому адресуется сообщение
    // chatID - идентификатор чата, в котором было отправлено сообщение
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({message,client_username: initiator, chat_id: chatID, dest_username: destUsername}));
    }
}