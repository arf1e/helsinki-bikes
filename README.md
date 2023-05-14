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
<a href="https://bikeapp.egorushque.space/">🔗 Deployment link</a>

<h2>✅ Implemented features</h2>
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

<h2>🪛 Technology choices</h2>

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
    <p>When experimenting with a new backend framework, I decided to stick with my preferred ORM. If I had to select one favorite feature of Prisma, it would be the autocomplete for relations in the schema file.</p>
  </li>
</ul>

<h2>Running locally (production mode)</h2>

<strong>Step 0 – Prerequisites</strong>

<p>You will need <a href="https://www.docker.com/products/docker-desktop/">Docker</a> installed on your system in order to run the project.</p>

<strong>Step 1 – Clone this repository</strong>

```bash
git clone https://github.com/arf1e/helsinki-bikes.git
```

<strong>Step 2 — Create .env file at the root of the project</strong>

<p>I use Google Maps for handling stations addresses and coordinates, so the app needs your <a href="https://developers.google.com/maps">Google Maps API credentials.</a>
Apart from that, you will also need to come up with a password for PostgreSQL Database container. <br/>
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

<h2>🧪 Running tests</h2>

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
