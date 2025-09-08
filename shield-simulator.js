// Project Shield Lite - Упрощенный симулятор устойчивости проектов
let tasks = [];

function addTask() {
    const container = document.getElementById('tasks-container');
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    taskItem.innerHTML = `
        <input type="text" class="task-name" value="Новая задача" placeholder="Название задачи">
        <input type="number" class="task-duration" value="5" min="1" max="30" placeholder="Дней">
        <select class="task-risk">
            <option value="low">Низкий риск</option>
            <option value="medium" selected>Средний риск</option>
            <option value="high">Выский риск</option>
        </select>
        <button onclick="removeTask(this)" class="remove-btn">✕</button>
    `;
    container.appendChild(taskItem);
}

function removeTask(button) {
    button.parentElement.remove();
}

function runSimulation() {
    const statusEl = document.getElementById('status');
    statusEl.textContent = 'Анализ проекта...';
    statusEl.className = 'status loading';
    statusEl.style.display = 'block';
    
    // Собираем данные проекта
    const projectName = document.getElementById('projectName').value || 'Мой проект';
    const taskElements = document.querySelectorAll('.task-item');
    
    tasks = [];
    taskElements.forEach(taskEl => {
        const name = taskEl.querySelector('.task-name').value || 'Без названия';
        const duration = parseInt(taskEl.querySelector('.task-duration').value) || 5;
        const risk = taskEl.querySelector('.task-risk').value;
        
        tasks.push({
            id: tasks.length + 1,
            name: name,
            duration: duration,
            risk: risk,
            start: tasks.length > 0 ? tasks[tasks.length - 1].end : 0,
            end: tasks.length > 0 ? tasks[tasks.length - 1].end + duration : duration
        });
    });
    
    // Если нет задач, добавляем демо-данные
    if (tasks.length === 0) {
        tasks = [
            { id: 1, name: 'Задача 1', duration: 5, risk: 'medium', start: 0, end: 5 },
            { id: 2, name: 'Задача 2', duration: 7, risk: 'high', start: 5, end: 12 },
            { id: 3, name: 'Задача 3', duration: 4, risk: 'low', start: 12, end: 16 }
        ];
    }
    
    // Запускаем симуляцию (упрощенная версия квантово-вдохновленного анализа)
    setTimeout(() => {
        simulateProjectResilience();
        statusEl.textContent = 'Анализ завершен!';
        statusEl.className = 'status success';
        
        // Показываем результаты
        document.getElementById('results').style.display = 'block';
        window.scrollTo(0, document.body.scrollHeight);
    }, 1200);
}

function simulateProjectResilience() {
    // Определяем выбранные риски
    const selectedRisks = [];
    if (document.getElementById('risk-supply').checked) selectedRisks.push('supply');
    if (document.getElementById('risk-staff').checked) selectedRisks.push('staff');
    if (document.getElementById('risk-tech').checked) selectedRisks.push('tech');
    if (document.getElementById('risk-market').checked) selectedRisks.push('market');
    if (document.getElementById('risk-weather').checked) selectedRisks.push('weather');
    
    // Базовые параметры
    const totalDuration = tasks[tasks.length - 1].end;
    let criticalTasks = 0;
    const riskFactors = {
        'low': 0.2,
        'medium': 0.5,
        'high': 0.8
    };
    
    // Анализ устойчивости (упрощенная версия квантово-вдохновленного алгоритма)
    let totalRiskImpact = 0;
    let highRiskTasks = 0;
    
    tasks.forEach(task => {
        const riskFactor = riskFactors[task.risk];
        const riskImpact = riskFactor * (selectedRisks.length / 5) * task.duration;
        totalRiskImpact += riskImpact;
        
        if (task.risk === 'high') highRiskTasks++;
        if (task.risk === 'high' && selectedRisks.length > 0) criticalTasks++;
    });
    
    // Рассчитываем метрики
    const resilienceScore = Math.max(0, Math.min(100, 100 - (totalRiskImpact / totalDuration * 30)));
    const onTimeProbability = Math.max(0, Math.min(100, 100 - (totalRiskImpact / totalDuration * 40)));
    
    // Обновляем интерфейс
    document.getElementById('resilience-score').textContent = Math.round(resilienceScore) + '%';
    document.getElementById('resilience-bar').style.width = Math.round(resilienceScore) + '%';
    document.getElementById('resilience-bar').style.backgroundColor = 
        resilienceScore > 70 ? '#4caf50' : resilienceScore > 40 ? '#ff9800' : '#f44336';
    
    document.getElementById('on-time').textContent = Math.round(onTimeProbability) + '%';
    document.getElementById('critical-tasks').textContent = criticalTasks;
    
    // Генерируем диаграмму Ганта
    renderGanttChart();
    
    // Генерируем рекомендации
    generateRecommendations(resilienceScore, criticalTasks, highRiskTasks);
}

function renderGanttChart() {
    const chartContainer = document.getElementById('gantt-chart');
    chartContainer.innerHTML = '';
    
    const totalDuration = tasks[tasks.length - 1].end;
    const chartWidth = chartContainer.clientWidth;
    
    // Создаем шкалу времени
    const timeline = document.createElement('div');
    timeline.className = 'gantt-timeline';
    
    for (let i = 0; i <= totalDuration; i += Math.max(1, Math.floor(totalDuration / 10))) {
        const marker = document.createElement('div');
        marker.className = 'timeline-marker';
        marker.style.left = `${(i / totalDuration) * 100}%`;
        marker.innerHTML = `<span>${i}</span>`;
        timeline.appendChild(marker);
    }
    
    chartContainer.appendChild(timeline);
    
    // Добавляем задачи
    tasks.forEach(task => {
        const taskEl = document.createElement('div');
        taskEl.className = `gantt-task task-risk-${task.risk}`;
        
        const startPercent = (task.start / totalDuration) * 100;
        const durationPercent = (task.duration / totalDuration) * 100;
        
        taskEl.style.left = `${startPercent}%`;
        taskEl.style.width = `${durationPercent}%`;
        
        taskEl.innerHTML = `
            <div class="task-label">${task.name}</div>
            <div class="task-duration">${task.duration} дн</div>
        `;
        
        chartContainer.appendChild(taskEl);
    });
}

function generateRecommendations(resilienceScore, criticalTasks, highRiskTasks) {
    const list = document.getElementById('recommendations-list');
    list.innerHTML = '';
    
    // Рекомендации на основе устойчивости
    if (resilienceScore < 40) {
        list.innerHTML += `<li>⚠️ Критически низкий уровень устойчивости. Рассмотрите возможность увеличения буферного времени на 30-50% для всех задач.</li>`;
        list.innerHTML += `<li>⚠️ Срочно перераспределите ресурсы с низкорисковых задач на критические элементы проекта.</li>`;
    } else if (resilienceScore < 70) {
        list.innerHTML += `<li>⚠️ Умеренный уровень устойчивости. Добавьте буферное время на 15-25% для задач с высоким риском.</li>`;
        list.innerHTML += `<li>⚠️ Рассмотрите возможность дублирования ключевых ресурсов для ${criticalTasks} критических задач.</li>`;
    } else {
        list.innerHTML += `<li>✅ Высокий уровень устойчивости! Поддерживайте текущую стратегию управления рисками.</li>`;
    }
    
    // Рекомендации на основе критических задач
    if (criticalTasks > 0) {
        list.innerHTML += `<li>⚠️ У вас есть ${criticalTasks} критически уязвимых задач. Рассмотрите альтернативные пути выполнения этих задач.</li>`;
    }
    
    // Рекомендации по конкретным рискам
    if (document.getElementById('risk-supply').checked) {
        list.innerHTML += `<li>💡 Для снижения рисков поставок: ищите альтернативных поставщиков или создайте небольшой запас материалов.</li>`;
    }
    
    if (document.getElementById('risk-staff').checked) {
        list.innerHTML += `<li>💡 Для снижения кадровых рисков: внедрите кросс-обучение сотрудников для ${Math.min(2, highRiskTasks)} ключевых задач.</li>`;
    }
    
    if (document.getElementById('risk-tech').checked) {
        list.innerHTML += `<li>💡 Для снижения технических рисков: проведите технический спринт перед началом критических задач.</li>`;
    }
    
    // Общая рекомендация
    list.innerHTML += `<li>💡 Регулярно обновляйте этот анализ (раз в 2 недели) для отслеживания изменений в устойчивости проекта.</li>`;
}

function generatePDF() {
    alert('В реальной версии здесь будет генерация PDF.\n\nДля полноценной версии с генерацией PDF добавьте библиотеку jsPDF в проект.');
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем одну задачу по умолчанию при загрузке
    if (document.querySelectorAll('.task-item').length === 0) {
        addTask();
    }
});
