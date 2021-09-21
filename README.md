# `ARCHI.VIN` <br />
made by Quiahn Ballou

## `Urls`
- [Front End GitHub Link](https://github.com/Quiahn/archi.vin "Archi.vin's Front-End Repository")
- [Deployed Site](https://niq-project.github.io/niq/ "Monthly Website")
- [Back-End](https://git.heroku.com/monthly-backend.git "Monthly's Back-End Website")

## `Pitch`
Archi.vin is a audio file sharing service where you can upload songs and share it with just a url.

## `How It Works`
Users get started by creating an account then logging in. From there they can upload songs and get a url to share them.

## `API Routes`

### `/sign-up`
- Used for signing up a user
- Method: POST
- Expects:
  - Email, Password, Password Confirmation
  - Example:
``` js
const signUp = (credentials) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/sign-up/',
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password,
        password_confirmation: credentials.passwordConfirmation
      }
    }
  })
}
```

### `/sign-in`
- Used for signing in a user
- Method: POST
- Expects:
  - Email, Password
  - Example:
``` js
const signIn = (credentials) => {
  return axios({
    url: apiUrl + '/sign-in/',
    method: 'POST',
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password
      }
    }
  })
}
```

### `/sign-out`
- Used for signing out a user
- Method: DELETE
- Expects:
  - User Token
  - Example:
``` js
const signOut = (user) => {
  return axios({
    url: apiUrl + '/sign-out/',
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
```

### `/change-password`
- Used for changing a users password
- Expects:
  - User Token, Old Password, New Password
  - Example:
``` js
const changePassword = (passwords, user) => {
  return axios({
    url: apiUrl + '/change-password/',
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      passwords: {
        old: passwords.oldPassword,
        new: passwords.newPassword
      }
    }
  })
}
```

### `/lists`
- Used for show all list
- Method: GET
- Expects: 
  - User Token
  - Example:
``` js
const indexList = (user) => {
  return axios({
    url: apiUrl + '/lists',
    method: 'get',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
```

### `/lists`
- Used to create a list 
- Method: POST
- Expects:
  - User Token, List Name, List Month
  - Example:
``` js
const createList = (data, user) => {
  return axios({
    url: apiUrl + '/lists',
    method: 'post',
    data: { list: data },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
```

### `/lists/:id`
- Used for getting a single list
- Method: GET
- Expects:
  - User Token
  - Example:
``` js
const showList = (id, user) => {
  return axios({
    url: apiUrl + '/lists/' + id,
    method: 'get',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
```

### `/lists/:id`
- Used to update a list
- Method: PATCH
- Expects:
  - User Token, List Name, List Month
  - Example:
``` js
const updateList = (listData, id, user) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/lists/' + id,
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: { list: listData }
  })
}
```

### `/lists/:id`
- Used for deleting a list
- Method: DELETE
- Expects:
  - User Token
  - Example:
``` js
const deleteList = (id, user) => {
  return axios({
    url: apiUrl + '/lists/' + id,
    method: 'delete',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
```

### `/tasks/:id`
- Used for creating a task
- Method: POST
- Expects:
  - User Token, Task Name, Task Done (Boolean)
  - Example:
``` js
const createTask = (id, data, user) => {
  return axios({
    url: apiUrl + '/tasks/' + id,
    method: 'post',
    data: { task: data },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
```

### `/tasks/:id/:taskId`
- Used for showing task
- Method: GET
- Expects:
  - User Token
  - Example:
``` js
const showTask = (id, user, taskId) => {
  return axios({
    url: apiUrl + '/tasks/' + id + '/' + taskId,
    method: 'get',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
```

### `/tasks/:id/:taskId`
- Used for updating a task
- Method: PATCH
- Expects:
  - User Token, Task Name, Task Done (Boolean)
  - Example:
``` js
const updateTask = (taskData, id, user, taskId) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/tasks/' + id + '/' + taskId,
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: { task: taskData }
  })
}
```

### `/tasks/:id/:taskId`
- Used for deleting a task
- Method: DELETE
- Expects:
  - User Token
  - Example:
``` js
const deleteTask = (id, user, taskId) => {
  return axios({
    url: apiUrl + '/tasks/' + id + '/' + taskId,
    method: 'delete',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
```



## `ERD`
A user has a many list and the list has many items.
![ERD Image](https://i.imgur.com/VAtPHTv.png)

## `Planning Time Table`

### Day 1:
- Plan for project
- Set up api repo
- Set up front end repo

### Day2:
- Start back-end routes and test with postman
- Start front-end

### Day3:
- Keep working on front-end and back-end
- plan for styling

### Day 4:
- Finish front-end
- Finish back-end
- Start styling

### Day 5:
- Complete Styling

## `Technology Used`

### Azure Blob Storage
### Cosmos DB
### React
### Axios
### Bootstrap
### SASS
### Express
### Mongoose
### Mongo
### Passport
### JWT
### BCrpyt


## `Unsolved Problems`

- Archives: A invite only collection of songs that can be added to by members with higher roles
- Files can have a password when shared to be more private
- Support for more file types
- Remember me feature
