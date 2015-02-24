# SweetSuite Task Manager

## Description:
SweetSuite is a task manager webapp made for MaidSuite, a CRM & Scheduling platform for service industry companies. With SweetSuite, clients will be able to assign a fully customized checklist to a maid provided by MaidSuite.

### Group Members:
- Sahir Boghani
- Chistopher Busse
- Eric Gross
- Joshua Kirstein
- Juan Nunez

### Keep track of our progress @ Trello:
https://trello.com/b/rVNOMTXF/sweetsuite

### How to install:
From the command line/terminal in the desired cloning directory

- Clone the repo
```
    git clone http://github.com/egross91/SweetSuite
```

-  Install dependencies
```
    cd SweetSuite && npm install && bower install && bower update
```

- In a new command line/terminal: to serve the app
```
    grunt serve
```

## Running tests:
- Make sure to start the site before running *any* tests
```
    grunt serve
```

#### Running Protractor tests:
- Install protractor:
```
    npm install -g protractor
```

- Update selenium
```
    webdriver-manager update
```

- Run selenium (new terminal/command line)
```
    webdriver-manager start
```

- Run protractor
```
    protractor protractor.conf.js
```


#### Running server tests:
```
    grunt test:server
```


#### Running client tests:
```
    grunt test:client
```
