# User

**Register User**
----
  Add new User in database

* **URL**

  `/user/register`

* **Method:**
  
  `POST` 

**Request :**

**Data Params**
```json
  {
    "name" : "John Doe",
    "email" : "johndoe@example.com",
    "password" : "johndoepassword"
  }
  ```

**Success Response:**

  * **Code:** 201 CREATED <br />

 
**Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **message** 
    ```json
      {
        "message" : "error message"
      }
    ```
    
  **OR**
  * **Code:** 500 INTERNAL SERVER ERROR<br />




**User Login**
----
  User login

* **URL**

  `/user/login`

* **Method:**
  
  `POST` 

**Request :**

**Data Params**
```json
  {
    "email" : "johndoe@example.com",
    "password" : "johndoePassword"
  }
```


**Success Response:**

  * **Code:** 200 OK <br />
  **Content:** 
  ```json
    {
      "access_token"
    }
  ```


**Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **message** 
    ```json
      {
        "message" : "error message"
      }
    ```
    
  **OR**
  * **Code:** 401 UNAUTHORIZED<br />

  **OR**

  * **Code:** 500 INTERNAL SERVER ERROR<br />


**User Google Login**
----
  User Google login

* **URL**

  `/user/login-google`

* **Method:**
  
  `POST` 

**Request :**

**Header Params**
```json
  {
    "google_access_token"
  }
```


**Success Response:**

  * **Code:** 200 OK <br />
  **Content:** 
  ```json
    {
      "access_token"
    }
  ```


**Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **message** 
    ```json
      {
        "message" : "error message"
      }
    ```
    
  **OR**
  * **Code:** 401 UNAUTHORIZED<br />

  **OR**

  * **Code:** 500 INTERNAL SERVER ERROR<br />



# Category

**Get All Categories**
----
  Get all categories

* **URL**

  `/tasks/cat`

* **Method:**
  
  `GET` 

**Request :**

**Header Params**
```json
  {
    "access_token"
  }
```


**Success Response:**

  * **Code:** 200 OK <br />
  **Content:** 
  ```json
  [
    {
        "id": 1,
        "name": "Backlog"
    },
    {
        "id": 2,
        "name": "Todo"
    },
    {
        "id": 3,
        "name": "Doing"
    },
    {
        "id": 4,
        "name": "Done"
    }
  ]
  ```


**Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **message** 
    ```json
      {
        "message" : "error message"
      }
    ```

  **OR**

  * **Code:** 500 INTERNAL SERVER ERROR<br />

**Add Category**
----
  Add a Category

* **URL**

  `/tasks/cat`

* **Method:**
  
  `POST` 

**Request :**

**Header Params**
```json
  {
    "access_token"
  }
```

**Data Params**
```json
  {
    "name" : "New Category Name"
  }
```


**Success Response:**

  * **Code:** 200 OK <br />
  **message**
  ```json
    {
      "message" : "Task successfully added'
    }
  ```


**Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **message** 
    ```json
      {
        "message" : "error message"
      }
    ```

  **OR**

  * **Code:** 500 INTERNAL SERVER ERROR<br />


**Get All Categories**
----
  Get all categories

* **URL**

  `/tasks/cat`

* **Method:**
  
  `GET` 

**Request :**

**Header Params**
```json
  {
    "access_token"
  }
```


**Success Response:**

  * **Code:** 200 OK <br />
  **Content:** 
  ```json
  [
    {
        "id": 1,
        "name": "Backlog"
    },
    {
        "id": 2,
        "name": "Todo"
    },
    {
        "id": 3,
        "name": "Doing"
    },
    {
        "id": 4,
        "name": "Done"
    }
  ]
  ```


**Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **message** 
    ```json
      {
        "message" : "error message"
      }
    ```

  **OR**

  * **Code:** 500 INTERNAL SERVER ERROR<br />


**Edit Category Name**
----
  Rename a category

* **URL**

  `/tasks/cat/:id`

* **Method:**
  
  `PATCH` 

**Request :**

**URL Params**

  Category id, `id = [INTEGER]`

**Header Params**
```json
  {
    "access_token"
  }
```

**Data Params**
```json
  {
    "name" : "Edited Category Name"
  }
```


**Success Response:**

  * **Code:** 200 OK <br />
  **message**
  ```json
    {
      "message" : "Category renamed successfully'
    }
  ```


**Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **message** 
    ```json
      {
        "message" : "error message"
      }
    ```

  **OR**

  * **Code:** 500 INTERNAL SERVER ERROR<br />


**Remove/Delete a Category**
----
  Remove/Delete a Category

* **URL**

  `/tasks/cat/:id`

* **Method:**
  
  `DELETE` 

**Request :**

**URL Params**

  Category id, `id = [INTEGER]`

**Header Params**
```json
  {
    "access_token"
  }
```

**Success Response:**

  * **Code:** 200 OK <br />
  **message**
  ```json
    {
      "message" : "Category deleted'
    }
  ```


**Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **message** 
    ```json
      {
        "message" : "error message"
      }
    ```

  **OR**

  * **Code:** 500 INTERNAL SERVER ERROR<br />

# Task

**Get All Tasks**
----
  Get all tasks data

* **URL**

  `/tasks`

* **Method:**
  
  `GET` 

**Request :**

**Header Params**
```json
  {
    "access_token"
  }
```


**Success Response:**

  * **Code:** 200 OK <br />
  **Content:** 
  ```json
  [
    {
      "id" : "1",
      "description" : "new Task",
      "UserId" : "2",
      "CategoryId" : "1",
      "User" : {
        "id" : "2",
        "name" : "User"
      },
      "Category" : {
        "id" : "3",
        "name" : "backlog"
      }
    }
  ]
  ```


**Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **message** 
    ```json
      {
        "message" : "error message"
      }
    ```
    
  **OR**
  * **Code:** 401 UNAUTHORIZED<br />

  **OR**

  * **Code:** 500 INTERNAL SERVER ERROR<br />


**Add New Task**
----
  Create new Task

* **URL**

  `/tasks`

* **Method:**
  
  `POST` 

**Request :**

**Header Params**
```json
  {
    "access_token"
  }
```


**Data Params**
```json
  {
    "description" : "Task Description",
    "CategoryId" : "1"
  }
```


**Success Response:**

  * **Code:** 200 OK <br />
  **Content:** 
  ```json
    {
      "id" : "taskId"
    }
  ```


**Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **message** 
    ```json
      {
        "message" : "error message"
      }
    ```
    
  **OR**
  * **Code:** 401 UNAUTHORIZED<br />

  **OR**

  * **Code:** 500 INTERNAL SERVER ERROR<br />


**Edit Task Description**
----
  Edit Task Description

* **URL**

  `/tasks/:id`

* **Method:**
  
  `PUT` 

**Request :**

**URL Params**

  **Required :**
  
  `id = [Integer]`


**Header Params**
```json
  {
    "access_token"
  }
```


**Data Params**
```json
  {
    "description" : "Task Description",
  }
```


**Success Response:**

  * **Code:** 200 OK <br />



**Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **message** 
    ```json
      {
        "message" : "error message"
      }
    ```
    
  **OR**
  * **Code:** 401 UNAUTHORIZED<br />

  **OR**

  * **Code:** 500 INTERNAL SERVER ERROR<br />


**Delete Task**
----
  Delete task by Id

* **URL**

  `/tasks/:id`

* **Method:**
  
  `DELETE` 

**Request :**

**URL Params**

  **Required :**
  
  `id = [Integer]`


**Header Params**
```json
  {
    "access_token"
  }
```


**Success Response:**

  * **Code:** 200 OK <br />



**Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **message** 
    ```json
      {
        "message" : "error message"
      }
    ```
    
  **OR**
  * **Code:** 401 UNAUTHORIZED<br />

  **OR**

  * **Code:** 500 INTERNAL SERVER ERROR<br />




**Change Task Category**
----
  Change task category

* **URL**

  `/tasks/:id`

* **Method:**
  
  `PATCH` 

**Request :**

**URL Params**

  **Required :**
  
  `id = [Integer]`


**Header Params**
```json
  {
    "access_token"
  }
```


**Data Params**
```json
  {
    "CategoryId" : "1",
  }
```


**Success Response:**

  * **Code:** 200 OK <br />



**Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **message** 
    ```json
      {
        "message" : "error message"
      }
    ```
    
  **OR**
  * **Code:** 401 UNAUTHORIZED<br />

  **OR**

  * **Code:** 500 INTERNAL SERVER ERROR<br />