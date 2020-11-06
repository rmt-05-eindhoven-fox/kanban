# KANBAN APP #

1. **CREATE TASK**

    * **URL**

      `/kanban`

    * **Method:**

      `POST`

    * **Data Params**

      **Required:**

      - `title = [string]`
      - `description = [string]`
      - `category = [string]`

    * **Success Response:**

      * **Code:** `201 CREATED` <br />
        **Content:** 
        ```json 
        { 
          "id" : 1,
          "title" : "ngoding",
          "description" : "budak ngoding istiqomah",
          "status" : false,
          "due_date" : 2020-12-15
        }
        ```
    
    * **Error Response:**

      * **Code:** `400 BAD REQUEST` <br />
        **Content:** 
        ```json
        { "error" : "Validation Error" }
        ```

      OR

      * **Code:** `500 INTERNAL SERVER ERROR` <br />
        **Content:** 
        ```json
        { "error" : "Internal Server Error" }
        ```

2. **LIST TASK**

    * **URL**

      `/kanban`

    * **Method:**

      `GET`

    * **Success Response:**

      * **Code:** `200 OK` <br />
        **Content:** 
        ```json 
        json [{ 
          "id" : 1,
          "title" : "ngoding",
          "description" : "budak ngoding istiqomah",
          "status" : false,
          "due_date" : 2020-12-15
        },{
          "id" : 2,
          "title" : "mandi",
          "description" : "budak mandi istiqomah",
          "status" : true,
          "due_date" : 2020-10-25
        }]
        ```
    
    * **Error Response:**

      * **Code:** `404 NOT FOUND` <br />
        **Content:** 
        ```json
        { "error" : "ToDo Not Found" }
        ```

      OR

      * **Code:** `500 INTERNAL SERVER ERROR` <br />
        **Content:** 
        ```json
        { "error" : "Internal Server Error" }
        ```

3. **UPDATE TODOS**

    * **URL**

      `/kanban/:id`

    * **Method:**

      `PUT`
      
    *  **URL Params** 

        **Required:**

        - `id = [integer]`

    * **Data Params**

        **Required:**

        - `title = [string]`
        - `description = [string]`
        - `status = [boolean]`
        - `due_date = [date]`

    * **Success Response:**

      * **Code:** `200 OK` <br />
        **Content:** 
        ```json 
        json { 
          "id" : 1,
          "title" : "ngopi",
          "description" : "budak ngopi istiqomah",
          "status" : false,
          "due_date" : 2020-10-27
        }
        ```
    
    * **Error Response:**

      * **Code:** `400 BAD REQUEST` <br />
        **Content:** 
        ```json
        { "error" : "Validation Error" }
        ```

      OR

      * **Code:** `404 NOT FOUND` <br />
        **Content:** 
        ```json
        { "error" : "ToDo Not Found" }
        ```

      OR

      * **Code:** `500 INTERNAL SERVER ERROR` <br />
        **Content:** 
        ```json
        { "error" : "Internal Server Error" }
        ```

5. **DELETE TASK**

    * **URL**

      `/todos/:id`

    * **Method:**

      `DELETE`
      
    *  **URL Params** 

        **Required:**

        - `id = [integer]`

    * **Success Response:**

      * **Code:** `200 OK` <br />
        **Content:** 
        ```json 
        { "message" : "ToDo Deleted Succesfully"}
        ```
    
    * **Error Response:**

      * **Code:** `404 NOT FOUND` <br />
        **Content:** 
        ```json
        { "error" : "ToDo Not Found" }
        ```

      OR

      * **Code:** `500 INTERNAL SERVER ERROR` <br />
        **Content:** 
        ```json
        { "error" : "Internal Server Error" }
        ```
