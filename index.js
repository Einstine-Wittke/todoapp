
function addnewlist() {
    document.getElementById("container").style.visibility = "visible"
    document.querySelector(".Container1").style.filter = "blur(18px)";

}

function close1() {
    document.getElementById("container").style.visibility = "hidden"
    document.querySelector(".Container1").style.filter = "none";

}
// -----

const createListTitle = document.querySelector("#list_title");
const createList = document.querySelector("#create_list");
const listContainer = document.querySelector("#list_container");

let taskList = [];

createList.onclick = () => {
    let userData = createListTitle.value;

    const listBox = {
        id: Date.now(),
        name: userData,
        subtask:[]
    }
    taskList.push(listBox);
    addList();
    createNewTask();
    document.getElementById("container").style.visibility = "hidden";
    createListTitle.value = "";
    document.querySelector(".Container1").style.filter = "none";
    document.querySelector(".no").style.display = "none";

}

function addList() {
    let listTag = "";
    taskList.forEach(unit => {
        listTag += `
        <div class="list-box" id="${unit.id}">
            <p class="list-heading">
                <span>${unit.name}</span>
            </p>
            <hr>
            <ul class="items-container" id="${'id' + unit.id}"></ul>
            <span class="list-tools">
                <span onclick="newTask(${unit.id})">
                    <img src ="./plus.png" alt="" class="IMAGE"/>
                </span>
                <span onclick="deleteList(${unit.id})">
                    <i class="fas fa-trash-alt"></i>
                </span>
            </span>
        </div>`;
    });
    listContainer.innerHTML = listTag;
    //add new lists inside the container
}

function deleteList(id) {
    taskList.forEach((unit, index) => {
        if (unit.id === id) {
            taskList.splice(index, 1);
        }
    });
    addList();
    createNewTask();
}

// ------
function newTask(id) {
    console.log(id);
    taskList.forEach(unit=>{
        if(unit.id===id){
            document.getElementById("task-popup").style.visibility = "visible";
            document.querySelector(".Container1").style.filter = "blur(15px)";
            const taskTitle=document.querySelector("#task_title");
            const createTask=document.querySelector("#create_task");

            createTask.onclick=()=>{
                let userTask=taskTitle.value;
                taskList.forEach((unit,index)=>{
                   if(unit.id===id){
                    const task={
                        taskId:Date.now(),
                        taskName:userTask
                    }
                    taskList[index].subtask.push(task);
                   }
                })
                taskTitle.value="";
                createNewTask();
                document.querySelector(".Container1").style.filter = "none";
                document.getElementById("task-popup").style.visibility = "hidden";
            }
        }
    })
}
function close2() {
    document.querySelector(".Container1").style.filter = "none";
    document.getElementById("task-popup").style.visibility = "hidden";
}


function createNewTask() {
    taskList.forEach(unit => {
        let taskContainer = document.getElementById('id' + unit.id);
        let newTaskTag = '';
        unit.subtask.forEach(task => {
            newTaskTag += `
            <li>
                <span class="task-name" id="${'tid' + task.taskId}">${task.taskName}</span>
                <i class="fas fa-check" id="${'iid' + task.taskId}" onclick=strikeOff(${task.taskId})></i>
            </li>`;
        })   
        taskContainer.innerHTML = newTaskTag;
    })
}

    function strikeOff(id) {
    taskList.forEach(unit => {
        
        unit.subtask.forEach(task => {
            if(task.taskId === id) {
                document.getElementById('tid' + task.taskId).style.textDecoration = "line-through 2px black";
                document.getElementById('iid' + task.taskId).style.visibility = "hidden";
            }
        })
    });
}