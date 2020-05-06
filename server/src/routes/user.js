const express = require('express')
const User = require("../models/user")
const auth = require("../middleware/auth")

const router = new express.Router()

router.post("/users", async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (error) {
    console.log("an error occured")
    res.status(400).send(error)
  }
})

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()

    res.send({ user, token })
  } catch (error) {
    console.log(error)
    res.status(400).send()
  }
})

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token
    })
    await req.user.save()
    res.send()
  } catch (error) {
    res.sendStatus(500)

  }
})


router.post("/users/logoutall", auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send(200)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user)
})



// router.get("/users", auth, async (req, res) => {
//   try {
//     const users = await User.find({})
//     res.send(users)
//   } catch (error) {
//     console.log("an error occured")
//     res.status(500).send(err)
//   }
// })

// router.get("/users/:id", auth, async (req, res) => {
//   const _id = req.params.id
//   console.log(_id)

//   try {
//     const user = await User.findById(_id)

//     if (!user) {
//       return res.status(404).send()
//     }
//     res.send(user)

//   } catch (error) {
//     res.status(500).send(error)
//   }
// })

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowed = ['name', 'email', 'password', 'age']
  const invalidOperation = updates.every((update) => allowed.includes(update))
  if (!invalidOperation) {
    return res.status(400).send({ error: 'invalid Operation' })
  }
  try {
    updates.forEach((update) => req.user[update] = req.body[update])
    await req.user.save()

    // let user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    res.send(req.user)

  } catch (error) {
    res.status(400).send(error)
  }
})


// router.patch("/users/:id", async (req, res) => {
//   const updates = Object.keys(req.body)
//   const allowed = ['name', 'email', 'password', 'age']
//   const invalidOperation = updates.every((update) => allowed.includes(update))
//   if (!invalidOperation) {
//     return res.status(400).send({ error: 'invalid Operation' })
//   }
//   try {
//     const user = await User.findById(req.params.id)
//     updates.forEach(() => user[updates] = req.body[updates])
//     await user.save()

//     // let user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
//     if (!user) {
//       return res.status(404).send()
//     }

//     res.send(user)

//   } catch (error) {
//     res.status(400).send(error)
//   }
// })

router.delete("/users/me", auth, async (req, res) => {
  try {
    // let user = await User.findByIdAndDelete(req.user._id)
    await req.user.remove()
    res.send(req.user)

  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

module.exports = router