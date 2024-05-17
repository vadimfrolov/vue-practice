<template>
  <div>
    <h1>{{ message }}</h1>
    <h2>hi</h2>
  </div>
  <div class="fleet-manager">
    <div class="list">here goes list of machines</div>
    <div class="details">here goes the details of a selected machine</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
    };
  },
  mounted() {
    fetch("http://localhost:3000/api/data")
      .then((response) => response.json())
      .then((data) => {
        this.message = data.message;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
