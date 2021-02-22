const cheerio = require('cheerio');

const getProfileJson = (html, regex) => {
    const $ = cheerio.load(html);
    let json;
    $("script").map((_, script) => {
        script.children.map(child => {
            let regexResponse = regex.exec(child.data);
            if (regexResponse != null) {
                if (regexResponse[0].includes("edge_related_profiles")) {
                    regexResponse[0] = regexResponse[0].slice(24);
                }
                if(regexResponse[0].includes("connected_fb_page")) {
                    regexResponse[0] = regexResponse[0].slice(0, -20)+'}}';
                }
                json = JSON.parse(regexResponse[0]);
            }
        });
    });
    return json;
}

const buildFirstProfileJson = (html, url) => {
    let firstProfile = getProfileJson(html, /\{"user":\{.*,"connected_fb_page"/);
    const $ = cheerio.load(html);
    let value = {};
    const key = 1;
    value[key] = {
        alternateName: firstProfile.user.username,
        name: firstProfile.user.full_name,
        profile_link: url,
        profile_image: $("meta[property = 'og:image']").first().attr().content,
    }
    return value;
}

const parseProfileJson = (jsonProfile) => {
    let profiles = jsonProfile['edges'];
    let profilesParsed = {}
    let stop = 5;
    let i = 0;
    for (let node of profiles) {
        if (i < stop) {
            let value = {};
            value = {
                alternateName: node["node"].username,
                name: node["node"].full_name,
                profile_link: "https://www.instagram.com/" + node["node"].username,
                profile_image: node["node"].profile_pic_url,
            }
            profilesParsed[node["node"].id] = value;
            i++;
        } else {
            break;
        }
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