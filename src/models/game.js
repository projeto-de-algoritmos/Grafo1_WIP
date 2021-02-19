class Game {
    constructor(key, json) {
        this.key = key;
        this.name = json['name'];
        this.price = json['discount_block'];
        this.urlName = json['url_name'];
        this.smallCapsulev5 = json['small_capsulev5'];
        this.osWindows = json['os_windows'];
        this.osMacos = json['os_macos'];
        this.osLinux = json['os_linux'];
        this.link = json['link'];
    }
}

module.exports = Game;