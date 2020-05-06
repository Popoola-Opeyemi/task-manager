// //expected output is 21
var operators = ["-", "+", "*", "/"]
var genRandom = (arr) => { return arr[Math.floor(Math.random() * arr.length)] }
var arithmeticOperator = {
  "+": (a, b) => { return b == undefined ? a : (a + b) },
  "-": (a, b) => { return b == undefined ? a : (a - b) },
  "*": (a, b) => { return b == undefined ? a : (a * b) },
  "/": (a, b) => { return b == undefined ? a : (a / b) },
}

// let rmvItem = (arr, items) => {
//   return items.map((item) => arr = arr.filter((val) => val != item))
// }
let rmvItem = (arr, items) => {

  let find = (arr, item) => {
    let Ifind = arr.find(e => e == item)
    return arr.indexOf(Ifind)
  }
  for (a of items) {
    let Ival = find(arr, a)
    arr.splice(Ival, 1);

  }
  return arr
}


let Handler = () => {
  let arrayValues = [1, 9, 5, 8, 8, 6, 7]
  let Found = 21
  // let arrayValues = [1, 5, 6, 7]

  let twoRandom = () => {
    let arr = arrayValues
    let values = null
    if (arr.length > 2) {
      let item1 = genRandom(arr)
      let item2 = genRandom(arr)
      let boolean = arr.indexOf(item1) != arr.indexOf(item2)
      if (boolean) {
        values = [item1, item2]
      }
      else {
        twoRandom()
      }
      return values
      // return arr.indexOf(item1) != arr.indexOf(item2) ? [item1, item2] : twoRandom()
    }
    else {
      return arr[0]
    }
  }
  console.log(twoRandom())

  let solve = () => {
    let output
    let newArr
    let randVal = twoRandom()
    let op = genRandom(operators)
    output = arithmeticOperator[op](randVal[0], randVal[1])
    if (Number.isInteger(output) && Math.sign(output) != -1) {
      output = output
      console.log(output)
    }

  }

  solve()

}


Handler()


// let Handler = () => {
//   let arrVal = [1, 5, 6, 7]
//   let twoRand = twoRandom




//   let brute = () => {
//     let twoRand = twoRandom()
//     let op = genRandom(operators)
//     let output
//     if (twoRand.length == 2) {
//       output = arithmeticOperator[op](twoRand[0], twoRand[1])
//       if (Number.isInteger(output) && Math.sign(output) != -1) {
//         return output
//       }
//       else {
//         return brute()
//       }
//     }
//     else {
//       return twoRand[0]
//     }
//   }
//   let val = brute()
//   console.log(val)

// }

// Handler()
