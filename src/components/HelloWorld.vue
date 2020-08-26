<template>
  <div>
    <input type="file" ref="file" @change="onSelect" />
    <button @click.prevent="submit">Upload</button>
    <ul v-for="item in items" :key="item._id">
      <li><img :src="item.file" alt="" width="500px" /></li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      file: "",
      items: [],
    };
  },

  methods: {
    onSelect(e) {
      const selectedFile = e.target.files[0]; // accessing file
      this.selectedFile = selectedFile;
    },
    submit() {
      const formData = new FormData();
      formData.append("upload", this.selectedFile); // appending file
      console.log(this.formData);

      // sending file to the backend
      axios
        .post("http://localhost:3000/api/upload", formData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getAllPost() {
      let apiUrl = "http://localhost:3000/api";
      axios
        .get(apiUrl)
        .then((res) => {
          // this.items = res.data;
          console.log(res);
          // res.data.map(res => {
          //   return res
          // })
          this.items = res.data.map((v) => ({
            ...v,
            file: `http://localhost:3000/${v.file}`,
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  mounted() {
    this.getAllPost();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
