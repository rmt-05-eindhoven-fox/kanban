# KANBAN

## **Show All Tasks**

Show all tasks regardless of who logged in (all data showed).

- **URL**

  /tasks

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  None

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content Example:** `{ "id": 4, "title": "KELARIN PROYEK", "description": "TANPA PAKE CLIENT", "category": "backlog", "UserId": 5, "createdAt": "2020-11-04T16:05:59.560Z", "updatedAt": "2020-11-04T16:05:59.560Z" }`

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{msg: "Authentication failed"} `

  OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal Server Error" }`

- **Sample Call:**

  ```javascript
  $.ajax({
    url: "/users/1",
    dataType: "json",
    type: "GET",
    success: function (r) {
      console.log(r);
    },
  });
  ```

## **Add Task**

Add task.

- **URL**

  /tasks

- **Method:**

  `POST`

- **URL Params**

  **Required:**

  None

- **Data Params**

  `{ title=[string], description=[string], category=[string] }`

- **Success Response:**

  - **Code:** 201 <br />
    **Content Example:** `{ msg: "Successfully created" }`

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Please fill the title" } / { msg : "Please fill the description" } / { msg : "Please fill the category" } `

  OR

  - **Error Response:**

  - **Code:** 401 NOT AUTHORIZED <br />
    **Content:** `{ msg : "Your away from the app for God knows how long! Please relogin!" } `

  OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal Server Error" }`

- **Sample Call:**

  ```javascript
  $.ajax({
    url: "/users",
    dataType: "json",
    type: "POST",
    success: function (r) {
      console.log(r);
    },
  });
  ```
