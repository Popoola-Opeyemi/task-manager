const express = require("express")
require('./db/mongoose')
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')
const app = express()
const port = process.env.PORT || 3000


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})

const User = require("./models/user")
const Task = require("./models/task")

const main = async function () {
  const user = await User.findById("5e7182d3d8e7ea4318c76bf7")
  await user.populate('tasks').execPopulate()
  console.log(user.tasks)
}

// main()


// const jwt = require("jsonwebtoken")

// const nyFunc = async () => {
//   const token = jwt.sign({ _id: '$latii$davido' }, "mynwninfenq19012", { expiresIn: "7 days" })
//   const verify = jwt.verify(token, "mynwninfenq19012")

//   console.log(token)
//   console.log(verify)

// }
// nyFunc()