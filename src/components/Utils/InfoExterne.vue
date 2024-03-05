<template>
  <section>

      <h1>Document pour institution externe</h1>
      <br> <br>
      <h3>Entrez le code pour accéder aux documents:</h3>
      <input type="text" v-model="codeSecret" placeholder="Entrez le code ici">
      <button @click="validerCode">Valider</button>
      <br> <br>
      <div v-if="afficherDocuments">
        <h3>Liste des Documents</h3>
        <div v-for="categorie in categories" :key="categorie.titre">
          <h3>{{ categorie.titre }}</h3>
          <ul>
            <li v-for="doc in categorie.documents" :key="doc">
              <a :href="doc.chemin" target="_blank">{{ doc.nom }}</a>
            </li>
          </ul>
        </div>
      </div>

  </section>
</template>
