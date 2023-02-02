import http from 'http';
import https from 'https';


//set the time (in seconds) for connection to be alive
var keepAliveTimeout = 30*1000;

if(http.globalAgent && http.globalAgent.hasOwnProperty('keepAlive')) {
    // @ts-ignore
    http.globalAgent.keepAlive = true;
    // @ts-ignore
    https.globalAgent.keepAlive = true;
    // @ts-ignore
    http.globalAgent.keepAliveMsecs = keepAliveTimeout;
    // @ts-ignore
    https.globalAgent.keepAliveMsecs = keepAliveTimeout;
} else {
    var agent = new http.Agent({
        keepAlive: true,
        keepAliveMsecs: keepAliveTimeout
    });

    var secureAgent = new https.Agent({
        keepAlive: true,
        keepAliveMsecs: keepAliveTimeout
    });

    var httpRequest = http.request;
    var httpsRequest = https.request;

    http.request = function(options, callback){
        // @ts-ignore
        if(options.protocol == "https:"){
            // @ts-ignore
            options["agent"] = secureAgent;
            // @ts-ignore
            return httpsRequest(options, callback);
        }
        else {
            // @ts-ignore
            options["agent"] = agent;
            // @ts-ignore
            return httpRequest(options, callback);
        }
    };
}
