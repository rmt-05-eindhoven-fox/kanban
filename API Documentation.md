# User

**Register User**
----
  Add new User in database

* **URL**

  `/register`

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

  `/login`

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


# Task

**Get All Tasks**
----
  Get all tasks data

* **URL**

  `/task`

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

  `/task`

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
    "categoryId" : "1"
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

  `/task/:id`

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


**Change Task Category**
----
  Change task category

* **URL**

  `/task/:id`

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
    "categoryId" : "1",
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