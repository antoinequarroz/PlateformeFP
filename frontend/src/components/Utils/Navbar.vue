<template>
  <header class="navbar-light navbar-sticky header-static">
    <nav class="navbar navbar-expand-xl">
      <div class="container-fluid px-3 px-xl-5">
        <a class="navbar-brand" :href="homePath">
          <img class="light-mode-item navbar-brand-item" :src="logoPath" alt="logo">
        </a>
        <button class="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-animation">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        <nav class="navbar navbar-expand-lg">
          <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <a class="nav-link active" :href="homePath">Accueil</a>
                <a class="nav-link active" :href="mapPath">Map</a>
                <a class="nav-link active" :href="institutionPath">Institution</a>
                <a class="nav-link active" :href="placePath">Place de stage</a>
                <a class="nav-link active" :href="faqPath">FAQ's</a>
                <a class="nav-link active" :href="adminPath">Admin</a>
              </div>
            </div>
            <div class="navbar-nav ms-auto">
              <template v-if="!user">
                <a class="nav-link active" :href="signInPath">Se connecter</a>
                <a class="nav-link active" :href="signUpPath">S'inscrire</a>
              </template>
              <template v-else>
                <a class="nav-link active" :href="profilePath">Profil</a>

              </template>
            </div>

            <!-- Nav Search START -->

            <!-- Nav Search END -->
            <template v-if="user">

              <!-- Profile START -->
              <div class="dropdown ms-1 ms-lg-0">
                <a class="avatar avatar-sm p-0" href="#" id="profileDropdown" role="button" data-bs-auto-close="outside"
                  data-bs-display="static" data-bs-toggle="dropdown" aria-expanded="false">
                  <img class="avatar-img rounded-circle" src="src/assets/images/avatar/avatar99.png" alt="avatar">
                </a>
                <ul class="dropdown-menu dropdown-animation dropdown-menu-end shadow pt-3"
                  aria-labelledby="profileDropdown">
                  <!-- Profile info -->
                  <li class="px-3 mb-3">
                    <div class="d-flex align-items-center">
                      <!-- Avatar -->
                      <div class="avatar me-3">
                        <img class="avatar-img rounded-circle shadow" src="src/assets/images/avatar/avatar99.png"
                          alt="avatar">
                      </div>
                      <div>
                        <a class="h6" href="#">Antoine Quarroz</a>
                        <p class="small m-0">antoine.quarroz@hes-so.ch</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <hr class="dropdown-divider">
                  </li>
                  <!-- Links -->
                  <li><a class="dropdown-item" :href="profilePath"><i class="bi bi-person fa-fw me-2"></i>Éditer le
                      profil</a></li>
                  <li>
                    <a class="dropdown-item bg-danger-soft-hover" href="#" @click.prevent="logout">
                      <i class="bi bi-power fa-fw me-2"></i>Sign Out
                    </a>
                  </li>

                </ul>
              </div>
            </template>

            <!-- Profile SddfffdTART -->
          </div>
        </nav>
      </div>
    </nav>
  </header>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default {
  name: "Navbar",
  data() {
    return {
      user: null,  // Ajoutez cette ligne pour définir la propriété user
      logoPath: './src/assets/images/FR-DE_HEdS.png',
      homePath: '/',
      mapPath: '/map',
      institutionPath: '/institution',
      placePath: '/place',
      profilePath: '/profile',
      faqPath: '/faq',
      adminPath: '/admin',
      profilePath: '/profile',
      signInPath: '/sign_in',
      signUpPath: '/sign_up',
    };
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.user = user;
    });
  },
  methods: {
    async logout() {
      const auth = getAuth();
      try {
        await signOut(auth);
      } catch (error) {
        console.error('Erreur de déconnexion:', error);
      }
    }
  }
}
</script>

<style scoped>
/* Ajoutez vos styles CSS ici si nécessaire */
</style>
