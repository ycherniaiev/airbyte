const { parse } = require("node-html-parser");

const t = parse(`<div>
<p>Hello,</p> <p>Follow this link to verify your email address.</p> <p><a href='https://dev-cloud.airbyte.io/verify-email?mode=verifyEmail&oobCode=F1bU9MF66Kc4q5nPLOlI_JXkWOoBnzk--sBev2TUMs4AAAF8vJrTZw&apiKey=AIzaSyChszMXB2uagACPHaK1gXeb7gnLaJEDfU0&lang=en'>https://dev-cloud.airbyte.io/verify-email?mode=verifyEmail&oobCode=F1bU9MF66Kc4q5nPLOlI_JXkWOoBnzk--sBev2TUMs4AAAF8vJrTZw&apiKey=AIzaSyChszMXB2uagACPHaK1gXeb7gnLaJEDfU0&lang=en</a></p> <p>If you didn’t ask to verify this address, you can ignore this email.</p> <p>Thanks,</p> <p>Your Airbyte team</p></div>`);

console.log(t.querySelector("a").getAttribute("href"));
