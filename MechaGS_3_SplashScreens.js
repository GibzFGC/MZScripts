//=============================================================================
// MechaGS - Splash Screens Script
// MechaGS_3_SplashScreens.js
//=============================================================================

/*: Details
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.00] [Splash Screens]
 * @author MechaGS
 * @url http://www.twitter.com/Mega_Gibz
 * @help No documentation needed, pretty simple.

 * @param imageCount
 * @text Image Count
 * @desc The number of images to cycle
 * @default 1
 * @type integer
 * 
 * @param imageDuration
 * @text Image Duration
 * @desc The number of frames to keep the image on screen
 * @default 180
 * @type integer
 * 
 * @param imageFade
 * @text Image Fade
 * @desc The number of frames to fade in / out the image
 * @default 5
 * @type integer
*/

var MechaGS = MechaGS || {};
MechaGS.SplashScreens = {};

/* Splash Scene Parameters */
MechaGS.SplashScreens.parameters = PluginManager.parameters('MechaGS_3_SplashScreens');
MechaGS.SplashScreens.imageCount = (MechaGS.SplashScreens.parameters["imageCount"]);
MechaGS.SplashScreens.imageDuration = (MechaGS.SplashScreens.parameters["imageDuration"]);
MechaGS.SplashScreens.imageFade = (MechaGS.SplashScreens.parameters["imageFade"]);

(() => {

    /* Splash Scene */
    function MechaGS_Scene_Splash() {
        this.initialize(...arguments);
    }
    
    /* Object Creation */
    MechaGS_Scene_Splash.prototype = Object.create(Scene_Base.prototype);
    MechaGS_Scene_Splash.prototype.constructor = MechaGS_Scene_Splash;

    /* Initialize the Splash Scene */
    MechaGS_Scene_Splash.prototype.initialize = function() {
        Scene_Base.prototype.initialize.call(this);
    };

    /* Create the initial Splash Scene */
    MechaGS_Scene_Splash.prototype.create = function() {
        Scene_Base.prototype.create.call(this);
        this.currentSplash = 0;
        this.splashTimer = 0;
        this.fadeTimer = 0;
    };

    /* Start the Splash Scene */
    MechaGS_Scene_Splash.prototype.start = function() {
        Scene_Base.prototype.start.call(this);
    };

    /* Update the Splash Scene */
    MechaGS_Scene_Splash.prototype.update = function() {
        if (this.currentSplash < MechaGS.SplashScreens.imageCount && !this.isBusy()) {

            if (this.splashTimer <= MechaGS.SplashScreens.imageDuration) {
                this.imageSprite = new Sprite(ImageManager.loadTitle2("Splash_" + this.currentSplash));
                this.addChild(this.imageSprite);
                this.imageSprite.opacity = 0;
                this.splashTimer++;
            } else {
                this.removeChild(this.imageSprite);
                this.splashTimer = 0;
                this.currentSplash++;
            }

        } else {
            SceneManager.goto(Scene_Title);
        }

        if(Input.isTriggered('ok') || TouchInput.isPressed()) {
            SceneManager.goto(Scene_Title);
        }

        Scene_Base.prototype.update.call(this);
    };

    MechaGS_Scene_Splash.prototype.updateFade = function() {
        if (this.imageSprite.opacity < 255) {
            if (this.fadeTimer <= MechaGS.SplashScreens.imageFade) {
                this.imageSprite.opacity += this.splashTimer;
            }
            
            this.fadeTimer = 0;
        }

        if (this.imageSprite.opacity == 255) {
            if (this.fadeTimer <= MechaGS.SplashScreens.imageFade) {
                this.imageSprite.opacity -= this.splashTimer;
            }

            this.fadeTimer = 0;
        }
    };

    /* Load the Splash Scene */
    Scene_Boot.prototype.startNormalGame = function() {
        this.checkPlayerLocation();
        DataManager.setupNewGame();
        SceneManager.goto(MechaGS_Scene_Splash);
    };

})();