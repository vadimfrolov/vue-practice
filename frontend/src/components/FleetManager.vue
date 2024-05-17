<template>
  <div>
    <h1>{{ message }}</h1>
    <div>
      <label>
        <input type="radio" value="active" v-model="filter" @change="fetchData" /> Active
      </label>
      <label>
        <input type="radio" value="all" v-model="filter" @change="fetchData" /> All
      </label>
    </div>
    <div class="fleet-manager">
      <div class="list">
        <ul>
          <li v-for="machine in machines" :key="machine.id">
            {{ machine.make }} ({{ machine.type }}) - {{ machine.active ? '🟢' : '🔴' }}
          </li>
        </ul>
      </div>
      <div class="details">here goes the details of a selected machine</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      machines: [],
      filter: 'active', // Default filter
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      fetch(`http://localhost:3000/api/data?filter=${this.filter}`)
        .then(response => response.json())
        .then(data => {
          this.message = data.message;
          this.machines = data.machines;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
  },
};
</script>

<style scoped>
h1 {
  color: #42b983;
}
.list,
.details {
  display: inline-block;
  margin: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}
</style>
