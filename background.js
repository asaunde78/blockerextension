let links = [];

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
        
        console.log(`Redirecting: \turl: ${details.url}`);
        
        links.push(details.url)
        console.log(links.length)
        console.log(document)
        // chrome.cookies.getAll({ url: url }, function(cookies) {
        //   console.log(cookies);
        // });
        // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        //   chrome.tabs.sendMessage(tabs[0].id, {valueToStore: JSON.stringify(links)});
        //   console.log("sent message!")
        // });
        
        return {redirectUrl: `${proxy}${encodeURIComponent(details.url)}`}

        // return {redirectUrl:`${strippedUrl}?resize=1:1`}

      }
    },
    {urls: ["<all_urls>"]},
    ["blocking"]
  );
  
