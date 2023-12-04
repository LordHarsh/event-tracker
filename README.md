# Event Management System

A NextJS Express backend application designed to manage events efficiently for the Alexa Developers SRM club. It automates the registration and attendance tracking process, eliminating the need for manual attendance marking in Excel sheets. The application simplifies event management and streamlines the process of issuing certificates based on attendance records.


## Badges

[![GitHub Issues](https://img.shields.io/github/issues/LordHarsh/event-tracker.svg)](https://github.com/LordHarsh/event-tracker/issues)
[![GitHub Stars](https://img.shields.io/github/stars/LordHarsh/event-tracker.svg)](https://github.com/LordHarsh/event-tracker/stargazers)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/LordHarsh/event-tracker/blob/master/LICENSE)


## Usage

The application can be used to manage events for a club, including registration, attendance tracking, and certificate issuance.

## Installation and Run

To install and run the application, follow these steps:
1. Clone the project repository from GitHub.
2. Install the required dependencies using `npm install`.
3. Create a MongoDB cluster and get its URI.
4. Get the secrets.json file from GCP for gsheets API. Upload it to your Google Drive and get its URL.
5. Create a .env file.
6. Start the application development server using `npm run dev`.

## Technologies

- TypeScript
- Express
- NodeJS
- Google Sheets API
- Google Drive API
- MongoDB
- AWS EC2 (Hosting)

## License

MIT License

