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

              <th>AIGU </th>
              <th>REA </th>
              <th>MSQ </th>
              <th>SYSINT </th>
              <th>NEUROGER </th>
              <th>AMBU </th>
              <th>Choix 1 </th>
              <th>Choix 2 </th>
              <th>Choix 3 </th>
              <th>Choix 4 </th>
              <th>Choix 5 </th>

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

              <!-- Les choix et les ET Choix ne sont pas fournis dans votre exemple de données -->
              <!-- Ajoutez d'autres colonnes selon le même principe si nécessaire -->
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

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, set } from "firebase/database";

export default {
  name: 'Votation',
  data() {
    return {
      stages: [],
      user: null,
      studentData: null,
      choixUtilisateur: {},
      totalChoixParStage: {}, // Ajout pour stocker les totaux

      // Nouvel objet pour suivre les choix
      // Ajoutez cette ligne
    };
  },

  created() {
    this.calculerTotalChoix(); // Calculer les totaux au démarrage

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.fetchStudentData(user.uid); // Cherche les données de l'étudiant
        this.fetchStagesData(); // Ajoutez cet appel pour charger les données des stages
      } else {
        this.user = null;
      }
    });
  },


  methods: {
    choice() {
      const db = getDatabase();
      const userId = this.user.uid;
      const choixPath = `/choicePFP4/${userId}/choix`;
      const choixUtilisateur = this.choixUtilisateur;
      console.log("-------------aaa----------");
      console.log(choixUtilisateur);
      console.log("--------------aaaa---------");

      let choixAEnvoyer = {};
      for (const [cle, estChoisi] of Object.entries(choixUtilisateur)) {
        console.log("ok1");
        console.log(estChoisi);
        console.log(cle);
        if (estChoisi) {
          const [idStage, numeroChoix] = cle.split('-'); // Utiliser l'ID du stage directement
          console.log("ok1");
          console.log(idStage);
          console.log(numeroChoix);
          console.log("ok2");

          if (!choixAEnvoyer[numeroChoix]) {
            choixAEnvoyer[numeroChoix] = idStage; // Enregistrer l'ID du stage
          }
        }
      }

      set(ref(db, choixPath), choixAEnvoyer)
        .then(() => {
          console.log("Choix enregistrés avec succès");
          alert("Merci pour votre votation. Vous pouvez maintenant retourner à l'accueil.");
          // Optionnel: Rediriger l'utilisateur vers l'accueil ou afficher le bouton de retour
        })
        .catch((error) => {
          console.error("Erreur lors de l'enregistrement des choix", error);
        });
    },



    calculerTotalChoix() {
      const db = getDatabase();
      const choixRef = ref(db, '/choicePFP4'); // Chemin vers les choix des étudiants
      get(choixRef).then((snapshot) => {
        if (snapshot.exists()) {
          const choixTousEtudiants = snapshot.val();
          let totalChoixParStage = {}; // Pour compter les choix pour chaque stage

          // Parcourir les choix de chaque étudiant
          Object.values(choixTousEtudiants).forEach(choixEtudiant => {
            Object.values(choixEtudiant.choix).forEach(idStage => {
              if (totalChoixParStage[idStage]) {
                totalChoixParStage[idStage]++;
              } else {
                totalChoixParStage[idStage] = 1;
              }
            });
          });
          console.log(totalChoixParStage);
          // Mettre à jour les totaux dans les données du composant
          this.totalChoixParStage = totalChoixParStage;
        } else {
          console.log("Aucun choix trouvé.");
        }
      }).catch((error) => {
        console.error("Erreur lors de la récupération des choix", error);
      });
    },

    retourAccueil() {
      this.$router.push('/'); // Redirige l'utilisateur vers la route de l'accueil
    },
    
    stageHasUnmetCriteria(stage) {
      // Ensure that stage and stage.Secteur are defined before accessing properties
      if (!stage || !stage.Secteur) {
        console.error('Stage or stage.Secteur is undefined', stage);
        return false;
      }

      const unmetCriteria = this.getCriteresObligatoires();
      console.log(unmetCriteria);
      // Assuming `unmetCriteria` is an array of strings corresponding to keys in stage.Secteur
      return unmetCriteria.some(critere => stage.Secteur[critere] === true);
    },




    

    fetchStagesData() {
      const db = getDatabase();

      const stagesRef = ref(db, '/PFP4'); // Chemin d'accès aux données des stages
      get(stagesRef).then((snapshot) => {
        if (snapshot.exists()) {
          this.stages = Object.values(snapshot.val()); // Convertit les données en tableau si nécessaire
          console.log(this.stages);

        } else {
          console.log("No stages data available");
        }
      }).catch((error) => {

        console.error(error);
      });
    },

    getCriteresObligatoires() {
  const criteres = [];
  let hasZeroValue = false; // Flag to check if any criteria have value "0"

  if (this.studentData) {
    // Iterate over each property of studentData
    Object.entries(this.studentData).forEach(([key, value]) => {
      if (value === "0") { // If the value is "0", it's an obligatory criteria
        criteres.push(key); // Add the key to the list of criteria
        hasZeroValue = true; // Set flag to true
      }
    });

    // If no criteria equal "0", add all criteria as obligatory
    if (!hasZeroValue) {
      Object.keys(this.studentData).forEach(key => {
        criteres.push(key); // Add all criteria keys to the list
      });
    }
  }
  return criteres; // Return the list of obligatory criteria
},


    fetchStudentData(userId) {
      const db = getDatabase();
      const studentRef = ref(db, `/students/ba21/${userId}`);
      get(studentRef).then((snapshot) => {
        if (snapshot.exists()) {
          this.studentData = snapshot.val(); // Met à jour studentData avec les données reçues
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    },


    gererChoix(stageIndex, choixIndex) {
      console.log(`Gestion du choix pour stage ${stageIndex}, choix ${choixIndex}`);

      // Identifier si le choix était déjà sélectionné
      const cleChoix = `${stageIndex}-${choixIndex}`;
      const etatActuel = this.choixUtilisateur[cleChoix] || false;

      // Préparer un nouvel objet pour mettre à jour l'état de manière réactive
      const nouvelEtat = {};

      // Réinitialiser tous les choix pour cette ligne
      for (let n = 1; n <= 5; n++) {
        const cle = `${stageIndex}-${n}`;
        nouvelEtat[cle] = false; // Réinitialiser tous les choix de la ligne
      }

      // Réinitialiser tous les choix pour cette colonne si nécessaire
      // Commentez ou supprimez cette boucle si la sélection unique par colonne n'est pas requise
      this.stages.forEach((_, idx) => {
        const cle = `${idx}-${choixIndex}`;
        nouvelEtat[cle] = false; // Réinitialiser le choix dans la même colonne pour toutes les lignes
      });

      // Si le choix n'était pas déjà sélectionné, le marquer comme sélectionné
      if (!etatActuel) {
        nouvelEtat[cleChoix] = true; // Marquer le nouveau choix comme sélectionné
      }

      // Mettre à jour l'objet choixUtilisateur de manière réactive
      this.choixUtilisateur = { ...this.choixUtilisateur, ...nouvelEtat };
    },

    // Autres méthodes ici
  }
}
</script>

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
