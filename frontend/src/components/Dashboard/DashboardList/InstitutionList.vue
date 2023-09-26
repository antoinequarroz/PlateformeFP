<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <h1 class="h3 mb-2">Liste des institutions</h1>
              <p class="mb-2">Il y a 12 institutions d'enregistrés dans la base de données</p>
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
                    <td>
                      <h6 class="table-responsive-title mb-0 ms-2">{{ institution.Name }}</h6>
                    </td>

                    <td>
                      <h6 class="table-responsive-title mb-0 ms-2">{{ institution.Street }}</h6>
                    </td>
                    <td>
                      <h6 class="table-responsive-title mb-0 ms-2">{{ institution.Lieu }}</h6>
                    </td>
                    <td>
                      <h6 class="table-responsive-title mb-0 ms-2">{{ institution.Canton }}</h6>
                    </td>
                    <td>
                      <h6 class="table-responsive-title mb-0 ms-2">{{ institution.URL }}</h6>
                    </td>
                    <!-- ... Autres cellules ... -->
                    <td>

                      <button class="btn btn-sm btn-success-soft me-1 mb-1 mb-md-0"
                        @click="goToDetails(institution.id)">Détails</button>
                      <button class="btn btn-sm btn-danger-soft me-1 mb-1 mb-md-0">Supprimer</button>
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
import { ref, onValue } from "firebase/database";
export default {
  name: "InstitutionList",
  data() {
    return {
      institutions: [] // pour stocker vos données depuis Firebase

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


    goToInstitutionForm() {
      this.$router.push({ name: 'InstitutionForm' });
    },
    goToAdminDashboard() {
      this.$router.push({ name: 'AdminDashboard' });
    },
    goToDetails(instSlug) {
  this.$router.push({ name: 'institution-details', params: { instSlug } });
},


  }
};
</script>

<style scoped></style>


