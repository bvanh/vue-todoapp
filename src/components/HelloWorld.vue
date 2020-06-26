<template>
  <a-row class="hello" type="flex" justify="center">
    <a-col :span="12">
      <a-input
        placeholder="Basic usage"
        :value="newDescription"
        @input="addDescription($event.target.value)"
        @keyup.enter="finishAddTodo()"
      />
      <div v-for="(item, index) in getList" :key="index" class="demo">
        <span v-if="isEditing !== index">{{ item.description }}</span>
        <input
          v-if="isEditing === index"
          :value="item.description"
          @input="editTodo({ description: $event.target.value, index: index })"
          v-on:blur="finishEdit()"
        />
        <div>
          <a-icon type="edit" @click="onEdit(index)" />
          <a-icon type="backward" @click="deleteTodo(item)" />
        </div>
      </div>
    </a-col>
  </a-row>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
// import { ADD_TODO } from "../store/mutation-types";
export default {
  name: "HelloWorld",
  data() {
    return {
      isEditing: null,
      newDescription: ""
    };
  },
  methods: {
    onEdit(index) {
      return (this.isEditing = index);
    },
    finishEdit() {
      return (this.isEditing = null);
    },
    addDescription(value) {
      this.newDescription = value;
    },
    finishAddTodo() {
      this.addTodo(this.newDescription);
      this.newDescription = "";
    },
    ...mapActions(["addTodo", "deleteTodo", "editTodo"])
  },
  computed: {
    ...mapState(["todoList"]),
    ...mapGetters(["listCompleted", "listNotCompleted"]),
    getList() {
      let path = this.$route.path;
      switch (path) {
        case "/progress":
          return this.listNotCompleted;
        case "/completed":
          return this.listCompleted;
        default:
          return this.todoList;
      }
    }
  },
  created() {
    console.log(this.listCompleted, this.listNotCompleted);
    console.log(this.$route.path);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
.demo {
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
  div > i {
    padding: 0 5px;
  }
}
</style>
