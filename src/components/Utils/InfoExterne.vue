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
          { nom: 'Contrat pédagogique tripartite', chemin: '/src/assets/external_file/Contrat pédagogique tripartite_vide.docx' },
          { nom: 'Pädagogicher dreiparteivertrag ', chemin: '/src/assets/external_file/Pädagogicher_dreiparteivertrag_leer.docx' },
            // Ajoutez d'autres documents ici
          ],
          
        },
        {
          titre: 'Document d évaluation -Evaluationsdokument',
          documents: [
          { nom: 'Evaluation DE FP 1A', chemin: '/src/assets/external_file/Evaluation DE FP 1A vf 1.xlsx' },
          { nom: 'Evaluation DE FP 2A ', chemin: '/src/assets/external_file/Evaluation DE FP 2A vf 1.xlsx' },
          { nom: 'Evaluation FR FP 1A ', chemin: '/src/assets/external_file/Evaluation FR FP 1A vf.xlsx' },
          { nom: 'Evaluation FR FP 2A', chemin: '/src/assets/external_file/Evaluation FR FP 2A vf.xlsx' },

            // Ajoutez d'autres documents ici
          ],
          
        },

        {
          titre: 'Plan d étude cadre - Rahmenstudienplan',
          documents: [
          { nom: 'PEC_2022_Physiothérapie_BSC_DE', chemin: '/src/assets/external_file/PEC_2022_Physiothérapie_BSC_DE 1.pdf' },
          { nom: 'PEC_2022_Physiothérapie_BSC_FR', chemin: '/src/assets/external_file/PEC_2022_Physiothérapie_BSC_FR 1.pdf' },

            // Ajoutez d'autres documents ici
          ],
          
        },

        {
          titre: 'Cadre de réalisation - Rahmenbedingungen',
          documents: [
          { nom: 'Cadre de réalisation', chemin: '/src/assets/external_file/07.03.20231_Cadre de réalisation FP.pdf' },
          { nom: 'Rahmenbedingungen_Praxisausbildung', chemin: '/src/assets/external_file/07.03.2023_Rahmenbedingungen_Praxisausbildung- PEC 22.pdf' },

            // Ajoutez d'autres documents ici
          ],
          
        },

        {
          titre: 'Référentiel de compétence - Kompetenzrahmen',
          documents: [
          { nom: 'Kompetenzrahmen PHY_D_PEC22 ', chemin: '/src/assets/external_file/Kompetenzrahmen PHY_D_PEC22.pdf' },
          { nom: 'Référentiel de compétence PHY_F_PEC22', chemin: '/src/assets/external_file/Référentiel de compétence PHY_F_PEC22.pdf' },

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
      if(this.codeSecret == "123123") {
        this.afficherDocuments = true;
      } else {
        this.afficherDocuments = false;
        alert("Code incorrect. Veuillez réessayer.");
      }
    }
  },
}
</script>


  <style scoped>
  </style>
