# Worth a Shot - Capstone Project

![Banner](https://user-images.githubusercontent.com/794551/205726200-f641bc94-541e-4c3c-bab1-3647c11cb214.png)

## Revolutionize your nightlife experience

Looking to get back into the nightlife scene? Whether you're a seasoned bar-hopper or just looking to mix things up, Worth a Shot is your new best friend for finding the best nightlife options your city has to offer. With our sleek and user-friendly interface, which works great on both desktop and mobile platforms, our app allows you to search for bars, nightclubs, and other establishments based on type of atmosphere you're looking for. If you've ever felt bored or overwhelmed with the nightlife options in your city, we can help you explore and discover new places to try. Using our unique onboarding process combined with data provided by the Yelp API, we learn about your preferences and tastes, so we can find you the perfect spot for a night out.

In addition to helping you find the best bars and nightclubs, Worth a Shot also offers a feature that allows you to discover new drinks and cocktails. You can browse our curated list to search for a specific type of drink. Each drink comes with a description and a list of ingredients, making it easy for you to try out something new at the bar. No matter if you're looking for a laid-back sports bar or a trendy nightclub, Worth a Shot has you covered.

## Links

- [Deployed Frontend](https://wshot.netlify.app/)
- [Deployed Backend](https://worthashot.fly.dev/)
- [Trello Board](https://trello.com/b/41mhSL26/worth-a-shot-group-6-capstone)
- [Wireframes](https://whimsical.com/worth-a-shot-Ve33oA8m3TCiNNJxam5dGJ)
- [ERD](https://cloud.smartdraw.com/editor.aspx?depoId=39282039&credID=-42278956&pubDocShare=156DAD5C930F80FB15FB0D65C4004AA7BE6)

## Contributors

- [Matt Munroe](https://github.com/MattNMunroe) - Front-End/Synergist
- [Emalee Soto](https://github.com/EmaleeSoto) - Back-End/Team Lead
- [Jonathan Scheiber](https://github.com/Scheiber) - Design/UX Lead

## Technical Details

- This project was created using a React-based front-end, an Express-based back-end, and a PostgreSQL database.
- The front-end is hosted on [Netlify](https://www.netlify.com/) and the back-end is hosted on [Fly.io](https://fly.io/).
- Establishment data is dynamically fetched using the [Yelp Fusion API](https://fusion.yelp.com/), and drink data is stored in [our back-end database](https://worthashot.fly.dev/alcohols).
- This project went from conception to completion in five weeks and was created while fully remote through the [Pursuit](https://www.pursuit.org/) fellowship.

## Local Setup

First, clone this repository to your local machine.

```bash
git clone git@github.com:Scheiber/worthashot.git
```

It is recommended to use two separate terminal instances so that the front-end and back-end can run concurrently.

### Front-end Setup

Prerequisites are Git and Node.js.

First, navigate to the front-end directory.

```bash
cd capstone-worth-a-shot/front-end
```

Next, create a .env file to allow the front-end to access the back-end locally.

```bash
echo "REACT_APP_API_URL=http://localhost:3003\nREACT_APP_YELP_API_URL=http://localhost:3003/bars" >> .env
```

Next, locally install the required node modules.

```bash
npm i
```

Finally, start the server.

```bash
npm start
```

### Back-end Setup

Prerequisites are Git, Node.js, Postgres, and a [Yelp Fusion API key](https://fusion.yelp.com/).

First, navigate to the back-end directory.

```bash
cd capstone-worth-a-shot/back-end
```

Next, create a .env file to access the database locally, inserting your Yelp Fusion API key into the command where indicated.

```bash
echo "PORT=3003\nPG_HOST=localhost\nPG_PORT=5432\nPG_DATABASE=worth_a_shot\nBEARER_TOKEN=[Yelp Fusion API Key goes here]" >> .env
```

Next, locally install the required node modules.

```bash
npm i && npm i -g nodemon
```

Next, initialize and seed the database.

```bash
npm run db
```

Finally, start the server.

```bash
nodemon server.js
```

## Acknowledgments

Much gratitude goes towards our instructors, mentors, and colleagues for their support and encouragement, particularly Myra Smith, Gary Kertis, Tristan Angieri, Maria Masiar, Na'taja Flood, and Lakisha Gonsalves.
