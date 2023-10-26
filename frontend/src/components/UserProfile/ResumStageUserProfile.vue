<template>
  <section class="pt-0">
    <div class="container">
      <div class="row">
        <div class="col-xl-12">
          <div class="card border bg-transparent rounded-3">
            <div class="card-header bg-transparent border-bottom">
              <h3 class="mb-0">Mes stages</h3>
            </div>
            <div class="card-body">
              <div class="row g-3 align-items-center justify-content-between mb-4">
                <div class="col-md-8">
                  <form class="rounded position-relative">
                    <input class="form-control pe-5 bg-transparent" type="search" placeholder="Recherche" aria-label="Recherche">
                    <button class="bg-transparent p-2 position-absolute top-50 end-0 translate-middle-y border-0 text-primary-hover text-reset" type="submit">
                      <i class="fas fa-search fs-6 "></i>
                    </button>
                  </form>
                </div>
              </div>
              <div class="table-responsive border-0">
                <table class="table table-dark-gray align-middle p-4 mb-0 table-hover">
                  <thead>
                  <tr>
                    <th scope="col" class="border-0 rounded-start">Institution</th>
                    <th scope="col" class="border-0">PFP</th>
                    <th scope="col" class="border-0">Date</th>
                    <th scope="col" class="border-0">PF</th>
                    <th scope="col" class="border-0 rounded-end">Validation</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="order in orders" :key="order.id">
                    <td>
                      <h6 class="table-responsive-title mt-2 mt-lg-0 mb-0">
                        <a :href="order.courseLink">{{ order.courseName }}</a>
                      </h6>
                    </td>
                    <td class="text-center text-sm-start text-primary-hover">
                      <a :href="order.orderLink" class="text-body"><u>{{ order.orderID }}</u></a>
                    </td>
                    <td>{{ order.date }}</td>
                    <td>${{ order.amount }}</td>
                    <td>{{ order.paymentMethod }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'ResumStageUserProfile',
  data() {
    return {
      orders: []
    };
  },
  async mounted() {
    const ordersRef = db.collection('orders'); // Remplacez 'orders' par le nom de votre collection
    const snapshot = await ordersRef.get();
    this.orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}
</script>

<style scoped>
/* Vos styles spécifiques au composant ici */
</style>



