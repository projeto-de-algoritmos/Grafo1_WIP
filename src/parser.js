const cheerio = require('cheerio');


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


const getListOfProfiles = (html) => {
    const jsonProfiles = getProfileJson(html, /"edge_related_profiles":\{"edges":\[.*\}\}\]\}/);
    if(jsonProfiles === undefined || jsonProfiles === null) {
        return new Error("no profiles related to this profile were detected")
    }
    const jsonParsed = parseProfileJson(jsonProfiles);
    return jsonParsed;
}

module.exports = { getListOfProfiles, buildFirstProfileJson };