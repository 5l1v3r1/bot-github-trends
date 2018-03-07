const trending = require("trending-github");
const chalk = require("chalk");

module.exports = function(vorpal) {
  vorpal
    .command("github-trends")
    .alias("gt")
    .description("Show today's github trends in JavaScript")
    .action(function(args, callback) {
      trending("daily", "javascript")
        .then(repos => {
          const result = repos
            .slice(0, 10)
            .map(item => {
              const name = chalk.green(`${item.author} / ${item.name}`);
              const description = item.description;
              const url = chalk.blue(item.href);
              const stars = chalk.yellow(item.stars + " stars");

              return `${name}\t ${stars}\n ${description}\n (${url})\n`;
            })
            .join("\n");

          callback(result);
        })
        .catch(e => callback(e));
    });
};
