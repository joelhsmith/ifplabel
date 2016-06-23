Drupal.openlayers.pluginManager.register({
  fs: 'openlayers.Style:ifplabel',
  init: function(data) {
    return function (feature, resolution) {
      if (!(feature instanceof ol.Feature)) {
        return null;
      }
      var geometry = feature.getGeometry().getType();
      var geometry_style = data.opt[geometry] || data.opt['default'];
      var thelabel;
      var thename = feature.get('name') || '';
      var thedescription = feature.get('description') || '';

      var theresolution = resolution;
      // this is better (2x) - 1/2
      var thefontsize = Math.round(((100 - (theresolution * 100))) / (theresolution * 200));

      thedescription = jQuery(thedescription).find('h2').text();

      console.log(thedescription);

      if (thedescription.length) {
        thelabel = thedescription;
      } else {
        thelabel = thename;
      }

      return [

        new ol.style.Style({

          text: new ol.style.Text({
            font: thefontsize + 'px helvetica,sans-serif',
            text: thelabel,
            rotation: -51,
            stroke: new ol.style.Stroke({
              color: '#fff',
              width: 2
            })
          })
        })
      ];
    };
  }
});