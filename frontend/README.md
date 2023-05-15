<div align="center">
  <img src="https://i.ibb.co/7bnqVrS/Github-Header.png" alt="Project Banner" width="1200">
</div>

<div align="center">
  <table caption="Build/Test status badges">
    <thead>
      <tr>
        <th>
          Frontend CD
        </th>
        <th>
          Frontend Cypress Tests
        </th>
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
      </tr>
    </tbody>
  </table>
</div>

<h1 align="center"> Helsinki Bikes Frontend </h1>
<p>This is frontend repository of <a href="https://github.com/arf1e/helsinki-bikes">my Solita 2023 Dev Academy pre-assignment</a>. <br /> You can see this project live using <a href="bikeapp.egorushque.space">this link</a>.</p>

<h2>Used Libraries</h2>
<ul>
  <li>
    <strong>Axios</strong><br/>
    I prefer axios over fetch because it provides convenient <a href="https://axios-http.com/docs/instance">client config feature</a>. 
  </li>
  <li>
    <strong>Formik & Yup</strong><br />
    <p>My go-to combination when handling forms & validation. I thought of giving React Hook Form a try, but my concern is that the code written with RHF appears complicated, particularly in forms that involve intricate logic. </p>
  </li>
  <li>
    <strong>Styled Components</strong>
    <p>Allows me to write modular styles with minimal initial setup required.</p>
  </li>
  <li>
    <strong>lodash.debounce</strong>
    <p>I have implemented multiple autocomplete text inputs in the app. As a rule of thumb, autocomplete API requests should always be debounced.</p>
  </li>
</ul>

<h2>Running locally</h2>
<p>Please refer to the <a href="https://github.com/arf1e/helsinki-bikes">monorepo</a> for running instructions.
