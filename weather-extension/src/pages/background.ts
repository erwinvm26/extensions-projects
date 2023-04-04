console.log("Server worker started");

// interface Query {
//   active: boolean;
//   currentWindow: boolean;
// }

// chrome.commands.onCommand.addListener(function (command) {
//   switch (command) {
//     case "duplicate-tab":
//       duplicateTab();
//       break;

//     default:
//       console.log(`Command ${command} not found`);
//   }
// });

// function duplicateTab() {
//   const query: Query = { active: true, currentWindow: true };

//   chrome.tabs.query(query, (tabs) => {
//     chrome.tabs.create({
//       url: tabs[0].url,
//       active: false,
//     });
//   });
// }

chrome.action.setBadgeText({
  text: "90",
});

export {};
