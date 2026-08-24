function sendFilteredEmailsToChat() {

  var sender = "noreply@signin.autodesk.com";
  var threads = GmailApp.search('from:' + sender);
  var userEmail = Session.getActiveUser().getEmail();
  var webhookUrl = "";
  var now = new Date();

  for (var i = 0; i < threads.length; i++) {
    var messages = threads[i].getMessages();
    for (var j = 0; j < messages.length; j++) {
      
      var msg = messages[j];
      var messageDate = msg.getDate();
      var diffMs = now - messageDate;
      var diffMinutes = diffMs / 1000 / 60;
      console.log(diffMinutes);
      if (diffMinutes > 6) continue;

      var body = msg.getPlainBody();

      var match = body.match(/Code:\s*(\d{6})/);
      var extractedText = match ? match[1].trim() : "❗ Unable to extract the required text";
      var returnedText = "_Account:_ " + userEmail + "\n_Code:_ *" + extractedText + "*";

      console.log(returnedText);

      var payload = JSON.stringify({ text: returnedText});
      var options = {
        method: "post",
        contentType: "application/json",
        payload: payload
      };
      UrlFetchApp.fetch(webhookUrl, options);
    }

    threads[i].markRead();
  }
}