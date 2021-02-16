const crawler = require('./crawler');
const parser = require('./parser');

async function main() {
    const htmlFound = await crawler.getHtml({
        url: 'https://store.steampowered.com/app/105600/Terraria/'
    }).then(function(response) {
        if(response.ok) {
            return response.text();
        }
    });
    parser.getLinksHtml(htmlFound);
}

main();