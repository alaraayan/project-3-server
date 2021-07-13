# Project 3: Moodflix 

## Overview 
This was the second to last project at General Assembly's Software Engineering Immersive Course. We were given a week to create a full-stack application with 
Express API to serve data from Mongo database. For the front-end we used React.

As a group of three, we decided to build a Moodflix application, a website to display movies (motivated by Netflix design) but with the difference of categorizing them into moods. Additionally giving users who register the ability to add moods to each movie and search accordingly to mood.

Our Deployed Version link: - https://moodflix-site.netlify.app/ 


![Moodflix App](image/moodflix-deployed.png)


link to front-end [click here](https://github.com/rizwanakhtar7/project-3-client)


## Brief
The brief given was to :

- **Build a full-stack application** - by making your own backend and your own front-end
* **Use an Express API** to serve your data from the Mongo database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
* **Have a visually impressive design** 
* **Be deployed online** so it's publicly accessible.

## Techonologies Used
- HTML5,
- CSS3
- React
- JavaScript(ES6)
- Mongoose
- MongoDB
- Express
- Node
- Git
- GitHub
- Google Chrome dev tools
- VScode
- ESlint

 ## Approach
 - **Wireframes / Mockups**
 As part of our sign off process, we had to talk through our wireframes, necessary models for users, models, movies and how they would relate to each other.

Since our group really liked Netflix theme style we decided to make our styling motivated by that, we then created the name Moodflix to incoorporate our own idea into the app.

![Movies Index](image/movies-index.png)

![Home Page](image/home-page.png)

### Building the Back-end 
We began our application by working on the models for the users, movies and moods and how they would interact with each other. Additionally understanding how we would get the data back as JSON and use this to add our moods was another challenge we had to reflect on.

We created all the necessary fields for movies such as:
```  imdb: { type: String, required: false, unique: true, validate: [validator, 'Please add the IMDb ID']  },
  title: { type: String, required: true, unique: true, validate: [validator, 'Please add the movie title']  },
  year: { type: String, required: true, validate: [validator, 'Please add the release year']  },
  rated: { type: String, required: true, validate: [validator, 'Please add the rating']  },
  released: { type: String, required: true, validate: [validator, 'Please add the release date']  },
  runtime: { type: String, required: true, validate: [validator, 'Please add the running time']  },
  genres: {  type: String, required: true, validate: [validator, 'Please add at least one genre'] },
  director: { type: String, required: true, validate: [validator, 'Please add the director']  },
  actors: { type: String, required: true, validate: [validator, 'Please add the cast']  },
  plot: { type: String, required: true, validate: [validator, 'Please add the plot']  },
  language: { type: String, required: true, validate: [validator, 'Please add the language of the movie']  },
  poster: { type: String, required: true, validate: [validator, 'Please add the URL for the movie poster']  },
  ```

Additionally we added moods, ratings and comments as reference and embedded schemas:

```
ratings: { type: [ratingsSchema], required: true, validate: [validator, 'Please make sure ratings are added'] },
  moods: { type: [movieMoodSchema], required: true, validate: [validator, 'Please add your moods for this movie'] },
  comments: { type: [commentSchema], required: false },
```

After this we could successfully implement the controllers and test out all the endpoints which then could be consumed by the front end. Along with the Models for the project, I worked on implementing the all movies , all movie by moods making sure this bought back the correct data.

```
async function showMoviesByMood(req, res, next) {
  try {
    const matchedMood = await Mood.findOne( { _id: req.params.moodId })
    const getMoviesByMood = await Movie.find( { 'moods.mood': matchedMood })
    res.status(201).json(getMoviesByMood)
  } catch (e) {
    next(e)
  }
}
```

```
async function index(req, res, next) {
  try {
    const moviesList = await Movie.find().populate('moods.mood').populate('user')
    res.status(200).json(moviesList)
  } catch (e) {
    next(e)
  }
}
```



### Building the Front-end 
When we moved onto the front-end, we decided to split up to perform individual tasks and collaborate if we needed any help / or found bugs. I decided to work on the Navbar and useState to implement the sideNav bar along with Authentication to make sure the users can only view certain pages when logged in. I used conditional rendering to achieve this :

```
  <div className={sidebarShow ? 'side-nav-menu-container active' : 'side-nav-menu-container'}>
        <ul className="navbar-content-container" onClick={handleSideBar}>
          <li><Link to="/" className="navbar-item" ><FontAwesomeIcon className="fa-items-icon" icon={faHome} />Home</Link></li>
          <li><Link to="/movies" className="navbar-item"><FontAwesomeIcon className="fa-items-icon" icon={faFilm} />Movies</Link></li>
          <li><Link to="/movies/search" className="navbar-item"><FontAwesomeIcon className="fa-items-icon" icon={faSearch} />Search Movies</Link></li>

          {isLoggedIn && <li><Link to="/movies/new" className="navbar-item"><FontAwesomeIcon className="fa-items-icon" icon={faPlus} />Add a Movie</Link></li>}
          {!isLoggedIn ?
            <>
              <li><Link to="/register" className="navbar-item"><FontAwesomeIcon className="fa-items-icon" icon={faUserPlus} />Register</Link></li>
              <li><Link to="/login" className="navbar-item"><FontAwesomeIcon className="fa-items-icon" icon={faUsers} />Log In</Link></li>
            </>
            :
            <>
              <li className="navbar-item logout-link" onClick={handleLogout}><FontAwesomeIcon className="fa-items-icon" icon={faSignOutAlt} />Log out</li>
              <ToastContainer />
            </>
          }
        </ul>
        
      </div>
      ```

      The isLoggedIn will return a boolean, when this is true it will display Links to new movies to adding new movies and Logout links. 

    Alongside this I used React.useState to open and close sidenav accordingly

    ```
      const [sidebarShow, setSidebarShow] = useState(false)

    ```

    When it came to the movies index - I displayed the movies on the page using useState and useEffect to make an axios request and display movies accordingly

    ```
    React.useEffect(() => {
    const getMovieData = async () => {
      try {
        const { data } = await getAllMovies()
        setMovies(data)
      } catch (err) {
        setIsError(true)
      }
    }
    setTimeout(getMovieData, 1000)
  }, [])

```
Then I created a filter function which would manipulate the array of movies to display the correct moods according to the button clicked :

```
const filteredMovies = movies?.filter(movie => {
    if (!selectedMoods.length) {
      return true
    } 
    console.log(selectedMoods)
    return selectedMoods.every(selectedMood => movie.moods.map(m => m.mood.mood).includes(selectedMood))
  }).sort(sortingFunctions.alphabetical)
  
  ```

  Which ever movie was then bought back using handleClick to manipute the user clicking the mood buttons,I used this new filtered array to map through and display on the page accordingly:

  ```
    <div className="movies-container">
            {filteredMovies.map(movie => <MovieCard key={movie._id} {...movie} /> )}
          </div>

  ```

I also had alot of fun implementing the unauthorized and 404 error pages which would display random quotes accordingly when the user accidentally landed on one of these pages.

To do this I created a quotes array with the movies and characters accordingly. Then I created a function which would generate a random quote from the array and then I rendered this using the JSX to display on the page:

```
const quotes = [
    [{ moviename: 'Jaws', character: 'Martin Brody', quote: '\'You\'re gonna need a bigger boat\'' }],
    [{ moviename: 'The Wizard of Oz', character: 'Dorothy Gale', quote: '\'Toto, I\'ve got a feeling we\'re not in Kansas anymore\'' }],
    [{ moviename: 'Apollo 13', character: 'Jim Lovell', quote: '\'Houston, we have a problem\'' }],
    [{ moviename: 'Forrest Gump', character: 'Forrest', quote: '\'Mama always said life was like a box of chocolates. You never know what you\'re gonna get\'' }],
    [{ moviename: 'A Few Good Men', character: 'Col. Nathan R. Jessup', quote: '\'You can\'t handle the truth!\'' }],
    [{ moviename: 'Dirty Dancing', character: 'Johnny Castle', quote: '\'Nobody puts Baby in a corner\'' }],
    [{ moviename: 'Se7en (1995)', character: 'Detective David Mills', quote: '\'What\'s on the page?!\'' }],
    [{ moviename: 'Fight Club (1999)', character: 'The Narrator', quote: '\'I am Jack\'s missing page\'' }],
    [{ moviename: 'Star Wars: Episode IV - A New Hope', character: 'Obi-Wan Kenobi', quote: '\'This is not the webpage you\'re looking for.\'' }]
  ]
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

  ```

  This made the website alot more interactive, and a fun experience for the user.


### Wins and Challenges
I had alot of fun developing this project and learnt a great deal about full stack development. I become comfortable with models in mongoose, seeding data, creating and testing endpoints to manipulate data and most importantly we had amazing team dynamics which allowed us to sail through the week. Although we had alot of trouble with the backend as it was interacting alot of moving parts, we jumped on together as a team to resolve any bugs and help each other when faced with diffculty.
In terms of front end I become comfortable consuming requests from the back end, understanding how to manipulate Array methods to display data as required. I was working on the Navbar component and making sure login and logout worked and displayed correctly for Authenticated users. Also I spent time making sure users can securely navigate around the website.Also working on the movies index and displaying the moods with this too and filtering by mood. Finally I created unauthroized pages to direct the user accordingly with 404 pages, adding our own touch of random quotes when the user would accidentally land on this page.


### Stretch Goals
Although we successfully reached MVP we had some stretch goals we wanted to implement such as :
- Mood Quiz - functionality to quiz the user about how they feel and list movies according to the quiz result or if we found a mood such as depressed / down, to help flip it to positive for the user by listing funny comedies for example.
- I wanted to also try to implement a playlist of favourite movies in relation to each user. They would be able to select there favorites and create a playlist accordingly. Also a seen movie button in the front-end to personalise it for each user.








