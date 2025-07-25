document.getElementById('jwtForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('jwtInput').value.trim();
    const resultDiv = document.getElementById('jwtResult');
    resultDiv.innerHTML = '';

    function base64UrlDecode(str) {
        // Преобразуем из base64url в base64
        str = str.replace(/-/g, '+').replace(/_/g, '/');
        // Добавляем недостающие =
        while (str.length % 4) str += '=';
        try {
            return decodeURIComponent(escape(window.atob(str)));
        } catch (e) {
            return null;
        }
    }

    const parts = input.split('.');
    if (parts.length !== 3) {
        resultDiv.innerHTML = '<span style="color:red">Некорректный формат токена (ожидается 3 части, разделённые ".")</span>';
        return;
    }
    const [headerB64, payloadB64, signatureB64] = parts;
    const payloadStr = base64UrlDecode(payloadB64);
    if (!payloadStr) {
        resultDiv.innerHTML = '<span style="color:red">Не удалось декодировать payload</span>';
        return;
    }
    let payload;
    try {
        payload = JSON.parse(payloadStr);
    } catch (e) {
        resultDiv.innerHTML = '<span style="color:red">Payload не является валидным JSON</span>';
        return;
    }
    let html = '<h3>Payload:</h3><pre>' + JSON.stringify(payload, null, 2) + '</pre>';
    // Проверка срока действия
    if (payload.exp) {
        const now = Math.floor(Date.now() / 1000);
        html += '<p><b>exp:</b> ' + payload.exp + ' (' + new Date(payload.exp * 1000).toLocaleString() + ')</p>';
        if (now > payload.exp) {
            html += '<span style="color:red">Внимание: токен истёк!</span>';
        } else {
            html += '<span style="color:green">Токен действителен</span>';
        }
    } else {
        html += '<p><b>exp</b> не найден в payload (срок действия не указан)</p>';
    }
    resultDiv.innerHTML = html;
});

const tasks = [
    {
        text: '1. Сколько частей содержит стандартный JWT-токен? Введите число.',
        check: answer => answer.trim() === '3',
        hint: 'JWT состоит из header, payload и signature.'
    },
    // Заглушки для следующих заданий
    ...Array(14).fill({
        text: 'Следующее задание будет добавлено позже.',
        check: () => false,
        hint: ''
    })
];

let currentTask = 0;

function showTask() {
    document.getElementById('taskNumber').innerHTML = `<b>Задание ${currentTask + 1} из 15</b>`;
    document.getElementById('taskText').innerText = tasks[currentTask].text;
    document.getElementById('answerInput').value = '';
    document.getElementById('result').innerHTML = '';
}

showTask();

document.getElementById('answerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const answer = document.getElementById('answerInput').value;
    const resultDiv = document.getElementById('result');
    if (tasks[currentTask].check(answer)) {
        if (currentTask < tasks.length - 1) {
            currentTask++;
            showTask();
        } else {
            resultDiv.innerHTML = '<span style="color:green">Поздравляем! Все задания выполнены.</span>';
            document.getElementById('answerForm').style.display = 'none';
        }
    } else {
        resultDiv.innerHTML = `<span style="color:red">Ответ неверный. Подсказка: ${tasks[currentTask].hint}</span>`;
    }
}); 