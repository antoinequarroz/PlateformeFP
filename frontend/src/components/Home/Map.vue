<template>
  <section class="position-relative overflow-hidden pt-5 pt-lg-3">
    <div class="container">
      <h1>Map</h1>
      <h3>Liste des différentes places de stages en Suisse</h3>
      <div id="map" style="height: 600px;"></div>
    </div>
  </section>
</template>

<script>
import { db } from '../../../firebase.js';
import { ref, onValue } from "firebase/database";

export default {
  name: 'Map',
  data() {
    return {
      map: null,
      tileLayer: null,
      institutions: []
    };
  },
  mounted() {
    this.initMap();
    this.fetchInstitutionsFromFirebase();
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
    fetchInstitutionsFromFirebase() {
      const institutionsRef = ref(db, 'institutions/');
      onValue(institutionsRef, (snapshot) => {
        const data = snapshot.val();
        this.institutions = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
        this.addLocationsToMap();
      });
    },
    addLocationsToMap() {
      let popupOption = {
        "closeButton": true,
        "maxWidth": 300
      };
      this.institutions.forEach(element => {
        new L.Marker([element.Latitude, element.Longitude]).addTo(this.map)
            .bindPopup(`
              <div class="card">
                <h3>${element.Name}</h3>
                <p>Lieu: ${element.Lieu}</p>
                <p>Canton: ${element.Canton}</p>
                <a href="${element.URL}" target="_blank">Site Web</a>
                <br>
                <button @click="goToDetails(${element.id})">Détails</button>
              </div>
            `, popupOption);
      });
    },
    goToDetails(instId) {
      this.$router.push({ name: 'institution-details', params: { instId } });
    }
  }
}
</script>

<style scoped>
</style>
