<div align="center">
  <img src="https://i.ibb.co/7bnqVrS/Github-Header.png" alt="Project Banner" width="1200">
</div>

<div align="center">
  <table  caption="Build/Test status badges">
    <thead>
      <tr>
        <th>Frontend CD</th>
        <th>Frontend Cypress Tests</th>
        <th>Backend CD</th>
        <th>Backend Tests</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <a href="https://github.com/arf1e/solita-frontend/actions/workflows/deploy.yml">
            <img src="https://github.com/arf1e/solita-frontend/actions/workflows/deploy.yml/badge.svg">
          </a> 
        </td>
        <td>
          <a href="https://cloud.cypress.io/projects/qmvwo3/runs">
            <img src="https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/simple/qmvwo3&style=flat&logo=cypress">
          </a> 
        </td>
        <td>
        <a href="https://github.com/arf1e/solita-backend/actions/workflows/api-deploy.yml">
            <img src="https://github.com/arf1e/solita-backend/actions/workflows/api-deploy.yml/badge.svg">
          </a> 
        </td>
        <td>
        <a href="https://github.com/arf1e/solita-backend/actions/workflows/api-build-and-test.yml">
          <img src="https://github.com/arf1e/solita-backend/actions/workflows/api-build-and-test.yml/badge.svg">
          </a> 
        </td>
    </tbody>
  </table>
</div>

<h1>Helsinki Bike App - Solita Dev Academy Pre-Assignment</h1>
<p>This is a project that I'm submitting as my <a href="https://github.com/solita/dev-academy-2023-exercise">pre-assignment for Solita Dev Academy 2023</a>. The goal was to create a full-stack app capable of creating and reading data about bike journeys and stations in Helsinki region. <br/> Backend is built with Nest.js, the frontend is implemented using Next.js.</p>
<a href="https://bikeapp.egorushque.com/">🔗 Deployment link</a>

<h2>Implemented features</h2>
<ul>
  <li>CSV data import and validation</li>
  <li>Journeys list page: 
    <ul>
      <li>
        Supports pagination and filtering by departure/return station names, min/max duration and min/max distance
      </li>
      <li>
        Allows sorting by dy distance and duration in asc/desc order.
      </li>
    </ul>
  </li>
  <li>Stations list page: 
    <ul>
      <li>Supports pagination and searching by station name.</li>
    </ul>
  </li>
  <li>Single station page:
    <ul>
      <li>
        Displays general station information.
      </li>
      <li>
        Shows the top 5 most popular return and departure stations for journeys starting and ending at this station.
      </li>
      <li>
        Includes an interactive map displaying the location of the station.
      </li>
    </ul>
  </li>
  <li>Create new entity page:
    <ul>
      <li>
        New station form:
        <ul>
          <li>Provides autocomplete suggestions for station addresses as the user types to make it easier to input the correct address.</li>
          <li>Retrieves the corresponding coordinates and shows marker on the map.</li>
        </ul>
      </li>
      <li>
        New journey form:
        <ul>
          <li>Autocompletes departure and return station names as the user types.</li>
          <li>Displays the markers for the departure and return stations on a map, to give the user a visual representation of the selected stations.</li>
        </ul>
      </li>
    </ul>
  </li>
  <li>
    Status bar to nicely handle app status notifications.
  </li>
</ul>

<h2>Technology choices</h2>

<ul>
  <li>
    <strong>Typescript from end to end</strong>
    <p>It helps me avoid typos and stupid mistakes. Autocomplete comes in handy, too.</p>
  </li>
  <li>
    <strong>Nest.js as a backend framework</strong>
    <p>Nest.js feels like if someone would describe an experience of using Ruby on Rails to a Typescript developer. <br/> I've heard a lot of good stuff about Nest.js, but had never tried it myself until this project. I was thoroughly impressed by how organized and neat a JavaScript backend project can be using this framework. I will definitely consider using it again in the future.</p>
  </li>
   <li>
    <strong>Prisma</strong>
    <p>When experimenting with a new backend framework, I decided to stick with my preferred ORM. Perfect with Typescript.</p>
  </li>
  <li>
    <strong>Next.js</strong>
    <p>I use Next.js every time I need some part of my frontend app to support SSR.</p>
  </li>
</ul>

<h2>Running locally (production mode)</h2>

<strong>Step 0 – Prerequisites</strong>

<p>You will need <a href="https://www.docker.com/products/docker-desktop/">Docker</a> installed on your system in order to run the project since my Makefile script uses docker-compose under the hood. Docker-compose comes together with Docker Desktop, but standalone installations of Docker Engine requires Docker Compose to be installed as a separate package, please see <a href="https://docs.docker.com/compose/install/linux/">this link</a> in that case.</p>

<strong>Step 1 – Clone this repository</strong>

```bash
git clone https://github.com/arf1e/helsinki-bikes.git
```

<strong>Step 2 — Create .env file at the root of the project</strong>

<p>I use Google Maps for handling stations addresses and coordinates, so the app needs your <a href="https://developers.google.com/maps">Google Maps API credentials.</a> <br/>
Your API key should have access to those APIs:
<ul>
  <li>Geocoding API</li>
  <li>Maps JavaScript API</li>
  <li>Places API</li>
</ul>
Apart from that, you will also need to come up with a password for PostgreSQL Database container.<br/>
The content of <code>.env</code> file should contain these properties:
</p>

```
DB_PASSWORD=your-db-password
GOOGLE_MAPS_KEY=your-google-maps-api-key
```

<strong>Step 3 — Run the project</strong>

```bash
make production
```

<p>This command will trigger <code>docker-compose up</code> command, which builds and starts backend, frontend and database containers. <br> Please note that this command will also trigger database seed script.</p>

<strong>Step 4 — Open the app </strong>

<p>Frontend is accessible at <code>localhost:3001</code> and you can also access backend at <code>localhost:3000</code></p>

<h2>Running tests</h2>

<h4>Backend</h4>
<p>I use jest as a test runner for the backend, so this one is pretty straightforward:</p>

```bash
make test-backend
```

<h4>Frontend</h4>
<p>Cypress needs running frontend app for testing, meaning you will need two processes in order to test frontend:</p>

<strong>Step 1 — Run frontend in either dev or production mode (Skippable if you already have the app running with
<code>make production</code> command):</strong>

```bash
make production-frontend
```

or

```bash
make dev-frontend
```

<strong>Step 2 — Run Cypress </strong>

<p>Open new terminal tab and run this command:</p>

```bash
make test-frontend
```

<p>This command will start Cypress runner. Start E2E testing in any browser from the list.</p>

<h2>Running in dev mode</h2>

<h4>Prerequisites</h4>
<p>Please make sure you have your <code>DB_PASSWORD</code> and <code>GOOGLE_MAPS_KEY</code> properties in the <code>.env</code> at the root of the project. <br> Running database image is needed to run backend in dev mode, so you will once again need <a href="https://www.docker.com/products/docker-desktop/">Docker</a> installed on your system. </p>

<h4>Backend</h4>

```bash
make dev-backend
```

<p>This command will create <code>backend/.env</code> file, install backend node_modules and start PostgreSQL Docker image. After that, the backend app is accessible at <code>localhost:3000</code></p>

<h4>Side note: Seeding</h4>
<p>Running the backend in dev mode does not trigger database seed command. Run this command to do so:</p>

```bash
make dev-seed
```

<p>During seeding, the app downloads csv files from urls in <code>backend/prisma/seed-data.json</code> and loads the data from them. You can edit this file in order to add/remove data sources.</p>

<h4>Frontend</h4>

```bash
make dev-frontend
```

<p>This command will create <code>frontend/.env.local</code> file and start Next.js app in dev mode. Since then it is accessible at <code>localhost:3001</code></p>

<h2>Note on this project's git history</h2>
<p>I used git-subtrees to merge <a href="https://github.com/arf1e/solita-frontend">frontend</a> and <a href="https://github.com/arf1e/solita-backend">backend</a> projects in this repo. The whole git history of these projects is accessible here, however sometimes commit messages might be a bit confusing because there is no context on which "end" of the project this commit is for. You can see both histories in the corresponding repos, for this reason I will keep them public as well.
</p>

<h2>Links</h2>
<ul>
  <li><a href="https://www.figma.com/file/fbdL0fnm9EmmUFoviWeIfC/Solita?type=design&node-id=0%3A1&t=9hQrocmK4bebKjYY-1">Figma UI Project</a></li>
  <li><a href="https://bikeapp.egorushque.space/">Deployment</a></li>
  <li><a href="https://github.com/arf1e/solita-frontend">Frontend repository</a></li>
  <li><a href="https://github.com/arf1e/solita-backend">Backend repository</a></li>
</ul>
