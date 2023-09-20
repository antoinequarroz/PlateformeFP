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
                <router-link :to="{ name: 'InstitutionForm' }" class="btn btn-sm btn-primary-soft m-1">Ajouter un institution</router-link>
                <button class="btn btn-sm btn-secondary m-1">Retour</button>
              </div>
            </div>
            <div class="table-responsive mt-3">
              <table class="table table-dark-gray align-middle p-4 mb-0 table-hover w-100 text-center">
                <thead>
                <tr>
                  <th scope="col" class="border-0 rounded-start">Image</th>
                  <th scope="col" class="border-0">ID</th>
                  <th scope="col" class="border-0">Nom de l'institution</th>
                  <th scope="col" class="border-0">Salle</th>
                  <th scope="col" class="border-0">Nombres</th>
                  <th scope="col" class="border-0">Catégorie</th>
                  <th scope="col" class="border-0">Slug</th>
                  <th scope="col" class="border-0 rounded-end">Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="material in materials" :key="material.matId">
                  <td>
                    <img :src="randomImageUrl" alt="Image aléatoire" />
                  </td>
                  <td>
                    <h6 class="table-responsive-title mb-0 ms-2">{{ material.matId }}</h6>
                  </td>
                  <td>
                    <h6 class="table-responsive-title mb-0 ms-2">{{ material.matTitre }}</h6>
                  </td>
                  <td>
                    <h6 class="table-responsive-title mb-0 ms-2">{{ material.salId }}</h6>
                  </td>
                  <td>
                    <h6 class="table-responsive-title mb-0 ms-2">{{ material.matNombre }}</h6>
                  </td>
                  <td>
                    <h6 class="table-responsive-title mb-0 ms-2">{{ getCategoryName(material.matCategorie) }}</h6>
                  </td>
                  <td>
                    <h6 class="table-responsive-title mb-0 ms-2">{{ material.matSlug }}</h6>
                  </td>
                  <td>
                    <router-link :to="`/material/${material.matSlug}`" class="btn btn-sm btn-warning-soft me-1 mb-1 mb-md-0">Détails</router-link>
                    <button class="btn btn-sm btn-success-soft me-1 mb-1 mb-md-0" @click="editMaterial(material.matSlug)">Modifier</button>
                    <button class="btn btn-sm btn-danger-soft me-1 mb-1 mb-md-0" @click="deleteMaterial(material.matSlug)">Supprimer</button>
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

export default {
  name: "InstitutionList",
  data() {
    return {

    }
  },

  methods: {

  }
};
</script>

<style scoped>


</style>


