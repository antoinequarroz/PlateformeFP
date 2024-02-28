<template>
  <section>
    <center>
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
    </center>
  </section>
</template>


<script>
export default {
  name: 'InfoExterne',
  data() {
    return {
      codeSecret: '',
      afficherDocuments: false,
      categories: [
        {
          titre: 'Contrat pédagogique tripartite - Pädagogischer Dreiervertra',
          documents: [
            { nom: 'Contrat pédagogique tripartite', chemin: 'https://firebasestorage.googleapis.com/v0/b/fpformationheds.appspot.com/o/07.03.20231_Cadre%20de%20r%C3%A9alisation%20FP.pdf?alt=media&token=ca908286-f213-4323-8274-ac0a4351bf8b' },
            { nom: 'Pädagogicher dreiparteivertrag ', chemin: 'https://firebasestorage.googleapis.com/v0/b/fpformationheds.appspot.com/o/P%C3%A4dagogicher_dreiparteivertrag_leer.docx?alt=media&token=58921dda-fb5d-4bb5-8c09-7d800989f234' },
            // Ajoutez d'autres documents ici
          ],

        },
        {
          titre: 'Document d évaluation -Evaluationsdokument',
          documents: [
            { nom: 'Evaluation DE FP 1A', chemin: 'https://firebasestorage.googleapis.com/v0/b/fpformationheds.appspot.com/o/Evaluation%20DE%20FP%201A%20vf%201.xlsx?alt=media&token=e9062533-6d35-4a6f-b5d1-2c6e9356d986' },
            { nom: 'Evaluation DE FP 2A ', chemin: 'https://firebasestorage.googleapis.com/v0/b/fpformationheds.appspot.com/o/Evaluation%20DE%20FP%202A%20vf%201.xlsx?alt=media&token=010da007-ce5e-4601-b8a6-8448d83b7dc6' },
            { nom: 'Evaluation FR FP 1A ', chemin: 'https://firebasestorage.googleapis.com/v0/b/fpformationheds.appspot.com/o/Evaluation%20FR%20FP%201A%20vf.xlsx?alt=media&token=2f59d16f-cbe1-41ee-9040-bacbf3a7397a' },
            { nom: 'Evaluation FR FP 2A', chemin: 'https://firebasestorage.googleapis.com/v0/b/fpformationheds.appspot.com/o/Evaluation%20FR%20FP%202A%20vf.xlsx?alt=media&token=6ab89155-eb75-4573-aa00-4fd9bb367540' },

            // Ajoutez d'autres documents ici
          ],

        },

        {
          titre: 'Plan d étude cadre - Rahmenstudienplan',
          documents: [
            { nom: 'Kompetenzrahmen PHY_D_PEC22', chemin: 'https://firebasestorage.googleapis.com/v0/b/fpformationheds.appspot.com/o/R%C3%A9f%C3%A9rentiel%20de%20comp%C3%A9tence%20PHY_F_PEC22.pdf?alt=media&token=cdd29f35-b8d9-459b-8804-d780c07c8bcb' },
            { nom: 'Référentiel de compétence PHY_F_PEC22', chemin: 'https://firebasestorage.googleapis.com/v0/b/fpformationheds.appspot.com/o/Kompetenzrahmen%20PHY_D_PEC22.pdf?alt=media&token=ad926583-3e9b-4a5e-8fcf-089ded49c34e' },

            // Ajoutez d'autres documents ici
          ],

        },

        {
          titre: 'Cadre de réalisation - Rahmenbedingungen',
          documents: [
            { nom: 'Cadre de réalisation', chemin: 'https://firebasestorage.googleapis.com/v0/b/fpformationheds.appspot.com/o/07.03.20231_Cadre%20de%20r%C3%A9alisation%20FP.pdf?alt=media&token=ca908286-f213-4323-8274-ac0a4351bf8b' },
            { nom: 'Rahmenbedingungen_Praxisausbildung', chemin: 'https://firebasestorage.googleapis.com/v0/b/fpformationheds.appspot.com/o/07.03.2023_Rahmenbedingungen_Praxisausbildung-%20PEC%2022.pdf?alt=media&token=e75ebcb4-12ab-447c-afcf-9683a2c1e182' },

            // Ajoutez d'autres documents ici
          ],

        },

        {
          titre: 'Référentiel de compétence - Kompetenzrahmen',
          documents: [
            { nom: 'PEC_2022_Physiothérapie_BSC_DE ', chemin: 'https://firebasestorage.googleapis.com/v0/b/fpformationheds.appspot.com/o/PEC_2022_Physioth%C3%A9rapie_BSC_DE%201.pdf?alt=media&token=3806a5b4-1212-46fa-997b-0a005a1afec3' },
            { nom: 'PEC_2022_Physiothérapie_BSC_FR ', chemin: 'https://firebasestorage.googleapis.com/v0/b/fpformationheds.appspot.com/o/PEC_2022_Physioth%C3%A9rapie_BSC_FR%201.pdf?alt=media&token=30b5e5f9-9421-4d69-9b9e-42982a69a4d9' },

            // Ajoutez d'autres documents ici
          ],

        },

        {
          titre: 'Documents divers - Verschiedene Dokumente',
          documents: [

            // Ajoutez d'autres documents ici
          ],

        },
        // Ajoutez d'autres catégories ici
      ],
    }
  },
  methods: {
    validerCode() {
      if (this.codeSecret == "123123") {
        this.afficherDocuments = true;
      } else {
        this.afficherDocuments = false;
        alert("Code incorrect. Veuillez réessayer.");
      }
    }
  },
}
</script>


<style scoped></style>
