<template>
  <div>
    <div class="fleet-manager">
      <div class="list">
        <ul>
          <div>
            <label>
              <input
                type="radio"
                value="active"
                v-model="filter"
                @change="fetchData"
              />
              Active
            </label>
            <label>
              <input
                type="radio"
                value="all"
                v-model="filter"
                @change="fetchData"
              />
              All
            </label>
          </div>
          <li
            v-for="machine in machines"
            :key="machine.id"
            @click="selectMachine(machine)"
            :class="{
              selected: selectedMachine && selectedMachine.id === machine.id,
            }"
          >
            {{ machine.active ? "🟢" : "🔴" }}
            {{ machine.make }} ({{ machine.type }})
          </li>
        </ul>
      </div>
      <div class="details">
        <div v-if="selectedMachine">
          <h3>Machine Details</h3>
          <p><strong>ID:</strong> {{ selectedMachine.id }}</p>
          <p><strong>Type:</strong> {{ selectedMachine.type }}</p>
          <p><strong>Make:</strong> {{ selectedMachine.make }}</p>
          <p>
            <strong>Location:</strong> N {{ selectedMachine.location.N }}, E
            {{ selectedMachine.location.E }}, H {{ selectedMachine.location.H }}
          </p>
          <p>
            <strong>Status:</strong>
            {{ selectedMachine.active ? "Active" : "Inactive" }}
          </p>
        </div>
        <h3 v-else>No selection</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      machines: [],
      filter: "active",
      selectedMachine: null,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      fetch(`http://localhost:3000/api/data?filter=${this.filter}`)
        .then((response) => response.json())
        .then((data) => {
          this.machines = data.machines;
          this.selectedMachine = null;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    selectMachine(machine) {
      if (this.selectedMachine && this.selectedMachine.id === machine.id) {
        this.selectedMachine = null;
      } else {
        this.selectedMachine = machine;
      }
    },
  },
};
</script>

<style scoped>
h1 {
  color: #42b983;
}
.fleet-manager {
  display: flex;
}
.list,
.details {
  margin: 20px;
}
.list ul {
  list-style-type: none;
  padding: 0;
}
.list li {
  margin: 10px 0;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
}
.list li:hover {
  background-color: #f0f0f0;
}
.list li.selected {
  background-color: #d3d3d3;
  color: #000;
}
.details {
  padding: 10px;
  width: 300px;
}
</style>
