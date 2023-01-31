import browserstack from 'browserstack-local';
import webdriver from "selenium-webdriver";

const username = "yorkqu_lHkzw1";
const accessKey = "n4j77pzR8Jp9nzg2mCk3";

const capabilities = {
  'bstack:options': {
    os: 'Windows',
    osVersion: '10',
    "projectName" : "Marketing Website v2",
		"buildName" : "alpha_0.1.7",
		"sessionName" : "Home page must have a title",    
    debug: 'true', // to enable visual logs
    networkLogs: 'true', // to enable network logs to be logged
    consoleLogs: 'info' // to enable console logs at the info level. You can also use other log levels here.
  },
  browserName: 'Chrome',
  browserVersion: 'latest'
};

/*
driver.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Yaay! my sample test passed"}}');
driver.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "Oops! my sample test failed"}}');
*/

let driver = new webdriver.Builder().
  usingServer('http://' + username + ':' + accessKey + '@hub.browserstack.com/wd/hub').
  withCapabilities(capabilities).build();

// Creates an instance of Local
const bs_local = new browserstack.Local();
const bs_local_args = { key: accessKey };
bs_local.start(bs_local_args, function () {
  console.log('Started BrowserStackLocal');
  console.log('BrowserStackLocal running:', bs_local.isRunning());
  // Your test code goes here, from creating the driver instance till the end, i.e. driver.quit.
  // Stops the Local instance after your test run is completed, i.e after driver.quit.
  bs_local.stop(function () {
    console.log('Stopped BrowserStackLocal');
  });
});