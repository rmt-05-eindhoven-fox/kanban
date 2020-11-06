# Fancy Task API Documentation

## 1. Add new Task

* URL

    /tasks

* Method

    `POST`

* URL Params

    None

* Data Params

    ```
    {
        "title" : "Task Title",
        "description" : "Task Description",
        "category" : backlog / todo / doing / done",
    }, 
    {
        headers: {access_token}
    }
    ```

* Success Response
    
    Code: `201 CREATED`
    
    Content:
    
    ```
    {
        "title" : "Task Title",
        "description" : "Task Description",
        "category" : backlog / todo / doing / done",
    }
    ```

* Error Response
    
    Code: `400 BAD REQUEST`
    
    Content:
    
    ```
    {
        error: ['Title is required', 
                ...,
                'Description is missing']
    }
    ```

    Code: `500 INTERNAL SERVER ERROR`
    
    Content:
    
    ```
    {
        error: 'Our server ran into troubles. Please wait few moments for our engineer to fix                 the problem.'
    }
    ```
    
    Code: `401 Authentication Failed`
    
    Content:
        
    ```
    {
        err: 'Access Token not found in headers'
    }
    ```
    
## 2. Get all Todos

* URL

    /tasks

* Method

    `GET`

* URL Params

    None

* Data Params

    {
        headers: {access_token}
    }


* Success Response
        
    Code: `200 OK`
        
    Content:
    ```
    [
        {
            "id" : 1,
            "title" : "Task Title",
            "description" : "Task Description",
            "category" : backlog / todo / doing / done",
        },
        {
            "id" : 2,
            "title" : "Task Title",
            "description" : "Task Description",
            "category" : backlog / todo / doing / done",
        }
    ]
    ```

* Error Response
    
    Code: `500 INTERNAL SERVER ERROR`
    
    Content:
        
    ```
    {
        error: 'Our server ran into troubles. Please wait few moments for our engineer to fix                 the problem.'
    }
    ```
    
    Code: `401 Authentication Failed`
    
    Content:
        
    ```
    {
        err: 'Access Token not found in headers'
    }
    ```

## 3. Get specific Task by ID

* URL

    /tasks/:id

* Method

    `GET`

* URL Params

    Required: `id = [integer]`

* Data Params

    ```
    {
        headers: {access_token}
    }
    ```


* Success Response
        
    Code: `200 OK`
        
    Content:
    
    ```
    {
        "id" : 1,
        "title" : "Task Title",
        "description" : "Task Description",
        "category" : backlog / todo / doing / done",
    },
    ```

* Error Response
    
    Code: `404 NOT FOUND`
    
    Content:
        
    ```
    {
        error: 'Content not found.'
    }
    ```
    
    Code: `500 INTERNAL SERVER ERROR`
    
    Content:
        
    ```
    {
        error: 'Our server ran into troubles. Please wait few moments for our engineer to fix the problem.'
    }
    ```
    
    Code: `401 Authentication Failed`
    
    Content:
        
    ```
    {
        err: 'Access Token not found in headers'
    }
    ```
    
## 4. Edit Task by ID

* URL

    /tasks/:id

* Method

    `PUT`

* URL Params

    Required: `id = [integer]`

* Data Params

    ```
    {
        "title" : "Edited Task Title",
        "description" : "Edited Task Description",
        "category" : "Task Category",
    },
    {
        headers: {access_token}
    }
    ```


* Success Response
        
    Code: `200 OK`
        
    Content:
    
    ```
    {
        "id" : 1,
        "title" : "Edited Task Title",
        "description" : "Edited Task Description",
        "category" : "Task Category",
    },
    ```

* Error Response

    Code: `400 BAD REQUEST`
    
    Content:
```
{
    error: ['Title is required', 
            ...,
            'Description is missing']
}
```
    
    Code: `404 NOT FOUND`
    
    Content:
        
    ```
    {
        error: 'Content not found.'
    }
    ```
    
    Code: `500 INTERNAL SERVER ERROR`
    
    Content:
        
    ```
    {
        error: 'Our server ran into troubles. Please wait few moments for our engineer to fix the problem.'
    }
    ```
    
    Code: `401 Authentication Failed`
    
    Content:
        
    ```
    {
        err: 'Access Token not found in headers'
    }
    ```
    
## 5. Update Task Category by ID

* URL

    /tasks/:id

* Method

    `PATCH`

* URL Params

    Required: `id = [integer]`
    
* Data Params

    ```
    {
        "category" : "backlog / todo / doing / done"
    },
    {
        headers: {access_token}
    }
    ```


* Success Response
        
    Code: `200 OK`
        
    Content:
    
    ```
    {
        "id" : 1,
        "title" : "Task Title",
        "description" : "Task Description",
        "category" : "Edited Task Category",
    },
    ```

* Error Response
    
    Code: `404 NOT FOUND`
    
    Content:
        
    ```
    {
        error: 'Content not found.'
    }
    ```
    
    Code: `500 INTERNAL SERVER ERROR`
    
    Content:
        
    ```
    {
        error: 'Our server ran into troubles. Please wait few moments for our engineer to fix the problem.'
    }
    ```
    
    Code: `401 Authentication Failed`
    
    Content:
        
    ```
    {
        err: 'Access Token not found in headers'
    }
    ```

## 6. Delete specific Task by ID

* URL

    /tasks/:id

* Method

    `DELETE`

* URL Params

    Required: `id = [integer]`

* Data Params
    
    ```
    {
        headers: {access_token}
    }
    ```


* Success Response
        
    Code: `200 OK`
        
    Content:
    
    ```
    {
        "message" : "Successfuly deleted Task"   
    }
    ```

* Error Response
    
    Code: `404 NOT FOUND`
    
    Content:
        
    ```
    {
        error: 'Content not found.'
    }
    ```
    
    Code: `500 INTERNAL SERVER ERROR`
    
    Content:
        
    ```
    {
        error: 'Our server ran into troubles. Please wait few moments for our engineer to fix the problem.'
    }
    ```
    
    Code: `401 Authentication Failed`
    
    Content:
        
    ```
    {
        err: 'Access Token not found in headers'
    }
    ```
    
## 7. User Registration

* URL

    /users/register

* Method

    `POST`

* URL Params

    None

* Data Params

    ```
    {
        "username" : "Username",
        "email" : "Email",
        "passsword" : "Password",
    }, 
    ```

* Success Response
    
    Code: `201 CREATED`
    
    Content:
    
    ```
    {
        "id" : "id",
        "username" : "Username",
        "email" : "Email",
    }, 
    ```

* Error Response
    
    Code: `400 BAD REQUEST`
    
    Content:
    
    ```
    {
        error: ['Invalid username', 
                ...,
                'Password is required']
    }
    ```

    Code: `500 INTERNAL SERVER ERROR`
    
    Content:
    
    ```
    {
        error: 'Our server ran into troubles. Please wait few moments for our engineer to fix                 the problem.'
    }
    ```
    
## 8. User Login

* URL

    /users/login

* Method

    `POST`

* URL Params

    None

* Data Params

    ```
    {
        "email" : "Email",
        "passsword" : "Password",
    }, 
    ```

* Success Response
    
    Code: `201 CREATED`
    
    Content:
    
    ```
    {
        "access_token" : access_token
    }, 
    ```

* Error Response
    
    Code: `400 BAD REQUEST`
    
    Content:
    
    ```
    {
        error: ['Email/password didn't match']
    }
    ```

    Code: `500 INTERNAL SERVER ERROR`
    
    Content:
    
    ```
    {
        error: 'Our server ran into troubles. Please wait few moments for our engineer to fix                 the problem.'
    }
    ```
    
## 8. User Google SignIn

* URL

    /users/google-login

* Method

    `POST`

* URL Params

    None

* Data Params

    ```
    {
        GoogleAccountInformation
    }, 
    ```

* Success Response
    
    Code: `201 CREATED`
    
    Content:
    
    ```
    {
        "access_token" : access_token
    }, 
    ```

* Error Response

    Code: `500 INTERNAL SERVER ERROR`
    
    Content:
    
    ```
    {
        error: 'Our server ran into troubles. Please wait few moments for our engineer to fix                 the problem.'
    }
    ```
    