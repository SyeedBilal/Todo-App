const inputbox = document.getElementById("inputbox");
const listcontainer = document.getElementById("list-container");
const btn = document.getElementById('btn');
const categorySelect = document.getElementById('select-category');


const button=document.querySelector('btn');

// Add new task on button click
btn.addEventListener('click', (event) => {
    if (inputbox.value === '') {
        alert("You must write something");
    } else {
        const radiovalue = document.querySelector('input[name="priority"]:checked');
        if (radiovalue) {
            createTask(inputbox.value, categorySelect.value, radiovalue.value);
        } else {
            alert('Please select a priority');
        }
    }
    inputbox.value = '';  // Clear the input field after adding the task
    saveData();  // Save the current state
});

// Function to create a new task
function createTask(taskText, category, priority) {
    // Create the task (li) element
    const li = document.createElement('li');
    li.innerHTML = taskText;

    // Apply color based on priority
    if (priority === 'easy') {
        li.style.color = 'green';
    } else if (priority === 'medium') {
        li.style.color = 'yellow';
    } else if (priority === 'hard') {
        li.style.color = 'red';
    }

    // Create the remove (span) button
    const span = document.createElement('span');
    span.innerHTML = "\u00d7";  // Cross icon
    li.appendChild(span);
    span.classList.add('cross');

    // Append task to the corresponding category div

    const categorybtn=document.createElement('button');

if(category==='Work'){
    categorybtn.innerHTML='Work';

}
else if(category==='Personal'){
    categorybtn.innerHTML='Personal';

}
else{
    categorybtn.innerHTML='School';
}
categorybtn.classList.add('gradient-btn');

li.appendChild(categorybtn);
    
  listcontainer.appendChild(li);
    


    // Add click event to remove the task when clicking the cross
    span.addEventListener('click', () => {
        li.remove();
        saveData();  // Update localStorage after removal
    });

    // Toggle 'checked' class on clicking the task itself
    li.addEventListener('click', () => {
        li.classList.toggle('checked');
        saveData();  // Update localStorage after toggle
    });
}

// Save list to localStorage
function saveData() {
    const tasks=listcontainer.innerHTML;

    // Save current list state for each category
    localStorage.setItem('workData', tasks);
   
}

// Load tasks from localStorage
function showTask() {
    workDiv.innerHTML = localStorage.getItem('workData') || '';  // Load saved data for Work
      // Load saved data for Personal
    attachListeners();  // Reattach event listeners to the existing tasks
}

// Reattach event listeners after page reload
function attachListeners() {
    const listcontainer = listcontainer.querySelectorAll('li');
  
    // Attach listeners to work items
    listcontainer.forEach((li) => {
        const span = li.querySelector('span');
        span.addEventListener('click', () => {
            li.remove();
            saveData();
        });
        li.addEventListener('click', () => {
            li.classList.toggle('checked');
            saveData();
        });
    });


}

// Show tasks when the page loads
showTask();
