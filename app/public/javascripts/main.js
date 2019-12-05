console.log('JS loaded 🍇')

const offset = 200
const y = 10
const xAxisValues = []
const axisValues = []
const xValues = []
const yValues = []
let x
let width
let randomValue
let content
let timeline

function loadData () {
  fetch('./data.json')
    .then(response => {
      return response.json()
    })
    .then(data => {
      content = Object.keys(data).map(i => {
        data[i].key = i
        return data[i]
      })
      makeTimeline()
    })
    .catch(err => {
      console.error(`${err}`)
    })
}

// CREATE ITEMS FROM JSON OBJECTS AND PUSH TO DOM
function makeTimeline() {
  console.log('content 🥝', content)
  // GET WIDTH OF TIMELINE
  width = timeline.offsetWidth
  console.log('width', width)

  content.map(item => {
    // SAVE CREATE DIV AS VAR
    const square = document.createElement('div')
    // SET BASE CLASSES FOR ITEMS
    square.className = `item ${item.key} ${item.category}`
    square.innerHTML = `${item.title} <br> ${item.year}`
    // PUSH ALL ELEMENTS UP FOR AESTHETICS
    const year = parseInt(item.year) - 1425
    // PLACE ITEMS ON ITEMLINE USING YEAR VALUE AND VALUE SET FOR 'Y'
    const yAxis = parseInt(year * y)
    // SET TRANSFORM
    square.style.setProperty('--transform-y', `${yAxis}px`)
    // PUSH ELEMENTS TO DOM TIMELINE
    timeline.appendChild(square)
    // GET POSITION OF ITEM ON THE X AXIS
    x = window.scrollX + document.querySelector('.item').getBoundingClientRect().left
    // GET RANDOM VALUE TO OFFSET AXIS, WITH FUNCTION
    const randomValue = scatter()
    // MAKE PERCENTAGE OF AXIS VALUE WITH RANDOMNUMBER FUNCTION
    const percentage = (x / randomValue)
    let xAxis = x / percentage
    // IF FINAL X AXIS VALUE IS LESS THAN THE BOUNDS OF THE TIMELINE
    if (xAxis <= 0) {
      // MAKE NEW RANDOM NUMBER TO POSITIVE
      xAxis = Math.abs(xAxis)
    } else if (xAxis >= width) { // IF FINAL X AXIS VALUE IS MORE THAN THE BOUNDS OF THE TIMELINE
      // MAKE NEW RANDOM NUMBER TO NEGATIVE
      xAxis -= x
    }
    xAxisValues.push([ yAxis, xAxis ])
    axisValues.push({ xAxis: xAxis, yAxis: yAxis })
    // xValues.push(xAxis)
    // yValues.push(yAxis)
    square.style.setProperty('--transform-x', `${xAxis}px`)
  })
  overlayCheck()
}

const lastValue = axisValues[axisValues.length-1]

const overlayCheck = function() {
  axisValues.map((item, i) => {
    const lastItem = axisValues[ i - 1 ]
    console.log('item', item)
    console.log('lastItem', lastItem)
    console.log('==========')
  })
  // Object.keys(xAxisValues).forEach(e => console.log(`key=${e}  value=${xAxisValues[e]}`))
  // xAxisValues[1].sort()
  // xAxisValues = xAxisValues.sort(function( a,b ) { return a[0] < b[0] })

  // xAxisValues.map(item => {
  //   console.log('item', item)
  // //   const yValue = item[0]
  // //   const xValue = item[1]
  // // IF THE CURRENT ITEM Y AXIS IS WITHIN 50 YEARS OF THE LAST ITEMS Y AXIS VALUE
  // // for(let i = 1; i < xAxisValues.length; i++) {
  //   //
  //   // }
  //   // while (item[i][0] <= (item[i--][0] - 50)) {
  //   // // while (item[i][0] <= item[(i - 1)][0 - 50]) {
  //   //   item[0] = scatter()
  //   // }
  //   // console.log('item[0]', item[0])
  //   // console.log('item[1]', item[1])
  // })
  console.log('xAxisValues', xAxisValues)
  console.log('axisValues', axisValues)
}

const scatter = function() {
  // MAKE POSITIVE OR NEGATIVE NUMBER
  const posOrNeg = Math.random() < 0.5 ? -1 : 1
  // MAKE A RANDOM VALUE
  randomValue = Math.round(Math.random() * offset - 1)
  // RANDOMLY MAKE THE VALUE POSITIVE OR NEGATIVE
  randomValue = randomValue * posOrNeg
  return randomValue
}

// DOM CONTENT LOADED
document.addEventListener('DOMContentLoaded', () => {
  timeline = document.getElementById('timeline')
  // itemContainer = document.getElementById('item')
  loadData()
})
