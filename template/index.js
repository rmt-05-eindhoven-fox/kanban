const baseUrl = "http://localhost:3000";

$(document).ready(() => {
    initScreen()
})

$("#register").click(function () {
    initRegister()
})

$("#login").click(function () {
    initLogin()
})

function logout() {
    var auth2 = gapi.auth2.getAuthInstance();
    localStorage.clear("token");
    initScreen()
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

function initScreen() {
    if(localStorage.getItem("token")){
        screen("organization")
    }else{
        initLogin()
    }    
}

function initLogin() {
    screen("login")   
}

function initRegister() {
    screen("register")
}

function initTask(organizationId) {
    $("#task_organization_id").val(organizationId)
    screen("task")    
}

function screen(mode) {
    $("#form-register,#form-login,#home,#register-login,#section-organization,#section-task").hide()
    if(mode==="login"){
        $("#register-login").show()
        $("#form-login").show()        
    }else if(mode==="register"){
        $("#register-login").show()        
        $("#form-register").show()        
    }else if(mode==="organization"){
        $("#home,#section-organization").show()           
        listOrganization()
    }else if(mode==="task"){
        $("#home,#section-task").show()
        getTaskList()
    }
}

function login() {
    let email = $("#login-email").val()
    let password = $("#login-password").val()

    $.ajax(`${baseUrl}/users/login`, {
        type: 'POST',
        data: {
	        email:email,
	        password:password
        },
        success: function (data) {
            localStorage.setItem("token", data.token)
            initScreen()
        },
        error: function (error) {
            showErrorMessage(error)
        }
    });
}

function register(){
    let email = $("#register-email").val()
    let password = $("#register-password").val()
    
    $.ajax(`${baseUrl}/users/register`, {
        type: 'POST',
        data: {
	        email:email,
	        password:password
        },
        success: function (data) {
            if(data.status)
                toastr.success(data.message);
            else
                toastr.error(data.message);
            
            initLogin()            
        },
        error: function (error) {
            showErrorMessage(error)                        
        }
    });
}

function addOrganization(params) {
    let name = $("#organization_name").val()
    let status = $("#organization_status").val()
    
    $.ajax(`${baseUrl}/organizations`, {
        type: 'POST',
        headers: {
            'token':localStorage.getItem("token"),
        },
        data: {
	        name:name,
	        status:status,            
        },
        success: function (data) {
            if(data.status)
                toastr.success(data.message);
            else
                toastr.error(data.message);
    
            $('#ModalAddorganization').modal('hide');
            listOrganization()
        },
        error: function (error) {
            showErrorMessage(error)            
            listOrganization()
        }
    });
}

function addMembers(params) {
    
}

function listOrganization() {    
    $.ajax(`${baseUrl}/organizations`, {
        type: 'GET',
        headers: {
            'token':localStorage.getItem("token"),
        },
        data: {},
        success: function (data) {
            $("#list-organization").html("")
            if(data){                
                let pojectList = data.data;
                for(let i=0;i<pojectList.length;i++){
                    $("#list-organization").append(
                        `<div class="list-group-item list-group-item-action flex-column align-items-start" >
                            <div class="d-flex w-100 justify-content-between ">
                                <a href="#" onclick="initTask(${pojectList[i].id})"><h5 class="mb-2 h5">${pojectList[i].organization_name}</h5></a>
                                <small>${pojectList[i].organization_status}</small>
                            </div>                            
                            <small class="mb-2">
                                <button type="button" class="btn btn-sm btn-deep-purple" data-toggle="modal" data-target="#ModalAddMember" onclick="addMember(${pojectList[i].id})">Members</button>            
                                <button type="button" class="btn btn-danger btn-sm float-right" onclick="deleteOrganization(${pojectList[i].id})">Delete</button>
                                <button type="button" class="btn btn-cyan btn-sm float-right" onclick="getOrganizationById(${pojectList[i].id})">Edit</button>
                            </small>
                        </div>`
                    )
                }
            }            
        },
        error: function (error) {
            $("#list-organization").html("")          
        }
    });
}


function deleteOrganization(OrganizationId) {
    $.ajax(`${baseUrl}/organizations/${OrganizationId}`, {
        type: 'DELETE',
        headers: {
            'token':localStorage.getItem("token"),
        },
        data: {},
        success: function (data) {
            if(data.status)
                toastr.success(data.message);
            else
                toastr.error(data.message);
    
            $('#ModalAddOrganization').modal('hide');
            listOrganization()
        },
        error: function (error) {
            showErrorMessage(error)            
            listOrganization()
        }
    });
}

function getOrganizationById(OrganizationId) {
    $.ajax(`${baseUrl}/organizations/${OrganizationId}`, {
        type: 'GET',
        headers: {
            'token':localStorage.getItem("token"),
        },
        data: {},
        success: function (data) {
            if(data.status){
                $("#organization_name_edit").val(data.data.organization_name)
                $("#organization_status_edit").val(data.data.organization_status)
                $("#organization_id_edit").val(data.data.id)
                $('#ModalEditOrganization').modal('show')
            }
        },
        error: function (error) {
            showErrorMessage(error)          
        }
    });
}

function updateOrganization() {
    let name = $("#organization_name_edit").val()
    let status = $("#organization_status_edit").val()
    let organizationId = $("#organization_id_edit").val()

    $.ajax(`${baseUrl}/organizations/${organizationId}`, {
        type: 'PUT',
        headers: {
            'token':localStorage.getItem("token"),
        },
        data: {
	        name:name,
	        status:status,            
        },
        success: function (data) {
            if(data.status)
                toastr.success(data.message);
            else
                toastr.error(data.message);
    
            $('#ModalEditOrganization').modal('hide');
            listOrganization()
        },
        error: function (error) {
            showErrorMessage(error)           
            listOrganization()
        }
    });
}

function addMember(organizationId) {
    $("#organization_id").val(organizationId)
    getMemberOrganization(organizationId)
}

function saveMember() {
    let userEmail = $("#user_email").val()
    let organizationId = $("#organization_id").val()
    
    $.ajax(`${baseUrl}/members`, {
        type: 'POST',
        headers: {
            'token':localStorage.getItem("token"),
        },
        data: {
	        user_email:userEmail,
	        organization_id:organizationId            
        },
        success: function (data) {
            if(data.status)
                toastr.success(data.message);
            else
                toastr.error(data.message);
        
            getMemberOrganization(organizationId)       
        },
        error: function (error) {
            getMemberOrganization(organizationId)
            showErrorMessage(error)            
        }
    });
}

function getMemberOrganization(OrganizationId) {
    $.ajax(`${baseUrl}/organizations/${OrganizationId}`, {
        type: 'GET',
        headers: {
            'token':localStorage.getItem("token"),
        },
        data: {},
        success: function (data) {
            $("#table-member").html("")
            if(data.status){
                let pojectMember = data.data.members;
                for(let i=0;i<pojectMember.length;i++){
                    $("#table-member").append(
                        `
                            <tr>
                                <th scope="row">${i+1}</th>
                                <td>${pojectMember[i].user.email}</td>
                                <td>${pojectMember[i].member_status}</td>
                                <td>
                                    <button type="button" class="btn btn-danger btn-sm m-0" onclick="deleteMember(${OrganizationId},${pojectMember[i].user_id})">Delete</button>
                                </td>
                            </tr>
                        `
                    )
                }
            }
        },
        error: function (error) {
            $("#table-member").html("")
            showErrorMessage(error)          
        }
    });
}

function showErrorMessage(error) {
    if(Array.isArray(error.responseJSON.message)){
        toastr.error(error.responseJSON.message.join());
    }else{
        toastr.error(error.responseJSON.message);
    }
}

function deleteMember(OrganizationId,UserId) {
    $.ajax(`${baseUrl}/members/${OrganizationId}/${UserId}`, {
        type: 'DELETE',
        headers: {
            'token':localStorage.getItem("token"),
        },
        data: {},
        success: function (data) {
            if(data.status)
                toastr.success(data.message);
            else
                toastr.error(data.message);
    
            getMemberOrganization(OrganizationId)
        },
        error: function (error) {
            showErrorMessage(error)            
            getMemberOrganization(OrganizationId)
        }
    });
}

function saveTask() {
    let title = $("#task_title").val()
    let description = $("#task_description").val()
    let status = $("#task_status").val()    
    let due_date = $("#task_due_date").val()    
    let organization_id = $("#task_organization_id").val()   
    
    $.ajax(`${baseUrl}/tasks`, {
        type: 'POST',
        headers: {
            'token':localStorage.getItem("token"),
        },
        data: {
	        title:title,
	        description:description,
            status:status,
            due_date:due_date,
            organization_id:organization_id           
        },
        success: function (data) {
            if(data.status)
                toastr.success(data.message);
            else
                toastr.error(data.message);
        
            getTaskList()       
        },
        error: function (error) {
            showErrorMessage(error)
            getTaskList()
                        
        }
    });
}


function getTaskList() {
    let organization_id = $("#task_organization_id").val()   
    
    $.ajax(`${baseUrl}/tasks/organization/${organization_id}`, {
        type: 'GET',
        headers: {
            'token':localStorage.getItem("token"),
        },
        data: {},
        success: function (data) {
            resetCardSortable()
            if(data.status){
                let taskList = data.data;
                for(let i=0;i<taskList.length;i++){

                    var taskCard = `
                            <li id="${taskList[i].id}" data-task="${taskList[i].id}" class="task-id">
                            <div class="card">
                            <div class="card-body">
                                <h6 class="card-title">${taskList[i].title}</h6>
                                <hr>
                                <p class="card-text">${taskList[i].description}</p>
                            </div>
                            <div class="rounded-bottom mdb-color text-center pt-3" style="padding-bottom:10px">
                                <ul class="list-unstyled list-inline font-small">
                                <li class="list-inline-item pr-2 white-text"><i class="far fa-clock pr-1"></i>                                
                                ${moment(taskList[i].due_date).format("YYYY-MM-DD")}
                                </li>
                                <li class="list-inline-item pr-2"><a href="#" class="blue-text" onclick="getTaskById(${taskList[i].id})">Edit</a></li>
                                <li class="list-inline-item pr-2"><a href="#" class="red-text" onclick="deleteTask(${taskList[i].id})">Delete</a></li>
                                </ul>
                            </div>
                            </div>
                            </li>
                            `
                    if(taskList[i].status === "New"){
                        $("#col-new").append(
                            taskCard
                        )
                    }else if(taskList[i].status === "Inprogress"){
                        $("#col-inprogress").append(
                            taskCard
                        )
                    }else if(taskList[i].status === "Done"){
                        $("#col-done").append(
                            taskCard
                        )
                    }
                }
            }
        },
        error: function (error) {
            resetCardSortable()          
            showErrorMessage(error)          
        }
    });
}

function resetCardSortable() {
    $("#card-new,#card-inprogress,#card-done").empty()
    $("#card-new").append(`<ul id="col-new" class="draggable status-id" data-id="New"></ul>`)
    $("#card-inprogress").append(`<ul id="col-inprogress" class="draggable status-id" data-id="Inprogress"></ul>`)
    $("#card-done").append(`<ul id="col-done" class="draggable status-id" data-id="Done"></ul>`)
    activateTask()
}


function deleteTask(TaskId) {
    $.ajax(`${baseUrl}/tasks/${TaskId}`, {
        type: 'DELETE',
        headers: {
            'token':localStorage.getItem("token"),
        },
        data: {},
        success: function (data) {
            if(data.status)
                toastr.success(data.message);
            else
                toastr.error(data.message);
        
            getTaskList()
        },
        error: function (error) {
            showErrorMessage(error)            
            getTaskList()
        }
    });
}

function updateTaskStatus(TaskId,Status) {
    $.ajax(`${baseUrl}/tasks/${TaskId}`, {
        type: 'PATCH',
        headers: {
            'token':localStorage.getItem("token"),
        },
        data: {
            status:Status
        },
        success: function (data) {
            if(data.status)
                toastr.success(data.message);
            else
                toastr.error(data.message);
        
            getTaskList()
        },
        error: function (error) {
            showErrorMessage(error)            
            getTaskList()
        }
    });
}

function getTaskById(TaskId) {
    $.ajax(`${baseUrl}/tasks/${TaskId}`, {
        type: 'GET',
        headers: {
            'token':localStorage.getItem("token"),
        },
        data: {},
        success: function (data) {
            if(data.status){
                console.log(moment(data.data.due_date).format("YYYY-MM-DD"));
                $("#task_id").val(data.data.id)
                $("#task_title_edit").val(data.data.title)
                $("#task_description_edit").val(data.data.description)
                $("#task_status_edit").val(data.data.status)
                $("#task_due_date_edit").val(`${moment(data.data.due_date).format("YYYY-MM-DD")}`)
                $('#ModalEditTask').modal('show')
            }
        },
        error: function (error) {
            showErrorMessage(error)          
        }
    });
}

function updateTask() {
    let task_id = $("#task_id").val() 
    let title = $("#task_title_edit").val()
    let description = $("#task_description_edit").val()
    let status = $("#task_status_edit").val()    
    let due_date = $("#task_due_date_edit").val()    
    let organization_id = $("#task_organization_id_edit").val()   
    
    $.ajax(`${baseUrl}/tasks/${task_id}`, {
        type: 'PUT',
        headers: {
            'token':localStorage.getItem("token"),
        },
        data: {
	        title:title,
	        description:description,
            status:status,
            due_date:due_date,
            organization_id:organization_id           
        },
        success: function (data) {
            if(data.status)
                toastr.success(data.message);
            else
                toastr.error(data.message);
        
            getTaskList()       
        },
        error: function (error) {
            showErrorMessage(error)
            getTaskList()
                        
        }
    });
}

function onSignIn(googleUser) {
  var google_access_token = googleUser.getAuthResponse().id_token;
  console.log(google_access_token);

  $.ajax({
    method: 'POST',
    url: baseUrl + '/googlelogin',
    headers: {
      google_access_token
    }
  })
    .done(response => {
        console.log(response);
      localStorage.setItem('token', response.token)
      initScreen()
    })
    .fail(err => {
      console.log(err)
    })
}



