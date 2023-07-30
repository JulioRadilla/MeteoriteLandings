### MeteoriteLandings
An application that provides users with the ability to search all of the known meteorite landings

#### [LIVE LINK](https://meteorite-landigs.onrender.com)

#### Overview

- This app was created for the Chingu Voyage 45 pre-work. It pulls data from the [Meteorite Landings API](https://data.nasa.gov/resource/gh4g-9sfh.json).

#### Main feature

- Users can search names of meteorite landings that took place on earth. When searching, the name of the meteorite landing must be specified by the user, It can be mixed cases and the search will still be successfull. If user inputs a name that is not in the API then it will display no records found.

#### Run this project locally

- Clone this repo.
- Type `cd <repo-name>` in the terminal to get inside the project directory.
- Create a directory named `config` and inside it create your `.env` file. In the `.env` file place your environment variables (In this case the PORT.)
- Type `npm install` in the terminal. 
- Run `npm run start` to start the server.

#### Dependencies

- Express framework
- EJS
- Dotenv
- Axios

#### Dev Dependencies

- TailwindCSS
- Nodemon

#### Background Image credit

- [SVG](https://undraw.co/) by Katerina Limpitsouni on unDraw

#### Fonts from [Google Fonts](https://fonts.google.com/)


