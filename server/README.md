# API Documentation For KANBAN Board

**Create Task**
----
Create new task object

* **URL**
  
  /tasks

* **Method**

  `POST`

* **URL Params**

  None

* **Data Params**

  ```
    {
      "title": "React is good",
      "category": "Todo"
    }
  ```

* **Success Response**
  * **Code:** 201 CREATED <br/>
    **Content:**
  ```
    {
      "id": 1,
      "title": "React is good",
      "category": "Todo",
      "userId": 1,
      "createdAt": "2020-11-05T09:14:32.076Z",
      "updatedAt": "2020-11-05T09:14:32.076Z"
    }
  ```

* **Error Response**
  * **Code:** 400 BAD REQUEST <br/>
    **Content:**
  ```
  message : "Email must be unique"
  ```
----

**Read Tasks**
----
  Return array of object with data of tasks

* **URL**

  /tasks

* **Method**

  `GET`

* **URL Params**

  None

* **Success Response**
  * **Code:** 200 OK <br/>
    **Content:**
  ```
  [
    {
      "id": 1,
      "title": "React is good",
      "category": "Todo",
      "userId": 1,
      "createdAt": "2020-11-05T09:14:32.076Z",
      "updatedAt": "2020-11-05T09:14:32.076Z"
    },
    {
      "id": 2,
      "title": "Vue is good",
      "category": "On Going",
      "userId": 1,
      "createdAt": "2020-11-05T09:58:09.448Z",
      "updatedAt": "2020-11-05T09:58:09.448Z"
    }
  ]
  ```

* **Error Response**
  * **Code:** 500 INTERNAL SERVER ERROR
---

**Edit Task**
----
  Edit value of task

* **URL**

  /tasks/:id

* **Method**

  `PUT`

* **URL Params**

  **Required:** <br/>
  `id=[integer]`

* **Data Params**

  ```
    {
      "title": "Sequelize ORM",
      "category": "Backlog"
    }
  ```

* **Success Response**

  * **Code:** 200 OK <br/>
    **Content:**

  ```
    {
      "id": "1",
      "title": "Sequelize ORM",
      "category": "Backlog"
    }
  ```

* **Error Response**

  **Code:** 404 NOT FOUND <br/>
  **Content:**

  ```
    "message": "Task not found"
  ```
---

**Edit Task Category**
----
Edit category of tasks

* **URL Params**

  /tasks/:id

* **Method**

  `PATCH`

* **URL Params**

  **Required**

  `id=[integer]`

* **Data Params**

  ```
    {
      "category": "Backlog"
    }
    OR
    {
      "category": "Todo"
    }
    OR
    {
      "category": "On Going"
    }
    OR
    {
      "category": "Completed"
    }
  ```

* **Success Response**
  * **Code:** 200 OK <br/>
    **Content:**
  ```
    {
      "id": 1,
      "title": "React is good",
      "category": "Completed",
      "userId": 1,
      "createdAt": "2020-11-05T09:14:32.076Z",
      "updatedAt": "2020-11-05T09:14:32.076Z"
    }
  ```

* **Error Response**
  * **Code:** 404 NOT FOUND <br/>
    **Content:**
  ```
    {
      "message": "Tasks not found"
    }
  ```
---

**Delete Task**
----
Delete selected task object by id

* **URL**

  /tasks/:id

* **Method**

  `DELETE`

* **URL Params**

  **Required**

  `id=[integer]`

* **Data Params**

  None

* **Success Response**

  * **Code:** 200 OK <br/>
    **Content:**
  ```
    {
      "message": "Tasks successfully deleted!"
    }
  ```

* **Error Response**
  * **Code:** 404 NOT FOUND <br/>
    **Content**
  ```
  {
    "message" : "Task not found"
  }
---

  