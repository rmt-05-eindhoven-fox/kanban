# **API Documentation** Kanban
## Local server : 
  `http://localhost:3000`
---- 

<br>

# User
## 1. Register New User
<details>
  <summary>Click to expand!</summary>
  
  ### Post/Create new todo.

  * **URL**

    `/register`


  * **Method:**

    `POST`
  
  * **Data Params**
    
    *data*

    ```json
    {
        "fullname": "Member 1",
        "username": "member1",
        "email": "member1@mail.com",
        "password": "11111111"
    }
    ```

  * **Success Response**

    * **Code:** 201 <br />
      **Content:** 
      ```json
      {
        "status": 201,
        "user": {
            "id": 4,
            "fullname": "Member 1",
            "email": "member1@mail.com"
        }
      }
      ```
  
  * **Error Response:**

    * **Code:** 400 BAD  REQUEST <br />
      **Content:** 
      ```json
      {
        "status": 400,
        "message": [
          {
            "errors": "Fullname is required, can't be empty!",
            "field": "fullname"
          },
          {
            "errors": "Email is required, can't be empty!",
            "field": "email"
          },
          {
            "errors": "Email must be valid an email address",
            "field": "email"
          },
          {
            "errors": " is required, can't be empty!",
            "field": "password"
          },
          {
            "errors": "Password minimal 8 character!",
            "field": "password"
          }
        ]
      }
      ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:** 
      ```javascript
      { error : "Something error message from server" }
      ```  
</details>   


## 2. Login
<details>
  <summary>Click to expand!</summary>
  
  ### login

  * **URL**

    `/login`


  * **Method:**

    `POST` 

  * **Data Params**
    
    *data*

    ```js
    { 
      "email": "member1@mail.com", 
      "password": "asdasdsaere"
    }
    ```

  * **Success Response**

    * **Code:** 201 <br />
      **Content:** 
      ```json
      { 
        "id": 9, 
        "email": "rpratama.sky@gmail.com", 
        "fullname": "Riyan Pratama", 
        "access_token": "eyJhbGciOiJIUzI1NiJ9."
      }
      ```
  
  * **Error Response:**

    * **Code:** 400 BAD  REQUEST <br />
      **Content:** 
      ```json
      { 
        "email": "member1@mail.com", 
        "password": "11111111"
      }
      ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:** 
      ```javascript
      { error : "Something error message from server" }
      ```  
</details> 

## 3. Login Google
<details>
  <summary>Click to expand!</summary>
  
  ### login

  * **URL**

    `/googlesignin`


  * **Method:**

    `POST` 

  * **Data Params**
    
    *data*

    ```js
    { 
      "google_access_token": "xsxBHAJKanKBSD,MABtu784wy"
    }
    ```

  * **Success Response**

    * **Code:** 201 <br />
      **Content:** 
      ```json
      { 
        "id": 9, 
        "email": "rpratama.sky@gmail.com", 
        "fullname": "Riyan Pratama", 
        "access_token": "eyJhbGciOiJIUzI1NiJ9."
      }
      ```
  
  * **Error Response:**

    * **Code:** 400 BAD  REQUEST <br />
      **Content:** 
      ```json
      {
        "message": "Wrong email / password!",
        "status": 401
      }
      ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:** 
      ```javascript
      { error : "Something error message from server" }
      ```  
</details> 


## 4. Verify Token
<details>
  <summary>Click to expand!</summary>
  
  ### verify token

  * **URL**

    `/users/verify`


  * **Method:**

    `get` 

  * **Headers**
    
    *data*

    ```json
    { 
      "access_token": "asasKJ7dj7knKHm ... "
    }
    ```

  * **Success Response**

    * **Code:** 200 <br />
      **Content:** 
      ```json
      { 
        "id": 9, 
        "email": "rpratama.sky@gmail.com", 
        "fullname": "Riyan Pratama",  
      }
      ```
  
  * **Error Response:**

    * **Code:** 401 NOTAUTHORIZE <br />
      **Content:** 
      ```json
      { 
        "status":401,
        "message": "Not Authorize!",  
      }
      ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:** 
      ```javascript
      { error : "Something error message from server" }
      ```  
</details> 

## 5. Get User Organizations
<details>
  <summary>Click to expand!</summary>
  
  ### get user organization

  * **URL**

    `/organizations`


  * **Method:**

    `GET` 

  * **Header Params**
    
    *data*

    ```json
    { 
      "access_token": "unique_token"
    }
    ```

  * **Success Response**

    * **Code:** 200 <br />
      **Content:** 
      ```json
      {
        "id": 4,
        "fullname": "Member 1",
        "email": "member1@mail.com",
        "createdAt": "2020-11-06T10:24:38.576Z",
        "updatedAt": "2020-11-06T10:24:38.576Z",
        "Organizations": [
          {
            "id": 1,
            "name": "team-sultan",
            "UserId": 1,
            "createdAt": "2020-11-05T14:54:56.432Z",
            "updatedAt": "2020-11-05T14:54:56.432Z",
            "UserOrganizations": {
              "createdAt": "2020-11-06T10:45:32.018Z",
              "updatedAt": "2020-11-06T10:45:32.018Z",
              "OrganizationId": 1,
              "UserId": 4
            }
          }
        ]
      }
      ```
  
  * **Error Response:**

    * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:** 
      ```javascript
      { error : "Something error message from server" }
      ```  
</details> 

<br>

# Organization

## Get Organization By User Created
<details>
  <summary>Click to expand!</summary>
  
  ### Get all todos data.

  * **URL**

    `/organizations`

  * **Method:**

    `GET`

  * **URL Headers**
    
    **required**
    ```json
      {
        "accesstoken": "accesstoken" 
      }
    ```

  * **Success Response:**

    * **Code:** 200 <br />
      **Content:** 
      ```javascript
      {
      "status": 200,
      "organization": {
        "id": 1,
        "name": "team-sultan",
        "UserId": 1,
        "createdAt": "2020-11-05T14:54:56.432Z",
        "updatedAt": "2020-11-05T14:54:56.432Z",
        "Categories": [
          {
            "id": 1,
            "name": "Backlog",
            "UserId": 1,
            "OrganizationId": 1,
            "createdAt": "2020-11-05T14:55:08.390Z",
            "updatedAt": "2020-11-05T14:55:08.390Z",
            "Tasks": [
              {
                  "id": 1,
                  "name": "Deploy Firebase Edited",
                  "description": "Description Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                  "UserId": 1,
                  "CategoryId": 1,
                  "OrganizationId": 1,
                  "createdAt": "2020-11-05T15:38:00.866Z",
                  "updatedAt": "2020-11-06T04:19:00.178Z",
                  "User": {
                    "id": 1,
                    "fullname": "admin 1",
                    "email": "admin1@mail.com"
                  }
                }]
              },
            { ... }
          ] 
        }
      }
      ```

  * **Error Response:** 

    * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:** 
      ```javascript
      { error : "Something error message from server" }
      ``` 
</details>

## Create New Organization 

<details>
  <summary>Click to expand!</summary>
  
  ### Post/Create Organization.

  * **URL**

    `/organizations`


  * **Method:**

    `POST`
  
  * **URL Headers**
    
    **required**
    ```json
      {
        "accesstoken": "accesstoken" 
      }
    ```

  * **Data Params**
    
    *data*

    ```json
    {
      "name": "team-avenger"
    }
    ```

  * **Success Response**

    * **Code:** 201 <br />
      **Content:** 
      ```json
      {
        "id": 2,
        "name": "team-avenger",
        "UserId": 1,
        "updatedAt": "2020-11-06T08:23:27.351Z",
        "createdAt": "2020-11-06T08:23:27.351Z"
      }
      ```
  
  * **Error Response:**

    * **Code:** 400 BAD  REQUEST <br />
      **Content:** 
      ```json
      {
        "status": 400,
        "message": [
          {
            "errors": "Organization name is required, can't be empty!",
            "field": "name"
          }
        ]
      }
      ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:** 
      ```javascript
      { error : "Something error message from server" }
      ```  
</details>   

## Delete Organization 

<details>
  <summary>Click to expand!</summary>
  
  ### Post/Create Organization.

  * **URL**

    `/organizations`
  
  * **URL Headers**
    **required**

    `Id=[integer]`

  * **Method:**

    `DELETE`
  
  * **URL Headers**
    
    **required**
    ```json
      {
        "accesstoken": "accesstoken" 
      }
    ``` 

  * **Success Response**

    * **Code:** 200 <br />
      **Content:** 
      ```json
      {
        "status": 200,
        "message": "Success deleted organization My Organization!"
      }
      ```
  
  * **Error Response:**

    * **Code:** 400 BAD  REQUEST <br />
      **Content:** 
      ```json
      {
        "status": 400,
        "message": [
          {
            "errors": "Organization name is required, can't be empty!",
            "field": "name"
          }
        ]
      }
      ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:** 
      ```javascript
      { error : "Something error message from server" }
      ```  
</details>   

## Create New Organization 

<details>
  <summary>Click to expand!</summary>
  
  ### Post/Create Organization.

  * **URL**

    `/organizations`


  * **Method:**

    `POST`
  
  * **URL Headers**
    
    **required**
    ```json
      {
        "accesstoken": "accesstoken" 
      }
    ```

  * **Data Params**
    
    *data*

    ```json
    {
      "name": "team-avenger"
    }
    ```

  * **Success Response**

    * **Code:** 201 <br />
      **Content:** 
      ```json
      {
        "id": 2,
        "name": "team-avenger",
        "UserId": 1,
        "updatedAt": "2020-11-06T08:23:27.351Z",
        "createdAt": "2020-11-06T08:23:27.351Z"
      }
      ```
  
  * **Error Response:**

    * **Code:** 400 BAD  REQUEST <br />
      **Content:** 
      ```json
      {
        "status": 400,
        "message": [
          {
            "errors": "Organization name is required, can't be empty!",
            "field": "name"
          }
        ]
      }
      ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:** 
      ```javascript
      { error : "Something error message from server" }
      ```  
</details>   

## Update Organization 

<details>
  <summary>Click to expand!</summary>
  
  ### Post/Create Organization.

  * **URL**

    `/organizations`
  
  * **URL Headers**
    **required**

    `Id=[integer]`

  * **Method:**

    `DELETE`
  
  * **URL Headers**
    
    **required**
    ```json
      {
        "accesstoken": "accesstoken" 
      }
    ``` 

  * **Success Response**

    * **Code:** 200 <br />
      **Content:** 
      ```json
      {
        "status": 200,
        "message": "Success deleted organization My Organization!"
      }
      ```
  
  * **Error Response:**

    * **Code:** 400 BAD  REQUEST <br />
      **Content:** 
      ```json
      {
        "status": 400,
        "message": [
          {
            "errors": "Organization name is required, can't be empty!",
            "field": "name"
          }
        ]
      }
      ```

    OR
    * **Code:** 401 UNAUTHORIZE <br />
      **Content:** 
      ```json
      {
        "message": "Not authorize, For members only!",
        "status": 401
      }
      ```

    * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:** 
      ```javascript
      { error : "Something error message from server" }
      ```  
</details>   

## Create New Organization 

<details>
  <summary>Click to expand!</summary>
  
  ### Post/Create Organization.

  * **URL**

    `/organizations/member`


  * **Method:**

    `POST`
  
  * **URL Headers**
    
    **required**
    ```json
      {
        "accesstoken": "accesstoken" 
      }
    ```

  * **Data Params**
    
    *data*

    ```json
    {
      "OrganizationId": 1,
      "email": "admin2@mail.com"
    }
    ```

  * **Success Response**

    * **Code:** 201 <br />
      **Content:** 
      ```json
      {
        "status": 201,
        "message": "Successfully add new member to organization!",
        "member": {
          "id": 3,
          "email": "admin2@mail.com",
          "fullname": "admin 2"
        }
      }
      ```
  
  * **Error Response:**

    * **Code:** 4004 NOT FOUND <br />
      **Content:** 
      ```json
      {
        "message": "User not found!",
        "status": 401
      }
      ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:** 
      ```javascript
      { error : "Something error message from server" }
      ```  
</details>   

<br>

# Category

## Get All Category By Organization
<details>
  <summary>Click to expand!</summary>
  
  ### Get all category with task

  * **URL**

    `/categories?organizationid=[integer]`


  * **Method:**

    `GET` 

  * **Url Query Params**

    `organizationid=[integer]`

  * **Header Params**
    
    *data* 
    ```json
    { 
      "access_token": "unique_token"
    }
    ```

  * **Success Response**

    * **Code:** 200 <br />
      **Content:** 
      ```json
      [{
          "id": 1,
          "name": "Backlog",
          "UserId": 1,
          "OrganizationId": 1,
          "createdAt": "2020-11-05T14:55:08.390Z",
          "updatedAt": "2020-11-05T14:55:08.390Z",
          "Tasks": [
            {
              "id": 1,
              "name": "Deploy Firebase Edited",
              "description": "Description Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
              "UserId": 1,
              "CategoryId": 1,
              "OrganizationId": 1,
              "createdAt": "2020-11-05T15:38:00.866Z",
              "updatedAt": "2020-11-06T04:19:00.178Z",
              "User": {
                "id": 1,
                "fullname": "admin 1",
                "email": "admin1@mail.com"
              }
            }]
        }, { ... }
      ]
      ```
  
  * **Error Response:**

    * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:** 
      ```javascript
      { error : "Something error message from server" }
      ```  
</details> 

## Get Category By Id with task
<details>
  <summary>Click to expand!</summary>
  
  ### Get all category with task

  * **URL**

    `/categories`


  * **Method:**

    `GET` 

  * **Url Params**

    `id=[integer]`

  * **Header Params**
    
    *data* 
    ```json
    { 
      "access_token": "unique_token"
    }
    ```

  * **Success Response**

    * **Code:** 200 <br />
      **Content:** 
      ```json
      {
        "id": 1,
        "name": "Backlog",
        "UserId": 1,
        "OrganizationId": 1,
        "createdAt": "2020-11-05T14:55:08.390Z",
        "updatedAt": "2020-11-05T14:55:08.390Z",
        "Tasks": [
          {
            "id": 1,
            "name": "Deploy Firebase Edited",
            "description": "Description Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            "UserId": 1,
            "CategoryId": 1,
            "OrganizationId": 1,
            "createdAt": "2020-11-05T15:38:00.866Z",
            "updatedAt": "2020-11-06T04:19:00.178Z",
            "User": {
              "id": 1,
              "fullname": "admin 1",
              "email": "admin1@mail.com"
            }
          }
        ]
      }
      ```
  
  * **Error Response:**

    * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:** 
      ```javascript
      { error : "Something error message from server" }
      ```  
</details> 

## Delete Category 

<details>
  <summary>Click to expand!</summary>
  
  ### Post/Create Organization.

  * **URL**

    `/categories`
  
  * **URL Headers**
    **required**

    `Id=[integer]`

  * **Method:**

    `DELETE`
  
  * **URL Headers**
    
    **required**
    ```json
      {
        "accesstoken": "accesstoken" 
      }
    ``` 
  
  * **Data Params**  
    **data**

    ```json
    {
      "OrganizationId": 1
    }
    ```

  * **Success Response**

    * **Code:** 200 <br />
      **Content:** 
      ```json
      {
        "status": 200,
        "message": "Success deleted category!"
      }
      ```
  
  * **Error Response:**

    * **Code:** 401 UNAUTHORIZE <br />
      **Content:** 
      ```json
      {
        "message": "Authentication failed!",
        "status": 401
      }
      ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:** 
      ```javascript
      { error : "Something error message from server" }
      ```  
</details>   

## Create new Category
<details>
  <summary>Click to expand!</summary>
  
  ### Post/Create new category.

  * **URL**

    `/categories`


  * **Method:**

    `POST`
  
  * **Data Params**
    
    *data*

    ```json
    {
      "name": "Backlog",
      "OrganizationId": 5
    }
    ```

  * **Success Response**

    * **Code:** 201 <br />
      **Content:** 
      ```json
      {
        "status": 201,
        "category": {
          "id": 5,
          "name": "Backlog",
          "UserId": 4,
          "OrganizationId": 5,
          "updatedAt": "2020-11-06T12:55:33.807Z",
          "createdAt": "2020-11-06T12:55:33.807Z"
        }
      } 
      ```
  
  * **Error Response:**

    * **Code:** 400 BAD  REQUEST <br />
      **Content:** 
      ```json
      {
        "status": 400,
        "message": [
          {
            "errors": "Category name is required, can't be empty!",
            "field": "name"
          }
        ]
      }
      ```

    OR
  * **Code:** 401 UNAUTHORIZE <br />
    **Content:** 

    ```json
    {
      "message": "Not authorize, For members only!",
      "status": 401
    }
    ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:** 
      ```javascript
      { error : "Something error message from server" }
      ```  
</details>   

## Update Category
<details>
  <summary>Click to expand!</summary>
  
  ### Update category.

  * **URL**

    `/categories`

  * **URL Headers**
    **required**

    `Id=[integer]`

  * **Method:**

    `POST`
  
  * **Data Params**
    
    *data*

    ```json
    {
      "name": "Backlog",
      "OrganizationId": 5
    }
    ```

  * **Success Response**

    * **Code:** 200 <br />
      **Content:** 
      ```json
      {
        "status": 200,
        "category": {
          "id": 1,
          "name": "Backlog Edit",
          "UserId": 1,
          "OrganizationId": 1,
          "createdAt": "2020-11-05T14:55:08.390Z",
          "updatedAt": "2020-11-06T14:14:42.079Z"
        }
      }
      ```
  
  * **Error Response:**

    * **Code:** 400 BAD  REQUEST <br />
      **Content:** 
      ```json
      {
        "status": 400,
        "message": [
          {
            "errors": "Category name is required, can't be empty!",
            "field": "name"
          }
        ]
      }
      ```

    OR
  * **Code:** 401 UNAUTHORIZE <br />
    **Content:** 

    ```json
    {
      "message": "Not authorize, For members only!",
      "status": 401
    }
    ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:** 
      ```javascript
      { error : "Something error message from server" }
      ```  
</details>   

<br>

# Task

## Get Task
<details>
  <summary>Click to expand!</summary>
  
  ### get Task By Id

  * **URL**

    `/tasks/1?organizations=1`


  * **Method:**

    `GET` 

  * **Url Params**
    **required**

    `id=[integer]`

  *  **Url Query Params**
    **required**
    
    `organizationid=[integer]`


  * **Header Params**
    
    *data*

    ```json
    { 
      "access_token": "unique_token"
    }
    ```

  * **Success Response**

    * **Code:** 200 <br />
      **Content:** 
      ```json
      {
        "status": 200,
        "task": {
          "id": 1,
          "name": "Deploy Firebase Edited",
          "description": "Description Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          "UserId": 1,
          "CategoryId": 1,
          "OrganizationId": 1,
          "createdAt": "2020-11-05T15:38:00.866Z",
          "updatedAt": "2020-11-06T04:19:00.178Z",
          "User": {
            "id": 1,
            "fullname": "admin 1",
            "email": "admin1@mail.com"
          }
        }
      }
      ```
  
  * **Error Response:**

    * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:** 
      ```javascript
      { error : "Something error message from server" }
      ```  
</details> 

 
## Add New Task
<details>
  <summary>Click to expand!</summary>
  
  ### Post/Create new task.

  * **URL**

    `/tasks`

  * **Method:**

    `POST`
  
  * **Data Params**
    
    *data*

    ```json
    {
      "name": "Deploy Firebase",
      "description": "Lorem Ipsum is simply dummy text of.",
      "OrganizationId": 1, 
      "CategoryId": 1
    }
    ```

  * **Success Response**

    * **Code:** 201 <br />
      **Content:** 
      ```json
      {
        "status": 201,
        "task": {
          "id": 15,
          "name": "Deploy Firebase",
          "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          "OrganizationId": 1,
          "CategoryId": 1,
          "UserId": 1,
          "updatedAt": "2020-11-06T14:24:11.822Z",
          "createdAt": "2020-11-06T14:24:11.822Z"
        }
      }
      ```
  
  * **Error Response:**

    * **Code:** 400 BAD  REQUEST <br />
      **Content:** 
      ```json
      {
        "status": 400,
        "message": [
          {
            "errors": "Task name is required, can't be empty!",
            "field": "name"
          },
          {
            "errors": "Description is required, can't be empty!",
            "field": "description"
          }
        ]
      }
      ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:** 
      ```javascript
      { error : "Something error message from server" }
      ```  
</details>   

## Update Task
<details>
  <summary>Click to expand!</summary>
  
  ### get Task By Id

  * **URL**

    `/tasks`


  * **Method:**

    `PUT` 

  * **Url Params**
    **required**

    `id=[integer]` 

  * **Header Params**
    
    *data*

    ```json
    { 
      "access_token": "unique_token"
    }
    ```

    ```json
    {
      "name": "Backlog Progres Edited",
      "description": "New Description",
      "CategoryId": 4,
      "OrganizationId": 1
    }
    ```

  * **Success Response**

    * **Code:** 200 <br />
      **Content:** 
      ```json
      {
        "status": 200,
        "task": {
          "id": 7,
          "name": "Backlog Progres Edited",
          "description": "New Description",
          "UserId": 1,
          "CategoryId": 4,
          "OrganizationId": 1,
          "createdAt": "2020-11-06T04:09:36.594Z",
          "updatedAt": "2020-11-06T14:33:12.619Z"
        }
      }
      ```
  
  * **Error Response:**

    * **Code:** 401 UNAUTHORIZE<br />
      **Content:** 
      ```json
        {
          "message": "Not authorize delete or update!",
          "status": 401
        }
      ```

      OR

  * **Error Response:**

    * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:** 
      ```javascript
      { error : "Something error message from server" }
      ```  
</details> 
 
 ## Update Category Task
<details>
  <summary>Click to expand!</summary>
  
  ### get Task By Id

  * **URL**

    `/tasks`


  * **Method:**

    `PATCH` 

  * **Url Params**
    **required**

    `id=[integer]` 

  * **Header Params**
    
    *data*

    ```json
    { 
      "access_token": "unique_token"
    }
    ```

    ```json
    { 
      "CategoryId": 4,
      "OrganizationId": 1
    }
    ```

  * **Success Response**

    * **Code:** 200 <br />
      **Content:** 
      ```json
      {
        "status": 200,
        "task": {
          "id": 7,
          "name": "Backlog Progres Edited",
          "description": "New Description",
          "UserId": 1,
          "CategoryId": 4,
          "OrganizationId": 1,
          "createdAt": "2020-11-06T04:09:36.594Z",
          "updatedAt": "2020-11-06T14:33:12.619Z"
        }
      }
      ```
  
  * **Error Response:**

    * **Code:** 401 UNAUTHORIZE<br />
      **Content:** 
      ```json
        {
          "message": "Not authorize delete or update!",
          "status": 401
        }
      ```

      OR

  * **Error Response:**

    * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:** 
      ```javascript
      { error : "Something error message from server" }
      ```  
</details> 
 
 ## Delete Task 

<details>
  <summary>Click to expand!</summary>
  
  ### Delete task

  * **URL**

    `/tasks`
  
  * **URL Headers**
    **required**

    `Id=[integer]`

  * **Method:**

    `DELETE`
  
  * **URL Headers**
    
    **required**
    ```json
      {
        "accesstoken": "accesstoken" 
      }
    ``` 

  * **Success Response**

    * **Code:** 200 <br />
      **Content:** 
      ```json
      {
        "status": 200,
        "message": "Success deleted task!"
      }
      ```
  
  * **Error Response:**

    * **Code:** 401 UNAUTHORIZE <br />
      **Content:** 
      ```json
      {
        "message": "Task id not found!",
        "status": 404
      }
      ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:** 
      ```javascript
      { error : "Something error message from server" }
      ```  
</details>  