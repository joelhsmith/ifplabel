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
      var ifp_label;
      var ifp_color = feature.get('color') || '';
      var ifp_name = feature.get('name') || '';
      var ifp_description = feature.get('description') || '';

      /**
       * Generate propotionate font size
       */

      // Get resolution
      var ifp_resolution = resolution;
      // Convert resolution into a font-size commensurate to ifp_ current zoom level.
      var ifp_fontsize = (((100 - (ifp_resolution * 100)) / (ifp_resolution * 200))).toFixed(2);
      var ifp_radius = (((100 - (ifp_resolution * 100)) / (ifp_resolution * 100))).toFixed(2);

      /**
       * Find ifp_ person's name in ifp_ Teaser description
       */
      ifp_description = jQuery(ifp_description).find('h2').text();

      if (ifp_description.length) {
        ifp_label = ifp_description;
      } else {
        ifp_label = ifp_name;
      }

      return [

        new ol.style.Style({
          image: new ol.style.Circle({
            fill: new ol.style.Fill({
              color: 'rgba(' + geometry_style.image.fill.color + ')'
            }),
            stroke: new ol.style.Stroke({
              width: 1,
              color: 'transparent'
            }),
            radius: ifp_radius
          }),
          text: new ol.style.Text({
            font: ifp_fontsize + 'px helvetica,sans-serif',
            text: ifp_label,
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
