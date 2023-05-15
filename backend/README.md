<div align="center">
<img src="https://i.ibb.co/7bnqVrS/Github-Header.png" alt="Project Banner" width="1200">

</div>

<div align="center">
  <table caption="Build/Test status badges">
    <thead>
      <tr>
        <th>
          Backend CD
        </th>
        <th>
          Backend Tests
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
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
      </tr>
    </tbody>
  </table>
</div>

<h1 align="center"> Helsinki Bikes Backend</h1>
<p>This repository contains the backend part of my <a href="https://github.com/arf1e/helsinki-bikes">Solita Dev Academy 2023 Pre-assignment</a>. I use Nest.js as the backend framework and I work with the database using Prisma ORM. I have production build of this repository running at <a href="https://api.bikeapp.egorushque.space">api.backend.egorushque.space</a></p>

<h2>Used Libraries</h2>
<ul>
  <li>
    <strong>Fast CSV</strong>
    <p>For this project I had to work with CSV files containing millions of rows, so I decided to pick this library for CSV parsing. Fast CSV uses streams, which allows me to handle the data in parts without exceeding memory limit.</p>
  </li>
  <li>
    <strong>yup</strong>
    <p>Allows me to create a straightforward validation for the imported data.</p>
  </li>
  <li>
    <strong>class-transformer and class-validator</strong>
    <p>Provides type safety for my DTOs.</p>
  </li>
  <li>
    <strong>nodejs-file-downloader</strong>
    <p>I picked this library because it handles HTTP Redirects on file downloads. Hate to admit it, but I could not find a way around that problem using https module downloads.</p>
  </li>
  <li>
    <strong>concurrently</strong>
    <p>I use it so my <code>start:migrate:prod</code> command would work on Windows machines, since Windows can't handle <code>&</code> terminal operator.</p>
  </li>
</ul>

<h2>Running locally</h2>
<p>Please refer to the <a href="https://github.com/arf1e/helsinki-bikes">monorepo</a> for running instructions.
