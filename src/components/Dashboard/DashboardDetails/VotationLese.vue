<template>
  <div class="container py-5">
    <div class="text-center mb-4">
      <h1 class="mb-3">Votez pour votre place de PFP</h1>
      <!-- <p v-if="user" class="fst-italic">ID Utilisateur: {{ user.uid }}</p> -->
      <p v-if="studentData" class="fst-italic">Nom de l'étudiant: {{ studentData.Nom + " " +studentData.Prenom}}</p>
    </div>

    <div v-if="studentData" class="mb-3">
      <div>
        <div>
          <div>
            <h3 class="mb-0">Informations de l'étudiant</h3>
          </div>
          <div class="">
            <div class="row g-3">
              <div class="col-md-4">
                <div class="p-3">
                  <p class="mb-2 fw-bold">Nom: <span class="text-secondary">{{ studentData.Nom }}</span></p>
                  <p class="mb-2 fw-bold">Prénom: <span class="text-secondary">{{ studentData.Prenom }}</span></p>
                  <p class="mb-2 fw-bold">AIGU: <span class="text-secondary">{{ studentData.AIGU }}</span></p>
                  <p class="mb-2 fw-bold">CABINET: <span class="text-secondary">{{ studentData.CABINET }}</span></p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="p-3">
                  <p class="mb-2 fw-bold">MSQ: <span class="text-secondary">{{ studentData.MSQ }}</span></p>
                  <p class="mb-2 fw-bold">NEURO-GER: <span class="text-secondary">{{ studentData.NEUROGER }}</span></p>
                  <p class="mb-2 fw-bold">Rehab: <span class="text-secondary">{{ studentData.REHAB }}</span></p>
                  <p class="mb-2 fw-bold">Sysint: <span class="text-secondary">{{ studentData.SYSINT }}</span></p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="p-3">
                  <p class="mb-2 fw-bold">FR: <span class="text-secondary">{{ studentData.FR }}</span></p>
                  <p class="mb-2 fw-bold">All: <span class="text-secondary">{{ studentData.ALL }}</span></p>
                  <!--<div v-if="getCriteresObligatoires().length > 0" class="mt-3">
                     <p class="fw-bold">Critères obligatoires non atteints :</p>
                     <ul class="list-group">
                       <li v-for="critere in getCriteresObligatoires()" :key="critere" class="list-group-item list-group-item-danger col-2 text-center">{{ critere }}</li>
                     </ul>
                   </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="table-responsive">
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
          <th>Choix1</th>
          <th>Choix2</th>
          <th>Choix3</th>
          <th>Choix4</th>
          <th>Choix5</th>
          <th>Nbre d'inscrits</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(stage, index) in stages" :key="index" :class="{ 'table-secondary': stageHasUnmetCriteria(stage), 'table-danger': !stageHasUnmetCriteria(stage) }">
          <td>{{ stage.NomInstitution }}</td>
          <td>{{ stage.Canton }}</td>
          <td>{{ stage.Lieu }}</td>
          <td>{{ stage.NomPlace }}</td>
          <td v-if="stage.Langue.FR">&#9989;</td>
          <td v-else>&#10060;</td>
          <td v-if="stage.Langue.ALL">&#9989;</td>
          <td v-else>&#10060;</td>
          <td v-if="stage.Secteur.AIGU">&#9989;</td>
          <td v-else>&#10060;</td>
          <td v-if="stage.Secteur.REA">&#9989;</td>
          <td v-else>&#10060;</td>
          <td v-if="stage.Secteur.MSQ">&#9989;</td>
          <td v-else>&#10060;</td>
          <td v-if="stage.Secteur.SYSINT">&#9989;</td>
          <td v-else>&#10060;</td>
          <td v-if="stage.Secteur.NEUROGER">&#9989;</td>
          <td v-else>&#10060;</td>
          <td v-if="stage.Secteur.AMBU">&#9989;</td>
          <td v-else>&#10060;</td>
          <td v-for="n in 5" :key="`choix-${n}`">
            <input type="checkbox" :disabled="!stageHasUnmetCriteria(stage)" :checked="choixUtilisateur[`${index}-${n}`]" @change="gererChoix(index, n)">
          </td>

          <td>{{ totalChoixParStage[stage.id] ||'0' }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="d-flex justify-content-center mt-4">
      <button @click="choice" class="btn btn-primary me-2">Choisir ses choix pour la PFP</button>
      <button @click="retourAccueil" class="btn btn-secondary">Retour à l'accueil</button>
    </div>
  </div>
</template>


<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, set } from "firebase/database";


export default {
  name: 'VotationLese',
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
        this.fetchUserChoices();

      } else {
        this.user = null;
      }
    });

  },

  methods: {
    fetchUserChoices() {
      if (!this.user) {
        return;
      }

      const db = getDatabase();
      const userId = this.user.uid;
      const userChoicesRef = ref(db, `/choicePFP4/${userId}/choix`);

      get(userChoicesRef).then((snapshot) => {
        if (snapshot.exists()) {
          const userChoices = snapshot.val();
          const choicesLog = [];

          // Construct the log string for each choice
          Object.entries(userChoices).forEach(([choiceNumber, choiceValue]) => {
            choicesLog.push(`Choice ${choiceNumber}: ${choiceValue}`);
          });

          // Log the constructed choices string
          console.log(`The choices are: ${choicesLog.join(', ')};`);
          console.log(choicesLog)

        } else {
          console.log("There are no choices.");
        }
      }).catch((error) => {
        console.error("Error fetching user choices:", error);
      });
    },

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
      const choixRef = ref(db, '/choicePFP4'); // Path to the students' choices
      get(choixRef).then((snapshot) => {
        if (snapshot.exists()) {
          const choixTousEtudiants = snapshot.val();
          let totalChoixParStage = {}; // To count the choices for each stage

          // Iterate through each student's choices
          Object.values(choixTousEtudiants).forEach(choixEtudiant => {
            Object.values(choixEtudiant.choix).forEach(idStage => {
              if (totalChoixParStage[idStage]) {
                totalChoixParStage[idStage]++;
              } else {
                totalChoixParStage[idStage] = 1;
              }
            });
          });
          // Update the totals in the component's data
          this.totalChoixParStage = totalChoixParStage;

          // Logging the totals for each stage
          Object.keys(totalChoixParStage).forEach(idStage => {
            console.log(`Total ${idStage}: ${totalChoixParStage[idStage]}`);
          });

        } else {
          console.log("No choices found.");
        }
      }).catch((error) => {
        console.error("Error retrieving choices", error);
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
        // Vérifie d'abord si "FR" ou "ALL" est à zéro
        if (this.studentData.FR === "0") {
          criteres.push("FR");
          return criteres; // Retourne immédiatement "FR" comme le seul critère obligatoire
        } else if (this.studentData.ALL === "0") {
          criteres.push("ALL");
          return criteres; // Retourne immédiatement "ALL" comme le seul critère obligatoire
        }

        // Si ni "FR" ni "ALL" ne sont à zéro, continue avec la logique existante
        Object.entries(this.studentData).forEach(([key, value]) => {
          if (value === "0") { // Si la valeur est "0", c'est un critère obligatoire
            criteres.push(key); // Ajoute la clé à la liste des critères
            hasZeroValue = true; // Met le flag à vrai
          }
        });

        // Si aucun critère n'est égal à "0", ajoute tous les critères comme obligatoires
        if (!hasZeroValue) {
          Object.keys(this.studentData).forEach(key => {
            criteres.push(key); // Ajoute toutes les clés de critères à la liste
          });
        }
      }
      return criteres; // Retourne la liste des critères obligatoires
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
      this.calculerTotalChoix();

    },
  }
}
</script>

<style scoped>

body {
  background-color: #f4f4f8;
  color: #333;
  font-family: 'Segoe UI', Arial, sans-serif;
}

.container {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-top: 20px;
}

/* Amélioration de la visibilité tout en conservant un design sobre */
.bg-danger, .bg-secondary {
  background-color: #fff !important; /* Garde le fond blanc pour une approche minimaliste */
}

.bg-danger {
  border-left: 4px solid #ffcccc; /* Indique subtilement un problème sans surcharger visuellement */
}

.bg-secondary {
  /* Suggestion: plutôt que de cacher, utiliser une couleur légère pour indiquer une différence */
  background-color: #fafafa !important;
}

/* Icônes de vérification plus subtiles */
.check-icon {
  color: #4CAF50; /* Vert plus doux */
}

.non-check-icon {
  color: #f44336; /* Rouge plus doux */
}

/* Styles pour les titres, textes, et boutons pour plus de sobriété */
h1 {
  color: #333;
  margin-bottom: 16px;
  font-size: 24px;
}

p {
  line-height: 1.6;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #0056b3;
}

/* Utilisation de médias queries pour la responsivité */
@media (max-width: 768px) {
  .container {
    padding: 10px;
  }

  h1 {
    font-size: 20px;
  }

  button {
    padding: 8px 10px;
    font-size: 14px;
  }
}
</style>