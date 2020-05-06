require('../src/db/mongoose')
const User = require('../src/models/user')

// 5e69aaf8a2135c376007fa6b

// User.findByIdAndUpdate('5e69ad689c3ea72cecc4188e', { age: 99 }).then((user) => {
//   console.log(user)

//   return User.countDocuments({ age: 0 })

// }).then((result) => {
//   console.log(result)
// }).catch((err) => {
//   console.log(err)
// })

const updateAgeCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age })
  const count = await User.countDocuments({ age })
  return { count, user }

}

updateAgeCount("5e6a9d4211ae2633cc31a441", 19).then((count) => {
  console.log(count)
}).catch((err) => {
  console.log(err)
})