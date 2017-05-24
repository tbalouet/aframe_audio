//This component is based on the work of Srgy Surkv
//Github repo to be found here: https://github.com/surikov/webaudiofont


(function(){
  "use strict";

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
      /**
       * Function which plays souns when interacting with the entity
       * @return {[type]} [description]
       */
      this.onInteract = function(){
        console.log("[AFRAME-Audio Component] Houston we've been clicked!");
        player.queueWaveTable(audioContext, audioContext.destination, this.data.soundName, 0, 35, 3);
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
      this.el.addEventListener('click', this.onInteract);
    },
    /**
     * Handles component, called on each animation frame
     * @param  {float} time      global scene uptime
     * @param  {float} timeDelta time since the last frame
     * @return {[type]}           [description]
     */
    tick: function (time, timeDelta) {
    },
    /**
     * Called when entity pauses.
     * Use to stop or remove any dynamic or background behavior such as events.
     * @return {[type]} [description]
     */
    pause: function () { },

    /**
     * Called when entity resumes.
     * Use to continue or add any dynamic or background behavior such as events.
     * @return {[type]} [description]
     */
    play: function () { },

    /**
     * Handles component removal, called when a component is removed (e.g., via removeAttribute).
     * Generally undoes all modifications to the entity.
     * @return {[type]} [description]
     */
    remove: function () {
    }
  });
})();