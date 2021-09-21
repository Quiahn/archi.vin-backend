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

### `/list-blobs/`
- Used to list all stored items
- Method: POST
- Expects:
  - User Token
  - User Id
  - Example:
``` js
const indexBlob = (user) => {
    return axios({
        url: apiUrl + '/list-blobs/',
        method: 'POST',
        headers: {
            Authorization: `Bearer ${user.token}`
        },
        data: user
    })
}
```

### `/blobs`
- Used to create a storage item
- Method: POST
- Expects:
  - User Token, FormData (that includes a file, title, artist, and User Id)
  - Example:
``` js
const createBlob = (user, data) => {
    return axios({
        method: 'POST',
        url: apiUrl + '/blobs',
        headers: {
            Authorization: `Bearer ${user.token}`
        },
        data: data
    })
}
```

### `/blobs/:id`
- Used for getting a specific storage item
- Method: GET
- Expects:
  - Storage Item Id
  - Example:
``` js
const showBlob = (id) => {
    return axios({
        url: apiUrl + '/blobs/' + id,
        method: 'GET'
    })
}
```

### `/blobs/:id`
- Used to update a storage item
- Method: PATCH
- Expects:
  - User Token, User Object, Storage Item Id, FormData (that includes a file, title, artist, and User Id)
  - Example:
``` js
export const editBlob = (user, id, data) => {
    return axios({
        url: apiUrl + '/blobs/' + id,
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${user.token}`
        },
        data: data
    })
}
```

### `/blobs/:id`
- Used for deleting a storage item
- Method: DELETE
- Expects:
  - User Token, Storage Item Id
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

## `ERD`
A user has a many list and the list has many items. <br />
![ERD Image](https://i.imgur.com/rkqQgOn.png)

## `Planning Time Table`

### Day 1:
- Plan for project
- Set up api repo
- Set up front end repo

### Day2:
- Start back-end routes
- Start learning azure blob storage & cosmos db

### Day3:
- Get storage and database functionality working
- Finish back-end crud

### Day 4:
- Start front-end
- Finish back-end
- Start styling

### Day 5:
- Complete front-end
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
