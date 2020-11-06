# KANBAN By Diva
Aplikasi ini digunakan untuk keperluan portofolio :). Untuk mebuat aplikasi ini saya menggunakan Vue.js, Bootstrap, dan CSS untuk bagian client (front-end). Sedangkan untuk server, saya menggunakan sequelize dengan db postgres. JWT Token digunakan untuk authentikasi dan Bcryptjs untuk melakukan proses decoding dan encoding password. Kamu bisa check aplikasi saya disini, walaupun belum sempurna but i hope u like the way i design this website with my heart hehe. I love to styling the website. 
* **Deploy**
- Firebase --> hosting
- Server --> Heroku

## Link Deploy
Here is the link https://kanban-app-294723.web.app/. 

## User Sign Up
#
* **URL**

  `/signup`

* **Method:**
  
   `POST` 
  
*  **URL Params**

   **Required:**
 
   `email=[string]`

   `password=[string]`

* **Data Params**

  `{
    "email": "bams@gmail.com",
    "password": "123456"
}`

* **Success Response:**
  
  * **Code:** 201 Created <br />
    **Content:** `
  {
    "id": 1,
    "first_name": "Bambang",
    "last_name": "Wew",
    "email": "bams@gmail.com",
    "password": "$2a$10$D3YFdgG.Q23yvXA3sGePnOxAUC67lrWs8DA1T3bdK/Zpufy615dp2",
    "updatedAt": "2020-11-06T14:07:48.980Z",
    "createdAt": "2020-11-06T14:07:48.980Z" 
  }
 
* **Error Response:**

  * **Code:** 400 Bad Request<br />
    **Content:** `{ "name": "SequelizeUniqueConstraintError"}`

* **Sample Call:**
 ```javascript
    signUp(newUser){
        axios({
        url: '/signup',
        method: 'post',
        data: {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            password: newUser.password
        }
        })
        .then(({ data }) => {
            this.page = "Login-Page";
        }).catch(err => {
            console.log(err.response)
        })
    }
  ```

#
## User Log In
#
* **URL**

 ` /login`

* **Method:**
  
   `POST` 
  
*  **URL Params**

   **Required:**
 
   `email=[string]`
   
   `password=[string]`


* **Data Params**
```javascript
  {
    "email": "bams@gmail.com",
    "password": "123456"
  }
```

* **Success Response:**
  
  * **Code:** 200 OK<br />
    **Content:** 
      `{
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQxNzcwMjl9.e9124E_EFtwI3etyrS8ABRGvPyPP6Wl1UWhowpnTkws" 
        }`
 
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:** `{ }`

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "message": "Wrong email/password" }`


* **Sample Call:**
 ```javascript
    login(user) {
        axios({
        url: "/login",
        method: "post",
        data: {
            email: user.email,
            password: user.password,
        },
        })
        .then(({ data }) => {
            localStorage.setItem("access_token", data.access_token);
            this.page = "Kanban-Page";
            this.fetchTasks()
        })
        .catch((err) => {
            console.log(err.response);
        });
    }
  ```

#
## Google Log In
#
* **URL**

  `/googleLogin`

* **Method:**
  
   `POST` 
  
*  **URL Params**

   `google_token`
    
* **Required:**

  * **Headers:**  <br />
    `{
      access_token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQxNzcwMjl9.e9124E_EFtwI3etyrS8ABRGvPyPP6Wl1UWhowpnTkws
    }`

*  **Data Params**

   `None`
    
* **Success Response:**
  
  * **Code:** 200 OK<br />
    **Content:** 
      `{
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQxNzcwMjl9.e9124E_EFtwI3etyrS8ABRGvPyPP6Wl1UWhowpnTkws" 
        }`
 
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:** `{ }`

  * **Code:** 500 <br />
    **Content:** `{ msg: "Internal Server Error" }`


* **Sample Call:**
 ```javascript
    loginGoogle(google_token) {
      axios({
        url: "/googleLogin",
        method: "post",
        data: {
          google_token
        },
      })
        .then(({ data }) => {
          localStorage.setItem("access_token", data.access_token);
          this.page = "Kanban-Page";
          this.fetchTasks()
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  ```

#
## GET List Task
#
* **URL**

  `/tasks`

* **Method:**
  
   `GET` 
  
*  **URL Params**

   **Required Headers:**
   `{
     access_token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQxNzcwMjl9.e9124E_EFtwI3etyrS8ABRGvPyPP6Wl1UWhowpnTkws"
   }`

   **Optional:**
 
   None

* **Data Params**
  `None`

* **Success Response:**
  
  * **Code:** 200 OK<br />
    **Content:** 
  `[
 {
        "id": 5,
        "title": "ERD",
        "description": "Design ERD biar mudah untuk buat server kanban",
        "due_date": "2020-11-05",
        "UserId": 4,
        "CategoryId": 2,
        "createdAt": "2020-11-05T06:34:45.346Z",
        "updatedAt": "2020-11-05T06:34:45.346Z",
        "Category": {
            "id": 2,
            "name": "Todo",
            "createdAt": "2020-11-05T05:15:37.904Z",
            "updatedAt": "2020-11-05T05:15:37.904Z"
        },
        "User": {
            "id": 4,
            "first_name": "Anjay",
            "last_name": "Mara",
            "email": "anjay@gmail.com",
            "password": "123456",
            "createdAt": "2020-11-04T16:22:19.955Z",
            "updatedAt": "2020-11-04T16:22:19.955Z"
        }
    }
    ]`
 
* **Error Response:**

  * **Code:** 401 NOT FOUND <br />
    **Content:** `{ "error": "Authentication failed }`

  * **Code:** 500  <br />
    **Content:** `{ error : "Internal Server Error" }`

* **Sample Call:**
 ```javascript
       fetchTasks() {
      const access_token = localStorage.getItem("access_token");
      // console.log(access_token,"<<<<<<< TOKEN WOI")
      axios({
        url: '/tasks',
        method:'get',
        headers: {
            access_token
        }
      })
        .then(({data}) => {
          this.tasks = data
        }) .catch(err => {
          console.log(err.response)
        })
    }
  ```
#
## Create Tasks
#
* **URL**

  `/tasks`

* **Method:**
  
   `POST` 
  
*  **URL Params**

   **Required Headers:**
   `{
     access_token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQxNzcwMjl9.e9124E_EFtwI3etyrS8ABRGvPyPP6Wl1UWhowpnTkws"
   }`

   **Optional:**
 
   None

* **Data Params**

`{ "title":"API ",
   "description":"Bagian dokumentasi API Kanban App",
   "due_date":"2020-11-20" 
}`

* **Success Response:**
  
  * **Code:** 201 CREATED<br />
    **Content:** 
  `[
    {
        "id": 25,
        "title": "API",
        "description": "Bagian dokumentasi API Kanban App",
        "due_date": "2020-11-20",
        "UserId": 13,
        "CategoryId": 2,
        "createdAt": "2020-10-31T21:21:26.825Z",
        "updatedAt": "2020-11-01T00:41:19.243Z"
    }
    ]`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error: "Internal Server Error" }`

  * **Code:** 400  <br />
    **Content:** `{ error : "Sequelize validation Error" }`


* **Sample Call:**
 ```javascript
    addTask(task) {
      // console.log(task);
      const access_token = localStorage.getItem("access_token");
      axios({
        url: '/tasks',
        method:'post',
        data: {
          title: task.title,
          description: task.description,
          due_date: task.due_date,
          CategoryId: task.CategoryId
        },
        headers: {
            access_token
        }
      })
      .then(({ data }) => {
        console.log(data)
        this.page = "Kanban-Page";
        this.fetchTasks()
      }).catch(err => {
        console.log(err.response)
      })
    }
  ```

#
## DELETE List Task by ID
#
* **URL**

  `/tasks/:id`

* **Method:**
  
   `DELETE` 
  
*  **URL Params**
   **Required:**
 
   `id=[integer]`

   **Required Headers:**
   `{
     access_token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQxNzcwMjl9.e9124E_EFtwI3etyrS8ABRGvPyPP6Wl1UWhowpnTkws"
   }`

* **Data Params**

  `id`

* **Success Response:**
  * **Code:** 200 Unauthorized <br />
    **Content:** `{ "msg": "Data Success To Delete" }`
 
* **Error Response:**

 * **Code:** 401 Unauthorized <br />
    **Content:** `{ "msg": "Not authorized" }`

  * **Code:** 404 Not Found<br />
    **Content:** `{"msg": "Task not found"}`

  * **Code:** 500  <br />
    **Content:** `{ error : "Internal Server Error" }`

* **Sample Call:**
 ```javascript
    deleteTask(id) {
      // console.log(task);
      const access_token = localStorage.getItem("access_token");
      axios({
        url: `/tasks/${id}`,
        method:'delete',
        headers: {
            access_token
        }
      })
      .then(({ data }) => {
        console.log(data)
        this.page = "Kanban-Page";
        this.fetchTasks()
      }) .catch(err => {
        console.log(err.response)
      })
    }
  ```


#
## EDIT List Tasks
#
* **URL**

  `/tasks/:id`

* **Method:**
  
   `PUT` 
  
*  **URL Params**
   **Required:**
 
   `id=[integer]`

   **Required Headers:**
   `{
     access_token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQxNzcwMjl9.e9124E_EFtwI3etyrS8ABRGvPyPP6Wl1UWhowpnTkws"
   }`


   **Required Headers:**
   
   `{  "UserId"= req.loggedIn.user
       "title":"Bootstrap ",
        "description":"Bagian bootstrapnya Kanban dan styling CSS",
        "due_date":"2020-11-20" 
        "CategoryId"= CategoryId from vue
    }`


* **Data Params**

  `None`

* **Success Response:**
  
  * **Code:** 200 OK<br />
    **Content:** 

  `{
    "id": 18,
    "title": "Belajar CSS",
    "description": "Lihat video tutorial di Youtube",
    "due_date": "2020-11-05",
    "UserId": 11,
    "CategoryId: 3,
    "createdAt": "2020-10-31T18:45:31.773Z",
    "updatedAt": "2020-10-31T23:10:15.747Z"
  }`
 
* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ "msg": "Not authorized" }`

  * **Code:** 404 Not Found<br />
    **Content:** `{"msg": "Task not found"}`

  * **Code:** 500  <br />
    **Content:** `{ error : "Internal Server Error" }`

* **Sample Call:**
 ```javascript
    updateTask(task) {
      const access_token = localStorage.getItem("access_token");
      axios({
        url: `/tasks/${task.id}`,
        method:'put',
        data: {
          title: task.title,
          description: task.description,
          due_date: task.due_date,
        },
        headers: {
            access_token
        }
      })
      .then(({ data }) => {
        console.log(data)
        this.page = "Kanban-Page";
        this.fetchTasks()
      }).catch(err => {
        console.log(err.response)
      })
    },
  }
  ```


* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 