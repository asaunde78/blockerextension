chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      if (details.type === "image") {
        // let proxy = "http://172.26.152.122:6969/"
        let proxy = "http://localhost:6969/"
        // if(details.url.startsWith("https://encrypted") || details.url.includes("?resize=1:1")) {
        //   return;
        // }
        if(details.url.startsWith("https://encrypted") || details.url.includes("googleusercontent.com") || details.url.includes("favicon") || details.url.includes("gstatic") || details.url.includes("google.com")) {
          return {cancel: true};
        }
        if(/*details.url.startsWith("https://encrypted") ||*/ details.url.startsWith(proxy)) {
          return;
        }
        if(!details.url.includes("googleusercontent.com") && !details.url.includes("favicon") && !details.url.includes("gstatic") &&  !details.url.includes("google.com")) {
          console.log(`${JSON.stringify(details)}`)
          // chrome.tabs.executeScript({
          //   code: 'console.log(`${JSON.stringify(details)}`)'
          // });

        }
        // let strippedUrl = details.url.split("?")[0];
        // console.log(`Redirecting: \turl: ${details.url} to ${strippedUrl}?resize=1:1`);
        console.log(`Redirecting: \turl: ${details.url}`);
        // return {cancel: true}; // Block the request for image files
        // return {redirectUrl: `${proxy}image?url=${encodeURIComponent(details.url)}`}
        return {redirectUrl: `${proxy}${encodeURIComponent(details.url)}`}

        // return {redirectUrl:`${strippedUrl}?resize=1:1`}

      }
    },
    {urls: ["<all_urls>"]},
    ["blocking"]
  );
  
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // Log the message to the main console
  console.log(request.message);

  // Send a response back to the background page
  sendResponse({ status: "Message received" });
});

// define the data URI string of the custom image
// const customImageDataURI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+8/CQABAwD/Nf9B4wAAAABJRU5ErkJggg==";

// // listen for image request completions
// chrome.webRequest.onCompleted.addListener(
//   (details) => {
//     // check if the request is for an image
//     if (details.type === "image") {
//       // replace the image with the custom image
//       console.log(`Replaced: ${details.url} with ${customImageDataURI}`);
//       chrome.tabs.executeScript(details.tabId, {
//         code: `document.querySelector('img[src="${details.url}"]').catbot=${details.url}; document.querySelector('img[src="${details.url}"]').src = "${customImageDataURI}";`,
//       });
//     }
//   },
//   { urls: ["<all_urls>"]}
// );
