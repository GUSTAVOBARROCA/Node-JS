/*
    GET - Buscar informação no BackEnd
    POST - Criar informação no Backend
    PUT/PATCH -Alterar/Atualizar informação no Backend
    DELETE - Deletar informação no Backend

    -MIDDLEWARE -Interceptador - Tem o poder de parar ou alterar dados de requisição

 */



const express = require('express')
const uuid = require('uuid')
const port = 3000
const app = express()
app.use(express.json())

// app.get('/users:id', (request , response) => {
   // const {name , age }= request.query // Destructuring Assignment
    //const {id} = request.params 

    // console.log(request)
    // return response.send('Hello Node')
   // console.log(name , age)
    // return response.json({name ,age })
// })

// app.get('/users',(request , response) => {
   
//     const {name, age} = request.body

//     return response.json({name , age})
// })

const users = []
// const myFirstMiddleware = (request , response, next) => {

//     next()
// }

const checkUserId = (request, response , next) => {
    const {id} = request.params

    const index = users.findIndex(user => user.id === id)
    if(index < 0){
        return response.status(404).json({message:"User not found"})
    }
    request.userIndex = index
    request.userId = id

    next()
}


app.get('/users',(request , response) => {
    return response.json(users)
})

app.post('/users',(request , response) => {
    const {name, age} = request.body

    const user = {id:uuid.v4() , name ,age}
    users.push(user)
    return response.status(201).json(user)
})

app.put('/users/:id',checkUserId,(request , response) => {
    const {name, age} = request.body
    const index = request.userIndex
    const id = request.userId
    const updatedUser = { id , name ,age}
   
    users[index] = updatedUser 

    return response.json(updatedUser)
})

app.delete('/users/:id',checkUserId,(request , response) => {
    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()
})







app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})