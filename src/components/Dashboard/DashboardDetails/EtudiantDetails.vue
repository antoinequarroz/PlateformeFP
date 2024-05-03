<template>
  <div class="container">
    <section v-if="etudiant" class="pt-5">
      <div class="container">
        <div class="row g-4 g-sm-5">
          <!-- Left sidebar START -->
          <!-- Votre code existant pour la barre latérale gauche -->
          <!-- Left sidebar END -->

          <!-- Main content START -->
          <div class="col-xl-8">
            <!-- Title -->
            <h1 class="mb-4">{{ etudiant ? etudiant.id : 'ID non disponible' }}</h1>

            <!-- Rating -->
            <div class="d-flex align-items-center mb-4">
              <h2 class="me-3 mb-0">{{ id }}</h2>
              <div>
                <a class="badge bg-primary bg-opacity-10 text-primary">{{ id }}</a>
              </div>
            </div>

            <!-- Content -->
            <div>
              <h1>Informations sur l'étudiant</h1>
              <ul>
                <li>Prenom {{ etudiant.Prenom }}</li>
                <li>NOM {{ etudiant.Nom }}</li>
                <li>Mail :{{ etudiant.Mail }}</li>

                <li> Aigu : {{ etudiant.AIGU }}</li>
                <li>Allemand : {{ etudiant.ALL }}</li>
                <li>Francais : {{ etudiant.FR }}</li>
                <li>ID {{ etudiant.ID_User }}</li>
                <li> MSQ {{ etudiant.MSQ }}</li>
                <li> NEUROGER {{ etudiant.NEUROGER }}</li>
                <li>PFP1{{ etudiant.PFP1_ }}</li>
                <li>{{ etudiant.PFP1_info }}</li>
                <li>PFP2{{ etudiant.PFP2_ }}</li>
                <li>{{ etudiant.PFP2_info }}</li>
                <li>{{ institutions }}</li>
                <li>REHAB {{ etudiant.REHAB }}</li>
                <li>SYSINT {{ etudiant.SYSINT }}</li>
              </ul>
            </div>

            <!-- Additional info -->
            <div class="row mb-3">
              <!-- Vous pouvez ajouter des informations supplémentaires ici si nécessaire -->
            </div>

            <!-- Book detail START -->
            <div class="col-12">
              <!-- Tabs START -->
              <ul class="nav nav-pills nav-pills-bg-soft px-3" id="book-pills-tab" role="tablist">
                <!-- Vous pouvez ajouter des onglets ici si nécessaire -->
              </ul>
              <!-- Tabs END -->

              <!-- Tab contents START -->
              <div class="tab-content pt-4 px-3" id="book-pills-tabContent">
                <!-- Vous pouvez ajouter du contenu d'onglet ici si nécessaire -->
              </div>
              <!-- Tab contents END -->
            </div>
            <!-- Book detail END -->
          </div>
          <!-- Main content END -->
        </div> <!-- Row END -->
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { db } from '../../../../firebase.js';
import { get, ref as r, onValue } from "firebase/database";

export default {
  props: ['id'],  

  setup(props) {
    const etudiant = ref(null);
    const institutions = ref({});  // Objet pour stocker les données des institutions

    const fetchInfoPFP = async (idPFP) => {
      try {
        console.log(idPFP);
        const pfpRef = r(db, `institutions/${idPFP}`);
        const snapshot = await get(pfpRef);
        if (snapshot.exists()) {
          const pfpData = snapshot.val();
          console.log(pfpData);
          // Mettre à jour l'objet institutions avec les données récupérées
          institutions.value[idPFP] = pfpData;  // Stocker les données dans institutions sous la clé idPFP
          console.log("Données de l'institution récupérées:", pfpData);
        } else {
          console.log("Aucune donnée d'institution trouvée pour l'ID:", idPFP);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données de l'institution:", error);
      }
    };

    onMounted(async () => {
      const etudiantRef = r(db, `students/ba22/${props.id}`);
      onValue(etudiantRef, (snapshot) => {
        const etudiantData = snapshot.val();
        if (etudiantData) {
          etudiant.value = etudiantData;
          fetchInfoPFP(etudiantData.PFP1_);
          fetchInfoPFP(etudiantData.PFP2_);
        } else {
          console.log("Aucune donnée étudiant trouvée pour l'ID:", props.id);
        }
      });
    });

    return { etudiant, institutions };  // Retourner institutions pour l'utiliser dans le template
  }
};


</script>

<style scoped>
/* Vos styles CSS ici si nécessaire */
</style>
