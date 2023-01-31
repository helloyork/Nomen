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

    let driver = new webdriver.Builder()
        .usingServer(`http://${username}:${accessKey}@hub-cloud.browserstack.com/wd/hub`)
        .withCapabilities(capabilities).build();

async function main(){
  console.log('Started BrowserStackLocal');
  console.log('BrowserStackLocal running:', bs_local.isRunning());
  let result;
  try{
    await driver.get("https://www.example.com/");
    await sleep(30000);
    result=driver.getPageSource();
  }catch(err){
    result={
      ok:false,
      error:err,
    }
  }
  bs_local.stop(function () {
    console.log('Stopped BrowserStackLocal');
  });
});
}

function sleep(ms){
  return new Promise(resolve=>setTimeout(()=>resolve,ms))
}
