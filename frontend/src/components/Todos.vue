<template>
  <div>
    <div>
      <h2>Add To List</h2>

      <div>
        <input type="text"
          placeholder="Title"
          v-model="title"
        >
        <button @click="addTodo">Submit</button>
      </div>
    </div>

    <br/>
    <br/>

    <div>
      <h2>To Do's</h2>

      <ul class="todo-list">
        <li v-for="todo in todos" :key="todo.id">
          <h3>
            <router-link v-bind:to="{ name: 'EditTodo', params: { todoId: todo.id } }">{{ todo.title }}</router-link>
          </h3>
          <button @click="deleteTodo(todo.id)">Delete</button>
          <ul class="item-list" v-if="!!todo.todoItems">
            <li v-for="item in todo.todoItems" :key="item.id">
              {{ item.content }}
            </li>
          </ul>

        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import TodoService from '@/http/TodoService'

export default {
  name: 'Todos',
  data () {
    return {
      todos: [],
      title: ''
    }
  },
  mounted () {
    this.fetchTodos()
  },
  methods: {
    async fetchTodos () {
      const res = await TodoService.listTodos()
      this.todos = res.data
    },

    async addTodo () {
      const todo = await TodoService.addTodo({
        title: this.title
      })
      this.todos.push(todo.data)
    },

    async deleteTodo (id) {
      await TodoService.deleteTodo(id)
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

ul { list-style: none; }

</style>
