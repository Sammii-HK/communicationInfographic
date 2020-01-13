# Communication Infographic

## A history of communication, after 1440

[Live Site](http://onsetlondon.herokuapp.com/): [http://XX.herokuapp.com](http://onsetlondon.herokuapp.com/)

## Timeframe

6 days

## Technologies

- React
- Webpack
- Express
- Ajax
- JavaScript (ES6)
- HTML5
- Bulma (CSS framework)
- SCSS
- GitHub
- React Select

## Project brief

The brief was to build a full-stack application with a React front-end which was running an Express server to load the data which was stored as JSON.

The application is deployed via Git on Heroku and can be found here: [XX](http://xx.herokuapp.com/)

### App overview

My first task, I set about working the algorithms needed for my functions, to place all items on the page. I chose to place the items with maths instead of hard coding the positions, as this added an extra layer of interactivity as every time the page is refreshed the x-axis changed.



[![image](https://user-images.githubusercontent.com/40695746/57919387-a3c91980-7890-11e9-8ce1-8df3f62eeed0.png)](https://user-images.githubusercontent.com/40695746/57919387-a3c91980-7890-11e9-8ce1-8df3f62eeed0.png)

#### Development process

To get myself started with few distractions I worked on a JS, Pug & Express app at first, once the functionality was tested I then migrated my work and adapted my functions to a React app, allowing me greater scope to build onto the project in the future.

##### Project Origins

This project was first created in 2016 as my BA(Hons) Graphic Design dissertation. It's an interactive Infographic which covers the History of Communication. I really wanted to push the boundaries of what was possible within designing my dissertation, not wanting to settle for an essay format.

I relished this opportunity to push my design skills and moulded the constraints of the brief so that I was able to create my first website from the information of my dissertation in a creative and unusual way, which actually enhanced the experience of engaging with the essay.

This project was created with Adobe Muse and was created to be viewed on large desktop screens, the live project can be viewed [here](https://sammiidesign.co.uk/communication_infographic_may16/).

#### Server Side

As the basis of the site was my dissertation I wanted a clean way to handle such a lage amount of data, so chose to convert the essay into JSON, which would be retrieved with Express, and loaded onto my React front end.

```javascript
getData() {
    axios.get('api/data')
      .then(res => {
        this.yAxis(res.data)
      })
      .then(() => console.log(this.state.timeline))
      .catch(err => console.error(err))
  }
```



#### Y Axis

To place the items along the timeline on the y-axis I created a function.

```js
yAxis(data) {
    const y = 10
    const timeline = data.data.map(item => {
      const yAxis = (item.year - 1425) * y
      return { ...item, yAxis }
    })
    this.setState({ timeline })
    this.xAxis()
  }
```

This function first sets a base value of 10, so 1 year is exquivalent of 10px.

It then maps over the data to read the year value within each item object. It uses this value to subtract 1425, this is for visual purposes as the timeline starts at the year 1440, so removes the inital white space. It then takes the value and times it by the base value set for the pixels, so that value can be used to transform the object to 'z'px on the y-axis.

It then sets the data back to state, with a new key of yAxis and the value created.

#### X Axis

The X-Axis function is a little more complex as it is not constant.

##### Main Function

```js
xAxis() {
    const timeline = this.state.timeline.map((item, i) => {
      const xAxis = this.randomNumber()
      return { ...item, xAxis }
    })
    this.setState({ timeline })
    this.overlapCheck()
  }
```

The main function maps over the data set to state, it then creates a random number and sets the data back to state with the new key and value for xAxis.

##### Random Number

```js
randomNumber() {
    const width = document.getElementById('timeline').offsetWidth
    // MAKE A RANDOM VALUE WHICH IS HALF OF TIMELINE WIDTH
    let randomValue = Math.round(Math.random() * (width / 2) - 1)
    // RANDOMLY MAKE THE VALUE POSITIVE OR NEGATIVE
    randomValue = randomValue * this.posOrNeg()
    return randomValue
  }
```

The logic behind placing items on the x-axis is that the items are centered within the viewport, so to scatter them I first find a random number which is half of the timeline container width.
I then randomly make this number positive or negative to offset the items to the left or right of the centre.

This randomly generated value is set to the xAxis variable and set to state.

### Future enhancements

- Working on the overlap check function
- Adding more data to the timeline lines, such as: images, Wikipedialinks
- Add to the functionality of the site
  - Create a search feature
  - Create a timeline navigation to 'jump' to a specific century
  - Add more visual enhancements
  - Make a database which can be added to, edited or deleted from.
