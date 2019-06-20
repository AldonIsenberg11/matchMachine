
Next create Vuex store to share between 2 components.

Then Re-evaluate game plan.


+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_

# wrestleDB

### Project setup
```
npm install
```

### To start development:
```
npm run dev
```

### Pushing to Production:

- Currently master branch on github is set to auto-deploy to wrestledb.aldonisenberg.com

---

Tools used for tech stack

- Git
- NPM
- Node/Express/Joi
- Docker
- MongoDB
- Webpack
- Vue.js
- GraphQL

---

https://medium.freecodecamp.org/how-to-create-a-vue-js-app-using-single-file-components-without-the-cli-7e73e5b8244f


---
Match Views

|Event           |Paused |Neutral |Red Control|Green Control |
|:--------------:|:----:|:-------:|:---------:|:------------:|
|Match Timer     | Off  | On      | On        | On           |
|Green Takedown  | *    | ✔       | ✘         | ✘            |
|Green Escape    | *    | ✘       | ✔         | ✘            |
|Green Reversal  | *    | ✘       | ✔         | ✘            |
|Green Nearfall2 | *    | ✘       | ✘         | ✔            |
|Green Nearfall3 | *    | ✘       | ✘         | ✔            |
|Green Nearfall4 | *    | ✘       | ✘         | ✔            |
|Green Penalty   | ✔    | ✔       | ✔         | ✔            |
|Green Pin       | *    | ???     | *         | ✔            |
|Red Takedown    | *    | ✔       | ✘         | ✘            |
|Red Escape      | *    | ✘       | ✘         | ✔            |
|Red Reversal    | *    | ✘       | ✘         | ✔            |
|Red Nearfall2   | *    | ✘       | ✔         | ✘            |
|Red Nearfall3   | *    | ✘       | ✔         | ✘            |
|Red Nearfall4   | *    | ✘       | ✔         | ✘            |
|Red Penalty     | ✔    | ✔       | ✔         | ✔            |
|Red Pin         | *    | ???     | ✔         | *            |

Pin button will then ask if it was a defensive pin, are you sure (this is uncommon event)?

Neutral

 - Green Takedown, Red Takedown
 - Green Penalty, Red Takedown

 Red Control

 - Green Escape
 - Green Reversal
 - Red Nearfall2
 - Red Nearfall3
 - Red Nearfall4
 - Green Penalty, Red Penalty
 - Pin (-> Defensive Green Pin?, Are you sure?)

 Green Control

 - Red Escape
 - Red Reversal
 - Green Nearfall2
 - Green Nearfall3
 - Green Nearfall4
 - Red Penalty, Green Penalty
 - Pin (-> Defensive Red Pin?, Are you sure?)

---

# WrestleDB
Repository for WrestleDB, the wrestling event management company

### Executive Summary

Welcome to the future of wrestling events! WrestleDB brings to the wrestling community a new and simpler way to manage wrestling events.

With an emphasis on automation WrestleDB will lead the sport, to consistently provide premium quality events.

### Objectives

### Mission

### Keys to Success

### Company Summary

### Company Ownership

### Start-up Summary

### Company Locations & Facilities

### Products and Services

 - Managing an event
 - Event management software
 - List of Vendors
 - Step-by-step guides

### Competitive Comparison

### Market Analysis Summary

### Market Segmentation

### Target Market Segment Strategy

### Service Business Analysis

###