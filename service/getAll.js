const client = require("./client");

client.getAll({}, (error, news) => {
    if (!error) console.log(error)
    console.log(news);
});