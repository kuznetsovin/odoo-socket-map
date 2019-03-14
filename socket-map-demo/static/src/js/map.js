odoo.define('vehicle_manage.map', function (require) {
    'use strict';

    var core = require('web.core');
    var Widget = require('web.Widget');

    var MapWidget = Widget.extend({
        cssLibs: [
            '/vehicle_manage/static/lib/ol/ol.css'
        ],
        jsLibs: [
            '/vehicle_manage/static/lib/ol/ol.js'
        ],

        start: function () {
            var vectorSource = new ol.source.Vector({});

            var map = this._createMap(vectorSource);

            var ws = new WebSocket('ws://localhost:8081/ws');

            ws.onopen = function () {
                console.log("Connected");
                map.render();
            };

            ws.onmessage = function (event) {
                var currentFeature = (new ol.format.GeoJSON()).readFeature(event.data);

                var clientID = currentFeature.get('client');

                var prevFeature = vectorSource.getFeatureById(clientID);

                if (prevFeature == null) {
                    currentFeature.setStyle(this._markerStyle);
                    currentFeature.setId(clientID);
                    vectorSource.addFeature(currentFeature);
                } else {
                    var coord = currentFeature.getGeometry().getCoordinates();
                    prevFeature.getGeometry().setCoordinates(coord);
                }

                console.log(currentFeature.get('client'));
                map.render();
            };
        },

        _createMap: function (sourceVector) {
            var mapElement = this.$el[0];
            $(mapElement).attr("id", "map");
            var map = new ol.Map({
                target: mapElement,
                view: new ol.View({
                    projection: 'EPSG:4326',
                    center: [37.62631916049958, 55.749110620880145],
                    zoom: 9,
                    minZoom: 2,
                    maxZoom: 19
                }),
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.XYZ({
                            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        })
                    }),
                    new ol.layer.Vector({
                        source: sourceVector
                    })
                ]
            });


            map.on("click", function (e) {
                map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {

                    // обработка клика по машинке
                    map.getView().setCenter(feature.getGeometry().getCoordinates());
                    map.getView().setZoom(14);
                });
            });
            return map
        },

        _markerStyle: function () {
            return new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({color: 'black'}),
                    stroke: new ol.style.Stroke({
                        color: 'white', width: 2
                    })
                })
            });
        }
    });

    core.action_registry.add('map', MapWidget);
});