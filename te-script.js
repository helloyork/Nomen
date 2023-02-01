import webdriver from "selenium-webdriver";

const username = "yorkqu_lHkzw1";
const accessKey = "n4j77pzR8Jp9nzg2mCk3";

const capabilities = {
  'bstack:options': {
      "os": "Windows",
      "osVersion": "10",
      "browserVersion": "103.0",
      "buildName": "browserstack-build-1",
      "sessionName": "Parallel test 1",
  },
  "browserName": "Chrome"
}

async function main() {
  console.log('Started BrowserStack');
  let driver = new webdriver.Builder()
  .usingServer(`http://${username}:${accessKey}@hub-cloud.browserstack.com/wd/hub`)
  .withCapabilities(capabilities).build();
  let result;
  try {
    await driver.get("https://www.example.com/");
    console.log('getting pages');
    // await sleep(3000);
    result = await driver.getPageSource();
    console.log(result);
  } catch (err) {
    result = {
      ok: false,
      error: err,
    }
    console.log(err);
  }
  
  driver.quit();
  console.log('Stopped BrowserStackLocal');
}
main();

function sleep(ms) {
  return new Promise(resolve => setTimeout(() => resolve, ms))
}

export async function GET(){
    return new Response(JSON.stringify({}))
}

export async function POST({ request }) {
    let value = await request.json();
    
}
