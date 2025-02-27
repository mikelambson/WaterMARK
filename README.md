# WaterMARK

## _Water Measurement Administration & Record Keeping_

[![Build Status](https://img.shields.io/static/v1?label=build&message=development&color=red)](https://img.shields.io)
![GitHub package.json version](https://img.shields.io/github/package-json/v/mikelambson/WaterMARK)
![GitHub repo size](https://img.shields.io/github/repo-size/mikelambson/WaterMARK)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/mikelambson/WaterMARK)
![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fmikelambson%2FWaterMARK%2Fmaster%2Fpackage.json&query=%24.linecount&label=total%20lines&color=333222)
<!-- ![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fmikelambson%2FWaterMARK%2Fmaster%2Fpackage.json&query=%24.version&label=version) -->

[![GitHub license](https://img.shields.io/github/license/mikelambson/WaterMARK?color=darkgreen)](https://github.com/mikelambson/WaterMARK/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/mikelambson/WaterMARK)](https://github.com/mikelambson/WaterMARK/issues)
![GitHub language count](https://img.shields.io/github/languages/count/mikelambson/WaterMARK)
![GitHub commit activity](https://img.shields.io/github/commit-activity/t/mikelambson/WaterMARK)

[![Static Badge](https://img.shields.io/badge/node-^20.16.0-44bf16)](https://ui.shadcn.com/)
![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fmikelambson%2FWaterMARK%2Fmaster%2Fpackage.json&query=%24.dependencies.next&label=nextjs&color=111111)
[![Static Badge](https://img.shields.io/badge/state_management-Zustand-%23422136)](https://www.npmjs.com/package/zustand)
[![Static Badge](https://img.shields.io/badge/components-Shadcn%2FUI-111111)](https://ui.shadcn.com/)

___

### Information

Water Measurement Administration & Record Keeping => WaterMARK  
WaterMARK is a multi-source meter data aggregation, scheduling, task managemet and water order processing application.

This frontend system is designed to work with the [WaterMARK-backend](https://github.com/mikelambson/watermark-backend) as the primary API and data management tool.

___

### Build: Development

Example showing dev layout of frontend screen:
![Frontend Image](frontend.png)

![Frontend Image](frontendscheduling.png)

![Frontend Image](frontenddeliveries.png)

![Frontend Image](frontendforecastgraph.png)

___

## To-do

- build backend data management (partially done)
- ~~login and session managment features~~ (may need tweaks)
- user management
- scheduling module (partially done)
- deliveries module (partially done)
- analysis module
- admin & posting module
- integrate data sources
- integrate graphsfor meters and analysis (partially done)
- integrate goes api data ingestion
- meters module
- reports module
- task system
- notification system
- build gis map display system (partially done)
- public modules (partially done)


## License

[BSD 3-Clause License](./LICENSE)

## Dev Environment

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Helpful scripts:

```sh
## Getting Started

First, run the development server:

npm run initialize
npm install

# dev
npm run dev
npm run git # for generic contribution
npm run count # do linecount for current branch

# staging and production
npm run build
npm start # add to process manager for deployment

```
