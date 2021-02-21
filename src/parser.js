const cheerio = require('cheerio');


const getGamePrice = (html) => {
    const $ = cheerio.load(html);
    return $('div.discount_final_price').first().text();
}

const getProfileJson = (html, regex) => {
    const $ = cheerio.load(html);
    let json;
    $("script").map((_, script) => {
        script.children.map(child => {
            const regexResponse = regex.exec(child.data);
            if (regexResponse != null) {
                if (regexResponse[0].includes("edge_related_profiles")) {
                    regexResponse[0] = regexResponse[0].slice(24);
                }
                json = JSON.parse(regexResponse[0]);
            }
        });
    });
    return json;
}

const buildFirstGameJson = (html, url) => {
    const $ = cheerio.load(html);
    const splittedUrl = url.split("/");
    const urlName = splittedUrl.pop()
    const key = splittedUrl.pop()
    let value = {};
    value[key] = {
        name: $("div.apphub_AppName").first().text(),
        url_name: urlName,
        discount_block: $("meta[itemprop = 'price']").first().attr().content,
        small_capsulev5: $("meta[itemprop='image']").first().attr().content,
        os_windows: true,
        os_macos: $("div[data-os = 'mac']").first().attr() !== undefined ? true : false,
        os_linux: $("div[data-os = 'linux']").first().attr() !== undefined ? true : false,
        link: url
    }
    return value;
}

const buildFirstProfileJson = (html, url) => {
    const firstProfile = getProfileJson(html, /\{"@context":.*}/);
    const $ = cheerio.load(html);
    let value = {};
    const key = 1;
    value[key] = {
        alternateName: firstProfile.alternateName,
        name: firstProfile.name,
        profile_link: url,
        profile_image: $("meta[property = 'og:image']").first().attr().content,
    }
    return value;
}

const parseGameJson = (jsonGames) => {
    let games = jsonGames['rgApps'];
    for (let key in games) {
        if (!games[key]['name'].includes("Soundtrack")) {
            let link = 'https://store.steampowered.com/app/' + key + '/' + games[key]['url_name'];
            games[key]['link'] = link;
            games[key]['discount_block'] = getGamePrice(games[key]['discount_block']);
            delete games[key]['descids']
        } else {
            delete games[key]
        }
    }
    return games;
}

const parseProfileJson = (jsonProfile) => {
    let profiles = jsonProfile['edges'];
    let profilesParsed = {}
    for (let node of profiles) {
        let value = {};
        value = {
            alternateName: node["node"].username,
            name: node["node"].full_name,
            profile_link: "https://www.instagram.com/" + node["node"].username,
            profile_image: node["node"].profile_pic_url,
        }
        profilesParsed[node["node"].id] = value
    }
    return profilesParsed;
}


const getListOfGames = (html) => {
    const jsonGames = getGameJson(html);
    const jsonParsed = parseGameJson(jsonGames);
    return jsonParsed;
}

const getListOfProfiles = (html) => {
    const jsonProfiles = getProfileJson(html, /"edge_related_profiles":\{"edges":\[.*\}\}\]\}/);
    if(jsonProfiles === undefined || jsonProfiles === null) {
        return new Error("no profiles related to this profile were detected")
    }
    const jsonParsed = parseProfileJson(jsonProfiles);
    return jsonParsed;
}

module.exports = { getListOfProfiles, buildFirstProfileJson };