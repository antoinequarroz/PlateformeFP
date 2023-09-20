<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <h1 class="h3 mb-2">Liste des étudiants</h1>
              <p class="mb-2">Il y a 12 étudiants d'enregistrés dans la base de données</p>
              <div>
                <button class="btn btn-sm btn-primary m-1">Ajouter un.e étudiants</button>
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
                <tr>
                  <td>
                    <img :src="randomImageUrl" alt="Image aléatoire" />
                  </td>
                  <td>
                    <h6 class="table-responsive-title mb-0 ms-2">test</h6>
                  </td>
                  <td>
                    <h6 class="table-responsive-title mb-0 ms-2">test</h6>
                  </td>
                  <td>
                    <h6 class="table-responsive-title mb-0 ms-2">test</h6>
                  </td>
                  <td>
                    <h6 class="table-responsive-title mb-0 ms-2">test</h6>
                  </td>
                  <td>
                    <h6 class="table-responsive-title mb-0 ms-2">test</h6>
                  </td>
                  <td>
                    <h6 class="table-responsive-title mb-0 ms-2">test</h6>
                  </td>
                  <td>
                    <button class="btn btn-sm btn-success-soft me-1 mb-1 mb-md-0">Détails</button>
                    <button class="btn btn-sm btn-success-soft me-1 mb-1 mb-md-0">Modifier</button>
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

export default {
  name: "EtudiantList",
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


