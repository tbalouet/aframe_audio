(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//This component is based on the work of Srgy Surkv
//Github repo to be found here: https://github.com/surikov/webaudiofont


(function(){
  "use strict";

  const soundBaseURL   = "https://surikov.github.io/webaudiofontdata/sound/";

  //Instanciate Global Audio Functionnalities
  let AudioContextFunc          = window.AudioContext || window.webkitAudioContext;
  window.audioComp              = window.audioComp || {};
  window.audioComp.audioContext = new AudioContextFunc();
  window.audioComp.player       = new WebAudioFontPlayer();

  AFRAME.registerComponent('aframe-audio', {
    schema: {
      soundName: {type: 'string', default: '_drum_35_17_JCLive_sf2_file'},
      soundFile: {type: 'string', default: '12835_17_JCLive_sf2_file.js'}
    },
    /**
     * Set if component needs multiple instancing.
     */
    multiple: false,
    /**
     * Handles component initialization, called once when component is attached. Generally for initial setup.
     * @return {[type]} [description]
     */
    init: function () {
      var that = this;

      let scriptFile = document.createElement('script');
      scriptFile.type = 'text/javascript';
      scriptFile.async = true;
      scriptFile.onload = function () {
        window.audioComp.player.loader.decodeAfterLoading(window.audioComp.audioContext, that.data.soundName);
      }
      scriptFile.src = soundBaseURL + this.data.soundFile;
      document.head.appendChild( scriptFile );

      /**
       * Function which plays souns when interacting with the entity
       * @return {[type]} [description]
       */
      this.onInteract = function(){
        //Check if file has been instanciated
        if(window[this.data.soundName]){
          window.audioComp.player.queueWaveTable(window.audioComp.audioContext, window.audioComp.audioContext.destination, window[this.data.soundName], 0, 35, 3);
        }
      }

      console.log("[AFRAME-Audio Component] Component initialized", this.data.soundName);
    },
    /**
     * Handle updates on the component data 
     * Called when component is attached and when component data changes.
     * Generally modifies the entity based on the data.
     * @return {[type]} [description]
     */
    update: function () {
      this.el.addEventListener('mousedown', this.onInteract.bind(this));
    },
    /**
     * Handles component, called on each animation frame
     * @param  {float} time      global scene uptime
     * @param  {float} timeDelta time since the last frame
     * @return {[type]}           [description]
     */
    tick: function (time, timeDelta) {
    },
    remove: function () {
    }
  });
})();
},{}],2:[function(require,module,exports){
// Use of this source code is governed by an Apache license that can be
// found in the LICENSE file.
(function(){
	"use strict";
  require("./aframe-audio_component.js");
  var Util         = require("./util.js");

  window.onload = function(){
    document.getElementById("loaderDiv").classList.remove('make-container--visible');

    console.log("[WARNING] Service Worker is disabled!");
    //Launch a Service Worker (if possible) for Offline handling
    if (false && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('./service-worker.js')
        .then(function(data) { 
          console.log('Service Worker Registered');
        })
        .catch(function(err){ console.log("Error in registering Service Worker", err)});
    }
  };
})();
},{"./aframe-audio_component.js":1,"./util.js":3}],3:[function(require,module,exports){
var Util = {};
(function(){
  "use strict";
  /**
   * Check if user is on mobile
   * Useful for needed user interaction for media video/audio
   * @return {Boolean} if user is on mobile
   */
  Util.isMobile = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

  /**
   * Analyse an URL search part, look for 'varToExtract=somevalue' in the string
   * @param  {[type]} varToExtract variable we want to extract from the URL
   * @return {[type]} the value associated to the varToExtract, or null if nothing was found
   */
  Util.extractFromUrl = function(varToExtract){
    return new Promise((resolve, reject) => {
      try{
        let parser  = document.createElement('a');
        parser.href = location.href;
        let value   = parser.search.substring(1).split("&").filter(function(cell){ return (cell.indexOf(varToExtract + "=") !== -1);});
        value       = (value.length > 0 ? value[0].split("=") : null);

        resolve(value && value.length > 0 ? value[1] || null : null);
      }
      catch(err){
        reject(err);
      }
    })
  };

  /**
   * Generate an Unique ID
   * @return {string} Unique ID of length 4
   */
  Util.guid = function(){
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4();
  }
})()

module.exports = Util;
},{}]},{},[2]);
