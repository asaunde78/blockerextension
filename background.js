let links = {};
let grabbing = false;
chrome.tabs.onCreated.addListener
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      if (details.type === "image") {
        // let proxy = "http://172.26.152.122:6969/"
        let proxy = "http://localhost:6969/"
        
        if(details.url.startsWith("https://encrypted") || details.url.includes("googleusercontent.com") || details.url.includes("favicon") || details.url.includes("gstatic") || details.url.includes("google.com")) {
          return {cancel: true};
        }
        if(/*details.url.startsWith("https://encrypted") ||*/ details.url.startsWith(proxy)) {
          return;
        }
        if(!details.url.includes("googleusercontent.com") && !details.url.includes("favicon") && !details.url.includes("gstatic") &&  !details.url.includes("google.com")) {
          console.log(`${JSON.stringify(details)}`)
        }
        
        // fetch(`${proxy}add${details.tabId},${5}`)
        console.log(`Redirecting: \turl: ${details.url}`);
        // console.log(details)

        if (details.tabId in links && grabbing) {
          links[details.tabId] += 1;
        }
        else {
          // console.log(details);
        chrome.cookies.get({url: details.initiator, name: "count"}, function(cookie) {
          if (cookie) {
            var cookieValue = cookie.value;
            chrome.tabs.executeScript(details.tabId,{
              code: `document.documentElement.appendChild(Object.assign(document.createElement("div"), {id: "cookie${cookieValue}"}));`
            });
            fetch(`${proxy}add${details.tabId},${cookieValue}`)
            console.log("Cookie value:", cookieValue);
            chrome.cookies.remove({url:details.initiator,name:cookie.name}, function(removedCookie) {
              console.log("Cookie deleted:", removedCookie);
              chrome.tabs.executeScript(details.tabId,{
                code: `document.documentElement.appendChild(Object.assign(document.createElement("div"), {id: "deleted a cookie"}));`
              });
            });
            grabbing = true
      
          } else {
            console.log("Cookie not found");
          }
        });
          
          links[details.tabId] = 1;
          
        }
        chrome.tabs.executeScript(details.tabId,{
          code: `document.documentElement.appendChild(Object.assign(document.createElement("div"), {id: "link_count${links[details.tabId]}"}));`
        });
        // console.log(links)
        
        
        return {redirectUrl: `${proxy}${details.tabId}${encodeURIComponent(details.url)}`}

        // return {redirectUrl:`${strippedUrl}?resize=1:1`}

      }
    },
    {urls: ["<all_urls>"]},
    ["blocking"]
  );

chrome.webRequest.onHeadersReceived.addListener(
  function(details) {
    if (details.type == "image") {
      resp = details.responseHeaders[2]["value"]
      // console.log("Response body:", resp);
      if(resp == "inline; filename=bad.png") {
        //potentially add a clear here so when the thread finishes getting everything we know to stop trying 
        console.log("bad");
      }
      if(resp == "inline; filename=good.png") {
        
        
        console.log("good");
      }
      if(resp == "inline; filename=done.png") {
        // links[details.tabId] = -1;
        delete links[details.tabId]
        grabbing = false
        chrome.tabs.executeScript(details.tabId,{
          code: `document.documentElement.appendChild(Object.assign(document.createElement("div"), {id: "DONE"}));`
        });
        console.log("done");
      }
    }
  },
  {urls: ["<all_urls>"]},
  ['blocking', 'responseHeaders']
);
  
