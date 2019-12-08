/*eslint space-before-function-paren: ["error", "never"]*/
/*eslint-env es6*/

console.log('JS loaded 🍇')

const y = 10
const axisValues = []
let year
let xAxis = 0
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
  // GET WIDTH OF TIMELINE
  width = timeline.offsetWidth
  // tenPerc = (width / 100) * 10
  console.log('width', width)

  // SORT CONTENT BY YEAR
  content.sort(function(a, b) {
    const aYear = parseInt(a.year)
    const bYear = parseInt(b.year)
    return aYear - bYear
  })
  console.log('content 🥝', content)

  content.map(item => {
    // SAVE CREATE DIV AS VAR
    const square = document.createElement('div')
    // SET BASE CLASSES FOR ITEMS
    square.className = `item ${item.key} ${item.category}`
    square.innerHTML = `${item.title} <br> ${item.year}`
    // PUSH ALL ELEMENTS UP FOR AESTHETICS
    year = parseInt(item.year) - 1425
    // PLACE ITEMS ON ITEMLINE USING YEAR VALUE AND VALUE SET FOR 'Y'
    const yAxis = parseInt(year * y)
    // SET TRANSFORM
    square.style.setProperty('--transform-y', `${yAxis}px`)
    // PUSH ELEMENTS TO DOM TIMELINE
    timeline.appendChild(square)
    // SCATTER ITEMS ON TIMELINE
    scatter()
    axisValues.push({ title: item.title, year: item.year, yAxis: yAxis, xAxis: xAxis })
    square.style.setProperty('--transform-x', `${xAxis}px`)
  })
}

const scatter = function() {
  // GET RANDOM VALUE TO OFFSET AXIS, WITH FUNCTION
  xAxis = randomNumber()
  // CHECK FOR OVERLAPS
  axisValues.map((item, i) => {
    if (i === 0) return
    // console.log('xAxis1', xAxis)
    const lastItem = axisValues[ i - 1 ]
    const currentYear = parseInt(item.year)
    const lastYear = parseInt(lastItem.year)
    const axisDifference = Math.abs(lastItem.xAxis - item.xAxis)
    // IF CURRENT ITEM WITHIN 10 YEARS OF THE LAST
    if (currentYear >= lastYear - 10) {
      if (axisDifference <= (width / 10)) {
        console.log('============')
        console.log(item.title, lastItem.title, axisDifference)
        xAxis = randomNumber()
        console.log('xAxis2', xAxis)
      }
    }
  })
}

// MAKE POSITIVE OR NEGATIVE NUMBER
const posOrNeg = function() {
  return Math.random() < 0.5 ? -1 : 1
}

const randomNumber = function() {
  // MAKE A RANDOM VALUE WHICH IS HALF OF TIMELINE WIDTH
  randomValue = Math.round(Math.random() * (width / 2) - 1)
  // RANDOMLY MAKE THE VALUE POSITIVE OR NEGATIVE
  randomValue = randomValue * posOrNeg()
  return randomValue
}

// DOM CONTENT LOADED
document.addEventListener('DOMContentLoaded', () => {
  timeline = document.getElementById('timeline')
  loadData()
})
