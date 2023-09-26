<template>
  <div class="container mt-5">
    <h1 class="mb-4">Nouvel étudiant</h1>
    <form @submit.prevent="addStudent">
      <div class="mb-3">
        <label for="prenom" class="form-label">Prénom</label>
        <input type="text" class="form-control" id="prenom" v-model="prenom" required>
      </div>
      <div class="mb-3">
        <label for="nom" class="form-label">Nom</label>
        <input type="text" class="form-control" id="nom" v-model="nom" required>
      </div>
      <div class="mb-3">
        <label for="classe" class="form-label">Classe</label>
        <input type="text" class="form-control" id="classe" v-model="classe" required>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email" v-model="email" required>
      </div>
      <button type="submit" class="btn btn-primary">Ajouter</button>
    </form>
  </div>
</template>

<script>
import { db } from '../../../../firebase.js'; 
import { getDatabase, ref, get, set } from "firebase/database";

export default {
  name: 'EtudiantForm',
  data() {
    return {
      prenom: '',
      nom: '',
      classe: '',
      email: ''
    };
  },
  methods: {
    async updateStudents() {
      try {
        const etudiantsRef = ref(db, 'etudiants');
        
        // Récupérez tous les étudiants
        const snapshot = await get(etudiantsRef);
        const etudiants = snapshot.val();
        
        // Parcourez chaque étudiant et mettez à jour avec les nouveaux champs
        for (const etudiantId in etudiants) {
          if (Object.hasOwnProperty.call(etudiants, etudiantId)) {
            const etudiantRef = ref(db, `etudiants/${etudiantId}`);
            await set(etudiantRef, {
              ...etudiants[etudiantId], // Conservez les données existantes
              SAE: false, // Ajoutez le nouveau champ SAE
              responsableDeStage: 'nomenseignant' // Ajoutez le nouveau champ responsableDeStage
            });
          }
        }
        
        
        console.log('Mise à jour réussie.');
      } catch (error) {
        console.error('Erreur lors de la mise à jour:', error);
      }
    },

  async addStudent() {
    try {
      const studentsRef = ref(db, 'etudiants/');
      
      // Récupérer les données une seule fois avec 'get' au lieu de 'onValue'
      const snapshot = await get(studentsRef);
      const studentsData = snapshot.val();
      
      // Obtenir le nombre d'étudiants existants
      const studentCount = studentsData ? Object.keys(studentsData).length : 0;
      
      // Créer un ID unique basé sur le nombre d'étudiants existants
      const newStudentId = 'student' + (studentCount + 1);
      
      // Créer une nouvelle référence avec le nouvel ID et y ajouter les données de l’étudiant
      const newStudentRef = ref(db, 'etudiants/'+newStudentId);
      await set(newStudentRef, {
        Prenom: this.prenom,
        Nom: this.nom,
        Classe: this.classe,
        Email: this.email
      });
      
      // Réinitialiser les champs du formulaire
      this.prenom = '';
      this.nom = '';
      this.classe = '';
      this.email = '';
      
      // Rediriger vers la liste des étudiants
      this.$router.push({ name: 'EtudiantList' });
    } catch (error) {
      console.error('Erreur d’ajout de l’étudiant', error);
    }
  }
},
mounted() {
    // Vous pouvez déclencher la mise à jour ici, mais cela se produira chaque fois que le composant est monté
     this.updateStudents();
  }
};
</script>

<style scoped>
/* Les styles ont été conservés car ils ne sont pas directement liés à la logique ou au matériel */
.form-control {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
