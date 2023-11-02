<template>
    <div class="container">
      <section class="pt-5">
        <div class="container">
  
          <!-- Menu de sélection PFP -->
          <div class="mb-3">
            <h1>Choissisez votre stage</h1>
      
            <label for="classInput" class="form-label">Votre Email</label>

            <input type="text" v-model="anneeAcademique" class="form-control" placeholder="E-Mail" />
  
  
          </div>
  
  
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Stage</th>
                <th>Institution</th>
                <th>Canton</th>
                <th>Lieu</th>
                <th>Langue</th>
                <th>Secteur</th>
                <th>Praticien Formateur</th>
                <th>Nom Institution</th>
                <th>AIGU </th>
                <th>REA </th>
                <th>MSQ </th>
                <th>SYSINT </th>
                <th>NEUROGER </th>
                <th>AMBU </th>
          
              </tr>
            </thead>
            <tbody>
              <tr v-for="(stage, index) in filteredStages" :key="index">
                <td>{{ stage.id }}</td>
                <td>{{ stage.active }}</td>
                <td v-once>{{ stageData[stage.id] ? stageData[stage.id].AIGU : 'd' }}</td>
                <td v-once>{{ stageData[stage.id] ? stageData[stage.id].idInstitution : 'e' }}</td>
                <td v-once>{{ stageData[stage.id] ? stageData[stage.id].NpmPractitionerTrainer : 'fdse' }}</td>
                <td v-once>{{ stageData[stage.id] ? stageData[stage.id].id : 'g' }}</td>
              </tr>
            </tbody>
          </table>
  
          <button @click="createPFP" class="btn btn-primary">Valider PFP</button>
  
        </div>
      </section>
    </div>
  </template>
  
  
  
  <script>
  import { db } from '../../../../firebase.js';
  import { ref, onValue, set, off, update, push, get, child } from "firebase/database";
  import { watch, reactive } from 'vue';
  export default {
    name: 'Votation',
    data() {
      return {
       
      };
    },
  
 
  
    methods: {
 
    },
    // Dans la section script
    computed: {
 
    },
  
    mounted() {
  
 
    }
  
  };
  </script>
  
  <style scoped>
  /* Vos styles CSS ici si nécessaire */
  </style>
  