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