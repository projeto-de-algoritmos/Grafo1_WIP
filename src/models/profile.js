class Profile {
    constructor(key, json) {
        this.key = key;
        this.name = json['name'];
        this.profile_name = json['alternateName'];
        this.link = json['profile_link'];
        this.profile_image = json['profile_image'];
    }
}

module.exports = Profile;