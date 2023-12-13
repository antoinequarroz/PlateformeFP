<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <h1 class="h3 mb-2">Liste des institutions</h1>
              <p class="mb-2">Il y a {{ institutions.length }} institutions d'enregistrés dans la base de données</p>
              <div>
                <button class="btn btn-sm btn-primary m-1" @click="goToInstitutionForm">Ajouter une institution</button>
                <button class="btn btn-sm btn-secondary m-1" @click="goToAdminDashboard">Retour</button>
              </div>
            </div>
            <div class="table-responsive mt-3">
              <table class="table table-dark-gray align-middle p-4 mb-0 table-hover w-100 text-center">
                <thead>
                <tr>
                  <th scope="col" class="border-0 rounded-start">Nom de l'institution</th>
                  <th scope="col" class="border-0">Rue</th>
                  <th scope="col" class="border-0">Lieu</th>
                  <th scope="col" class="border-0">Canton</th>
                  <th scope="col" class="border-0">URL</th>
                  <th scope="col" class="border-0 rounded-end">Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="institution in institutions" :key="institution.id">
                  <td>{{ institution.Name }}</td>
                  <td>{{ institution.Street }}</td>
                  <td>{{ institution.Lieu }}</td>
                  <td>{{ institution.Canton }}</td>
                  <td>{{ institution.URL }}</td>
                  <td>
                    <button class="btn btn-sm btn-primary-soft me-1 mb-1 mb-md-0" @click="goToDetails(institution.id)">Détails</button>
                    <button class="btn btn-sm btn-success-soft me-1 mb-1 mb-md-0" @click="goToInstitutionFormModif(institution.id)">Modifier</button>
                    <button class="btn btn-sm btn-danger-soft me-1 mb-1 mb-md-0" @click="supprimerInstitution(institution.id)">Supprimer</button>



                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../../../../firebase.js';
import { ref, onValue, remove } from "firebase/database";

export default {
  name: "InstitutionList",
  data() {
    return {
      institutions: []
    }
  },
  mounted() {
    const institutionsRef = ref(db, 'institutions/');
    onValue(institutionsRef, (snapshot) => {
      const data = snapshot.val();
      this.institutions = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
    });
  },
  methods: {
    supprimerInstitution(institutionId) {
      if (!institutionId) {
        alert("ID de l'institution est manquant ou incorrect.");
        return;
      }

      // Confirmer avec l'utilisateur avant la suppression
      if (window.confirm("Êtes-vous sûr de vouloir supprimer cette institution ?")) {
        const instRef = ref(db, 'institutions/' + institutionId);
        remove(instRef)
            .then(() => {
              alert("L'institution a été supprimée avec succès.");
              // Recharger la liste des institutions après la suppression
              this.fetchInstitutions();
            })
            .catch((error) => {
              console.error("Erreur lors de la suppression de l'institution:", error);
              alert("Une erreur est survenue lors de la suppression de l'institution.");
            });
      }
    },
    goToInstitutionForm(id) {
      this.$router.push({ name: 'InstitutionForm', params: { id } });
    },
    goToInstitutionFormModif(id) {
      this.$router.push({ name: 'InstitutionFormModif', params: { id } });
    },
    goToAdminDashboard() {
      this.$router.push({ name: 'AdminDashboard' });
    },
    goToDetails(id) {
      if (id) {
        this.$router.push({ name: 'InstitutionDetail', params: { id: id } });
      } else {
        console.error("ID is undefined for this institution.");
      }
    }
  }
};
</script>

<style scoped>
/* Si vous avez des styles spécifiques pour ce composant, ajoutez-les ici. */
</style>
