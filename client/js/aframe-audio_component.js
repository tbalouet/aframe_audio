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