# User

**Register**
----

  Add new user to database

* **URL**

  `/register`

* **Method:**

  `/POST`

**Request:**

**Data Params**
```
  {
    "username": "tes123",
    "email": "tes123@mail.com",
    "password": "321tes"
  }
```

**Success Response:**
* **Code:** 201 CREATED

**Error Response:**
* **Code:** 400 BAD REQUEST
  **msg**
  ```
  {
    "msg:" "error message"
  }
  ```
**OR**
* **Code:** 500 INTERNAL SERVER ERROR
----

**Login**
----
  Login for users

* **URL**

  `/login`

* **Method:**

  `/POST`

**Request:**

**Data Params**
```
  {
    "username": "tes123",
    "password": "321tes"
  }
```

**Success Response:**
* **Code:** 200 OK

**Error Response:**
* **Code:** 400 BAD REQUEST
  **msg**
  ```
  {
    "msg:" "error message"
  }
  ```
**OR**
* **Code:** 500 INTERNAL SERVER ERROR
----

# Task

**Show all tasks**
  Show all tasks from database

  * **URL**

  `/tasks`

* **Method:**

  `/GET`

**Request:**

**Header Param**
```
  {
    "access_token"
  }
```

**Success Response:**
* **Code:** 200 OK
  **content**
  ```
  [
    {

    }
  ]
  ```
**Error Response:**
* **Code:** 400 BAD REQUEST
  **msg**
  ```
  {
    "msg:" "error message"
  }
  ```
**OR**
* **Code:** 500 INTERNAL SERVER ERROR
----