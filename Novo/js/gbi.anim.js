/* make request animation frame compatible */
(function() {
	var requestAnimationFrame = window.requestAnimationFrame || 
			window.mozRequestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function( callback ){
				window.setTimeout(callback, 1000 / 60);
			}; 
			window.requestAnimationFrame = requestAnimationFrame;
}());

// util namespace
//$(document).ready(function() {

(function($) {

	Drupal.behaviors.Anim = {
		attach: function(context, settings) { 

(function() {
        window.Gbi = window.Gbi || {};
        window.Gbi.anim = window.Gbi.anim || {};

        /**
        * Default options 
        */
        var _defaults = {
            /**
             * Calulates the y-offset of the page for all browsers
             * @returns {Number} y-offset
             */
            pos:function() {
                //for IE versions 8 and before
                if (window.pageXOffset !== null) return window.pageYOffset;
                //standard browsers & quirks mode
                var d = window.document;
                return (document.compatMode === "CSS1Compat") ? d.documentElement.scrollTop : d.body.scrollTop ;
            },
            easingFactor: 0.05,
            timingFactor: 1
        };

        /**
         * Initializes the animation
         * @param {Array} animDataArray 
         *          {Array}
         *              {String} scene                          Classname or ID of the parent element (use # or . to specify selector type)
         *              {String} name                           Classname or ID of the element (use # or . to specify selector type)
         *              {Object} segments
         *                  {Boolean} pos                       determines if x and y value should be evaluated
         *                  {Number} p                          position relative to page scroll
         *                  {Number} x                          x coord
         *                  {Number} y                          y coord
         *                  {String} originX                    determines origin of x coordinates ("left" or "right", if left away or value is not "right", "left" is assumed)
         *                  {String} originY                    determines origin of y coordinates ("top" or "bottom", if left away or value is not "bottom", "top" is assumed)
         *                  {Boolean} alpha                     determines if opacity value should be evaluated
         *                  {Number} opacity                    opacity value (0-1)
         *                  {Boolean} scale                     determines if size value should be evaluated
         *                  {Array} size                        element size
         *                      {Number}
         *                      {Number}
         *                  {Boolean} rotate                    determines if degrees value should be evaluated for rotation
         *                  {Number} degrees                    degrees for rotation
         * 
         * @param {Object} opts
         *          {Number} timingFactor        
         *          {Number} easingFactor                       
         */        
        Gbi.anim.init = function(animDataArray, opts) {
            
            this._animDataArray = animDataArray;
            this._opts = _defaults;                
            if(opts) {
                    if(opts.hasOwnProperty("timingFactor")) this._opts.timingFactor = opts.timingFactor;
                    if(opts.hasOwnProperty("easingFactor")) this._opts.easingFactor = opts.easingFactor;
            }
            this._topScroll = this._opts.pos();
            
            for (var i = 0; i < this._animDataArray.length; i++) {
                var sceneName=this._animDataArray[i].scene.slice(1, this._animDataArray[i].scene.length); 

                var sceneObject = (this._animDataArray[i].scene.charAt(0)==="#") ? document.getElementById(sceneName) : document.getElementsByClassName(sceneName)[0];
                var targetObject;
                if(this._animDataArray[i].name !== ""){
                    var targetName=this._animDataArray[i].name.slice(1, this._animDataArray[i].name.length);
                    targetObject = (this._animDataArray[i].name.charAt(0)==="#") ? document.getElementById(targetName) : sceneObject.getElementsByClassName(targetName)[0];
                }else{
                    targetObject = sceneObject;
                }
                
                this._animDataArray[i].target = targetObject;
            }
        };
  
        /**
        * Runs a reposition loop, this should be called periodically or onscroll
        */        
        Gbi.anim.run = function() {
            // do some easing here
            this._topScroll += Math.floor((this._opts.pos() - this._topScroll) * this._opts.easingFactor);
            //iterate through the amination objects
            for (var i = 0; i < this._animDataArray.length; i++) {                
                this._animate(this._topScroll, this._animDataArray[i]);
            }
        };

        /**
         * Animates a reposition loop, this should be called periodically or onscroll
         * @param {Number} pos
         * @param {Number} obj
         */         
        Gbi.anim._animate = function(pos, obj) {
            var step = obj.segments.length;
            for (var i = 0; i < obj.segments.length; i++) {
                if (pos < obj.segments[i].p) {
                    step = i;
                    break;
                    
                }
            }

            switch (step) {
                case 0:
                    this._changeFix(obj.target, obj.segments[step]);
                    break;
                case obj.segments.length:
                    this._changeFix(obj.target, obj.segments[step - 1]);
                    break;
                default:
                    this._change(pos, obj.target, obj.segments[step - 1], obj.segments[step]);
            }
        };
  
        /**
        * Updates absolute object's css properties
        * @param {Object} target        target to animate
        * @param {Object} animobj       changed target's properties
        */  
        Gbi.anim._changeFix = function(target, animobj) {
            var cssObj = {};
            if (animobj.pos) {
                if (animobj.originX === "right") {
                    cssObj["right"] = animobj.x + "px";
                } else {
                    cssObj["left"] = animobj.x + "px";
                }
                if (animobj.originY === "bottom") {
                    cssObj["bottom"] = animobj.y + "px";
                } else {
                    cssObj["top"] = animobj.y + "px";
                }
            }

            if (animobj.alpha) {
                cssObj["opacity"] = animobj.opacity;

                if (animobj.opacity === 0) {
                    cssObj["display"] = "none";
                } else {
                    cssObj["display"] = "block";
                }
            }

            if (animobj.scale) {
                cssObj["width"] = animobj.size[0];
                cssObj["height"] = animobj.size[1];
            }

            for(var cssProp in cssObj) {
                if(cssProp !== undefined) {
                    target.style[cssProp] = cssObj[cssProp];                    
                }
            }              
        };

        /**
        * Updates relative object's css properties
        * @param {Number} pos           y-offset
        * @param {Object} target        target
        * @param {Object} animobj1      changed target's properties 1
        * @param {Object} animobj2      changed target's properties 2
        */   
        Gbi.anim._change = function(pos, target, animobj1, animobj2) {
            
            var per = (pos - animobj1.p) / (animobj2.p - animobj1.p);
            var cssObj = {};
            if (animobj1.pos) {
                if(animobj1.originX === "right") {
                    cssObj["right"] = ((animobj2.x - animobj1.x) * per + animobj1.x) + "px";
                } else {
                    cssObj["left"] = ((animobj2.x - animobj1.x) * per + animobj1.x) + "px";
                }
                if(animobj2.originY === "bottom") {
                    cssObj["bottom"] = ((animobj2.y - animobj1.y) * per + animobj1.y) + "px";
                } else {
                    cssObj["top"] = ((animobj2.y - animobj1.y) * per + animobj1.y) + "px";
                }
            }

            if (animobj1.alpha) {
                var doa = (animobj2.opacity - animobj1.opacity);
                if (doa !== 0) {
                    if (animobj2.opacity < animobj1.opacity) {
                        doa = animobj1.opacity - Math.abs(doa * per);
                    } else {
                        doa = Math.abs(doa * per);
                    }
                } else {
                    doa = animobj2.opacity;
                }
                cssObj["opacity"] = doa;
                if (doa === 0) {
                    cssObj["display"] = "none";
                } else {
                    cssObj["display"] = "block";
                }
            }

            if (animobj1.scale) {
                cssObj["width"] = Math.floor((animobj2.size[0] - animobj1.size[0]) * per + animobj1.size[0]) + "px";
                cssObj["height"] = Math.floor((animobj2.size[1] - animobj1.size[1]) * per + animobj1.size[1]) + "px";
            }

            if (animobj1.rotate)
                cssObj["transform"] = "rotate(" + ((animobj2.degrees - animobj1.degrees) * per) + "deg)";

            for(var cssProp in cssObj) {
                if(cssProp !== undefined)
                    target.style[cssProp] = cssObj[cssProp];
            }            
        };
}());
}}}(jQuery));