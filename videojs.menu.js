//
// Author: Adam Oliver
// Description: Creates a menu control for switching languages in the player
//

(function() {

    /***********************************************
     * LanguageSwitch Item
     ***********************************************/
    videojs.LanguageSwitchItem = videojs.MenuItem.extend({
            init: function(player, options){
                    videojs.MenuItem.call(this, player, options);
            }
    });

    videojs.LanguageSwitchItem.prototype.createEl = function(type, props) {
            return vjs.Button.prototype.createEl.call(this, 'li', vjs.obj.merge({
                    className: 'vjs-menu-item',
                    innerHTML: this.options_['label']
            }, props));
    };

    videojs.LanguageSwitchItem.prototype.onClick = function() {
            this.player_.pause();
            this.player_.src(this.options().videos);
            this.player_.play();
    };


    /***********************************************
     * LanguageSwitch Menu Button
     ***********************************************/
    videojs.LanguageSwitch = videojs.MenuButton.extend({
        init: function(player, options){
                    videojs.MenuButton.call(this, player, options);

                    this.on('click', this.onClick);
        }
    });

    videojs.LanguageSwitch.prototype.onClick = function() {};
    
    videojs.LanguageSwitch.prototype.createItems = function() {
            var items = [];
            var languages = this.options().languages;

            for (var i=0; i<languages.length; i++){
                    items.push(new videojs.LanguageSwitchItem(this.player_, {
                            'label': languages[i].label,
                            'videos': languages[i].videos,
                    }));
            }

            return items;
    };

    // Note that we're not doing this in prototype.createEl() because
    // it won't be called by Component.init (due to name obfuscation).
    var createLanguageSwitchButton = function(options) {
        var props = {
                className: 'vjs-social-button vjs-control vjs-menu-button icon-share',
                innerHTML: '<div class="vjs-control-content"><span class="vjs-control-text">' + ('LanguageSwitch') + '</span></div>',
                role: 'button',
                'aria-live': 'polite', // let the screen reader user know that the text of the button may change
                tabIndex: 0
            };
        return videojs.Component.prototype.createEl(null, props);
    };


    /***********************************************
     * Register the plugin
     ***********************************************/
    var languageSwitch;
    videojs.plugin('languageSwitch', function(options) {

        var optionsClone = JSON.parse(JSON.stringify(options));
        optionsClone.el = createLanguageSwitchButton(options);

        languageSwitch = new videojs.LanguageSwitch(this, optionsClone);
        this.controlBar.el().appendChild(languageSwitch.el());
    });

})();
