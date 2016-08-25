Drupal.openlayers.pluginManager.register({
  fs: 'openlayers.Style:ifplabel',
  init: function(data) {
    return function (feature, resolution) {

      // What is the 'resolution' argument? http://bit.ly/28QFprM
      // At zoom level 20, 1px on the map equals 0.15 meters (6 inches)
      // Example: at zoom level 20 a cube is about 22px * 6 inches = ~11 feet square

      if (!(feature instanceof ol.Feature)) {
        return null;
      }
      var geometry = feature.getGeometry().getType();
      var geometry_style = data.opt[geometry] || data.opt['default'];
      var thelabel;
      var thecolor = feature.get('color') || '';
      var thename = feature.get('name') || '';
      var thedescription = feature.get('description') || '';

      /**
       * Generate propotionate font size
       */

      // Get resolution
      var theresolution = resolution;
      // Convert resolution into a font-size commensurate to the current zoom level.
      var thefontsize = (((100 - (theresolution * 100)) / (theresolution * 200))).toFixed(2);

      /**
       * Find the person's name in the Teaser description
       */
      thedescription = jQuery(thedescription).find('h2').text();

      if (thedescription.length) {
        thelabel = thedescription;
      } else {
        thelabel = thename;
      }

      return [

        new ol.style.Style({
          image: new ol.style.Circle({
            fill: new ol.style.Fill({
              color: 'rgba(' + geometry_style.image.fill.color + ')'
            }),
            stroke: new ol.style.Stroke({
              width: 1,
              color: 'lightgrey'
            }),
            radius: 8
          }),
          text: new ol.style.Text({
            font: thefontsize + 'px helvetica,sans-serif',
            text: thelabel,
            rotation: -51,
            stroke: new ol.style.Stroke({
              color: '#fff',
              width: 3
            })
          })
        })
      ];
    };
  }
});
