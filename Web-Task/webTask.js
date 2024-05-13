document.addEventListener('DOMContentLoaded', function () {
    const addBtn = document.getElementById('addBtn');
    const saveBtn = document.getElementById('saveBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const popup = document.querySelector('.popup');
    const popupSummaryInput = document.getElementById('summary');
    const popupDescriptionInput = document.getElementById('description');
    const popupDueDateInput = document.getElementById('due-date');
    const incompleteTasks = document.querySelector('.todo-incomplete');
    const task = document.querySelector('.task');

    const completedTasks = document.querySelector('.completedTask');
    const locationBtn = document.querySelector('.location');
    const logOutBtn = document.querySelector('.logOut')
    const mainContainer = document.querySelector('.main-container');
    const reminderContainer = document.querySelector('#reminder-popup-id');
    const skipBtn = document.querySelector('#skip-btn');
    const remindLaterBtn = document.querySelector('#remind-later-btn');



    const dateTime = function (newDate) {
        //    const date = new Date();
        const writtenDate = new Date(newDate);
        const dateFormat = `${writtenDate.getHours()}, ${writtenDate.getMinutes()}, ${writtenDate.getDate()}, ${writtenDate.getMonth()}, ${writtenDate.getFullYear()}`;
        const day = writtenDate.getDate();
        const month = writtenDate.toLocaleString('en-US', {
            month: 'long',
        });
        const hours = writtenDate.getHours();
        const minutes = writtenDate.getMinutes();

        const dateTimeIS = `⏰ ${day} ${month}, ${hours}:${minutes}`;
        return [dateTimeIS, dateFormat];
    }

    // Reminder function 

    const checkReminderTime = function () {
        const d = new Date();
        const dateFormat = `${d.getHours()}, ${d.getMinutes()}, ${d.getDate()}, ${d.getMonth()}, ${d.getFullYear()}`;
        const taskContainerDivs = document.querySelectorAll('.taskContainer');

        if (taskContainerDivs.length > 0) {
            taskContainerDivs.forEach(() => {
                const currlabel = document.querySelector('label.hide-label').textContent;
                //    console.log(currlabel,dateFormat)
                if (currlabel === dateFormat) {
                    const summary1 = document.querySelector('.summ').textContent;
                    const description1 = document.querySelector('.des').textContent;
                    showReminder(summary1, description1);
                }

            })
        }

    }
    setInterval(checkReminderTime, 50000)

    const showReminder = function (popupSummaryInput, popupDescriptionInput) {
        reminderContainer.classList.remove('reminder-popup-hide');
        document.getElementById('reminder-summary').textContent = popupSummaryInput;
        document.getElementById('reminder-descrip').textContent = popupDescriptionInput;

    }

    const updateLocalStorage = function () {
        localStorage.setItem('IncompletedTask', incompleteTasks.innerHTML);
        localStorage.setItem('CompletedTask', completedTasks.innerHTML);
    }


    locationBtn.addEventListener('click', function () { 
        window.location.href = '../Location page/location.html'
    })

    logOutBtn.addEventListener('click', function () {
        window.location.href = '../Login page/index.html'
    })

    skipBtn.addEventListener('click', function () {
        reminderContainer.classList.add('reminder-popup-hide');
    })

    remindLaterBtn.addEventListener('click', function () {
        reminderContainer.classList.add('reminder-popup-hide');
    })


    // Function to toggle popup display
    function togglePopup() {
        popup.classList.toggle('display-none');
    }

    // Event listener for addBtn to toggle popup display
    addBtn.addEventListener('click', function () {
        togglePopup();
        mainContainer.classList.add('bgColor');
    });


    // Event listener for cancelBtn to hide the popup
    cancelBtn.addEventListener('click', function () {
        // Clearing input fields
        popupSummaryInput.value = '';
        popupDescriptionInput.value = '';
        popupDueDateInput.value = '';
        togglePopup();
        mainContainer.classList.remove('bgColor');
    });

    // Event listener for saveBtn to add a new task
    saveBtn.addEventListener('click', function () {
        // Getting values from inputs
        const summary = popupSummaryInput.value;
        const description = popupDescriptionInput.value;
        const dueDate = popupDueDateInput.value;
        const currentDate = dateTime(dueDate)[0];
        const formatDate = dateTime(dueDate)[1];

        // Creating new task HTML
        const taskHTML = `
            <div class="taskContainer">
                <div class="checkBox">
                    <input type="checkbox" class="taskCheckbox">
                </div>
                <div class="task-category">
                    <p class="summ">${summary}</p>
                    <p class="currentDatep">${currentDate} </p>
                    <label class="hide-label">${formatDate}</label>
                    <label class="hide-label des">${description}</label>
                    
                </div>
            </div>
        `;

        // Appending the new task HTML to incompleteTasks at the beginning
        incompleteTasks.insertAdjacentHTML('afterbegin', taskHTML);

        // Clearing input fields
        popupSummaryInput.value = '';
        popupDescriptionInput.value = '';
        popupDueDateInput.value = '';

        togglePopup();
        mainContainer.classList.remove('bgColor');
        updateLocalStorage()
    });



    // Event listener for checkbox change
    document.addEventListener('change', function (event) {
        if (event.target.classList.contains('taskCheckbox')) {
            const taskContainer = event.target.closest('.taskContainer');
            const parent = taskContainer.parentNode;
            if (parent.classList.contains('todo-incomplete')) {
                // Move task to completed tasks section
                const img = document.createElement('img');
                img.src = 'Unchecked.svg';
                img.alt = 'Checked';
                const imgTask = document.createElement('div');
                imgTask.classList.add('imgTask')
                imgTask.appendChild(img);

                taskContainer.querySelector('.checkBox').innerHTML = '';
                taskContainer.querySelector('.checkBox').appendChild(imgTask);

                completedTasks.appendChild(taskContainer);
                const taskCategory = taskContainer.querySelector('.task-category');
                const dateAndTime = taskCategory.querySelector('.currentDatep');
                taskCategory.removeChild(dateAndTime);
                updateLocalStorage()
            } else {
                // event.target.checked = true;
            }
        }
        completedTasks.style.display = 'block';
    });

    window.onload = () => {
        const incompletedTask = localStorage.getItem('IncompletedTask');
        const completedTask = localStorage.getItem('CompletedTask');

        if (incompletedTask) incompleteTasks.innerHTML = incompletedTask;
        if (completedTask) completedTasks.innerHTML = completedTask;
    }


});




