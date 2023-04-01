import Widget from './widget.js';
import {Map, View, Feature} from 'ol';
import {defaults, MouseWheelZoom} from 'ol/interaction.js';
import {platformModifierKeyOnly} from 'ol/events/condition.js';
import {Tile} from 'ol/layer.js';
import {OSM} from 'ol/source.js';
import {fromLonLat, toLonLat} from 'ol/proj.js';
import {Point} from 'ol/geom.js';
import {Vector as VectorLayer} from 'ol/layer.js';
import {Vector as VectorSource} from 'ol/source.js';
import {easeOut} from 'ol/easing.js';
import 'ol/ol.css';
import './contact-map-widget.css';

class ContactMapWidget extends Widget {
  #map;

  constructor() {
    super();

    this.classList.add('contact-map');

    this.#map = this.createMap();
    this.#map.addEventListener('click', this.onMapClick.bind(this));
  }

  /**
   * @return {Map}
   */
  createMap() {
    const interactions = this.createInteractions();
    const layers = this.createLayers();
    const view = this.createView();
    const target = this;

    return new Map({interactions, layers, view, target});
  }

  /**
   * @return {Tile[]}
   */
  createLayers() {
    const tileLayer = this.createTileLayer();

    return [tileLayer];
  }

  /**
   * @return {Tile}
   */
  createTileLayer() {
    const source = new OSM();

    return new Tile({source});
  }

  /**
   * @return {View}
   */
  createView() {
    const center = [0, 0];
    const zoom = 10;

    return new View({center, zoom});
  }

  /**
   * @return {Collection<Interaction>}
   */
  createInteractions() {
    const mouseWheelZoom = false;
    const mouseWheelZoomInteraction = this.createMouseWheelZoomInteraction();

    return defaults({mouseWheelZoom}).extend([mouseWheelZoomInteraction]);
  }

  /**
   * @return {MouseWheelZoom}
   */
  createMouseWheelZoomInteraction() {
    const condition = platformModifierKeyOnly;

    return new MouseWheelZoom({condition});
  }

  /**
   * @param {Contact[]} contacts
   */
  renderFeatures(contacts) {
    const features = contacts.map(this.createFeature);
    const source = new VectorSource({features});
    const layer = new VectorLayer({source});

    this.#map.addLayer(layer);
  }

  /**
   * @param {Contact} contact
   * @return {Feature}
   */
  createFeature(contact) {
    const coordinates = fromLonLat([contact.longitude, contact.latitude]);
    const feature = new Feature(new Point(coordinates));

    feature.setId(contact.id);

    return feature;
  }

  /**
   * @param {number[]} lonLat
   */
  setCenter(lonLat) {
    const center = fromLonLat(lonLat);
    const duration = 300;
    const easing = easeOut;

    this.#map.getView().animate({center, duration, easing});
  }

  /**
   * @param {MapBrowserEvent} event
   */
  onMapClick(event) {
    const [feature] = this.#map.getFeaturesAtPixel(event.pixel, {
      hitTolerance: 10,
    });

    if (feature) {
      // @ts-ignore
      const coordinates = feature.getGeometry().getCoordinates();

      this.setCenter(toLonLat(coordinates));
      this.fireEvent('feature-selected', feature);
    }
  }
}

customElements.define('contact-map-widget', ContactMapWidget);

export default ContactMapWidget;
