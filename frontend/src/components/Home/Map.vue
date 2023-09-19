<template>
  <section class="position-relative overflow-hidden pt-5 pt-lg-3">
    <div class="container">
      <h1>Map</h1>
      <div id="map" style="height: 400px;"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Map',
  data() {
    return {
      map: null,
      tileLayer: null,
      locations: [
        {
          "id": 1,
          "lat": 46.4802,
          "long": 7.0841,
          "src": 'images/1.jpg',
          "title": "Actifisio",
          "url": "https://www.booking.com/"
        },
        {
          "id": 2,
          "lat": 46.12292,
          "long": 7.3668,
          "title": "Labo XYZ",
          "url": "https://www.google.com/"
        },
        {
          "id": 3,
          "lat": 46.22292,
          "long": 7.5668,
          "title": "Suva",
          "url": "https://www.booking.com/"
        },
        {
          "id": 4,
          "lat": 46.252292,
          "long": 7.5668,
          "title": "CMS",
          "url": "https://www.booking.com/"
        },
      ]
    };
  },
  mounted() {
    this.initMap();
    this.addLocationsToMap();
  },
  methods: {
    initMap() {
      let mapOptions = {
        center: [46.22292, 7.3668],
        zoom: 10
      };
      this.map = new L.map('map', mapOptions);
      this.tileLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
      this.tileLayer.addTo(this.map);
    },
    addLocationsToMap() {
      let popupOption = {
        "closeButton": false
      };
      this.locations.forEach(element => {
        new L.Marker([element.lat, element.long]).addTo(this.map)
            .on("mouseover", event => {
              event.target.bindPopup('<div class="card"><h3>' + element.title + '</h3><br><br> Lien :  www.' + element.title + '.com </div>', popupOption).openPopup();
            })
            .on("mouseout", event => {
              event.target.closePopup();
            })
            .on("click", () => {
              window.open(element.url);
            });
      });
    }
  }
}
</script>

<style scoped>
/* Si vous avez des styles dans "style.css", vous pouvez les intégrer ici. */
</style>
