<template>
  <div class="container">
    <section class="pt-5">
      <div class="container">
        <div class="mb-3">
          <h1>Votez pour votre place de PFP</h1>
          <!-- Affichage de l'ID de l'utilisateur connecté (si disponible) -->
          <p v-if="user">ID Utilisateur: {{ user.uid }}</p>
          <p v-if="studentData">Nom de l'étudiant: {{ studentData.nom }}</p>
          <div v-if="studentData" class="student-info">
            <p>Nom: {{ studentData.Nom }}</p>
            <p>Prénom: {{ studentData.Prenom }}</p>
            <p>AIGU: {{ studentData.AIGU }}</p>
            <p>CABINET: {{ studentData.CABINET }}</p>
            <p>MSQ: {{ studentData.MSQ }}</p>
            <p>NEURO-GER: {{ studentData.NEUROGER }}</p>
            <p>Rehab: {{ studentData.REHAB }}</p>
            <p>Sysint: {{ studentData.SYSINT }}</p>
            <p>FR: {{ studentData.FR }}</p>
            <p>All: {{ studentData.ALL }}</p>
            <!-- Ajoutez d'autres champs ici selon le même principe -->
            <div v-if="getCriteresObligatoires().length > 0">
              <p>Critères obligatoires non atteints :</p>
              <ul>
                <li v-for="critere in getCriteresObligatoires()" :key="critere">{{ critere }}</li>
              </ul>
            </div>
          </div>
        </div>
        <table class="table table-striped">
          <thead>
          <tr>
            <th>Institution</th>
            <th>Canton</th>
            <th>Lieu</th>
            <th>Secteur</th>
            <th>FR</th>
            <th>DE</th>
            <th>AIGU</th>
            <th>REA</th>
            <th>MSQ</th>
            <th>SYSINT</th>
            <th>NEUROGER</th>
            <th>AMBU</th>
            <th>Choix 1</th>
            <th>Choix 2</th>
            <th>Choix 3</th>
            <th>Choix 4</th>
            <th>Choix 5</th>
            <th>ET Choix : Total</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(stage, index) in stages" :key="index"
              :class="{ 'bg-danger': stageHasUnmetCriteria(stage), 'bg-secondary': !stageHasUnmetCriteria(stage) }">
            <td>{{stage.NomInstitution}}</td>
            <td>{{stage.Canton}}</td>
            <td>{{stage.Lieu}}</td>
            <td>{{stage.NomPlace}}</td>
            <td>
              <span v-if="stage.Langue.FR === true">&#9989;</span>
              <span v-else>&#10060;</span>
            </td>
            <td>
              <span v-if="stage.Langue.ALL === true">&#9989;</span>
              <span v-else>&#10060;</span>
            </td>
            <td>
              <span v-if="stage.Secteur.AIGU === true">&#9989;</span>
              <span v-else>&#10060;</span>
            </td>
            <td>
              <span v-if="stage.Secteur.REA === true">&#9989;</span>
              <span v-else>&#10060;</span>
            </td>
            <td>
              <span v-if="stage.Secteur.MSQ === true">&#9989;</span>
              <span v-else>&#10060;</span>
            </td>
            <td>
              <span v-if="stage.Secteur.SYSINT === true">&#9989;</span>
              <span v-else>&#10060;</span>
            </td>
            <td>
              <span v-if="stage.Secteur.NEUROGER === true">&#9989;</span>
              <span v-else>&#10060;</span>
            </td>
            <td>
              <span v-if="stage.Secteur.AMBU === true">&#9989;</span>
              <span v-else>&#10060;</span>
            </td>
            <td v-for="n in 5" :key="`choix-${n}`">
              <input type="checkbox" :checked="choixUtilisateur[`${index}-${n}`]" @change="gererChoix(index, n)">
            </td>
            <td>{{ totalChoixParStage[stage.id] || '0' }}</td>
          </tr>
          </tbody>
        </table>
        <button @click="choice" class="btn btn-primary">Choisir ses choix pour la PFP</button>
        <br>
        <button @click="retourAccueil" class="btn btn-secondary">Retour à l'accueil</button>
      </div>
    </section>
  </div>
</template>


<style scoped>
.bg-danger {
  background-color: white !important;
  /* Mettre en rouge */
}

.bg-secondary {
  background-color: WHITE !important;
  visibility: hidden;
}

.check-icon {
  color: green;
}

.non-check-icon {
  color: red;
}
</style>