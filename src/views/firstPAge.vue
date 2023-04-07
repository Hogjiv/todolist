<script>
export default {
  data() {
    return {
      addNoteText: '',
      editNote: {},
      editMode: {},
      todos: [],
      isDone: false,
      ShowContent: true,
      selected: {}
    }
  },
  created() {
    const data = localStorage.getItem('todos')
    data ? this.todos = JSON.parse(data) : null
  },
  mounted() {
    this.todos = JSON.parse(localStorage.getItem('todos')).filter(item => !item.toDelete);
  },
  methods: {
    addNote() {
      if (this.addNoteText != "") {
        const maxId = this.todos.reduce((acc, note) => Math.max(acc, note.id), 0);
        const capitalizedText = this.addNoteText.charAt(0).toUpperCase() + this.addNoteText.slice(1);
        this.todos.push({
          id: maxId + 1,
          text: capitalizedText,
          isComplete: this.isDone
        })
        localStorage.setItem('todos', JSON.stringify(this.todos))
        this.addNoteText = '';
      }
    },
    saveNote(id) {
      const newText = this.editNote['_' + id]
      this.todos = this.todos.map((todo) => {
        if (todo.id !== id) return todo
        return {
          ...todo,
          text: newText
        }
      })
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
    deleteItem(id) {
      this.todos.forEach((item, index) => {
        if (item.id === id) {
          item.toDelete = true;
          console.log('step 1')
          setTimeout(() => {
            console.log('step 2')
            this.todos.splice(index, 1);
          }, 900);
        }
      })
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
    toggleEdit(note) {
      const key = '_' + note.id
      this.editMode[key] = !this.editMode[key]
      if (this.editMode[key]) {
        this.editNote[key] = note.text
      } else {
        this.saveNote(note.id)
      }
    }
  }
}
</script>
<template>
  <div class="page-container d-flex flex-column">
    <h1 class="header-top align-self-center mt-4">
      TODO LIST
    </h1>
    <div class="content d-flex flex-grow-1 flex-column">
      <div class="input-container my-3">
        <input type="text" placeholder="..Print your note..." class="input-form" v-model="addNoteText"
          @keyup.enter="addNote(id++)">
      </div>

      <button class="btn add-btn" @click="addNote(id++)">
        <p class="btn-text">
          ADD
        </p>
      </button>

      <p class="my-3"> Список задач: {{ todos.length }} </p>

      <div class="note-wrapper align-items-center d-flex flex-column flex-grow-1">

        <div class="noteBlock d-flex flex-row mx-4" :class="{ 'fade-out': inputNote.toDelete }" v-for="inputNote in todos"
          :key="inputNote.id">
          <div class="form-check d-flex mx-2 align-self-center">
            <input class="form-check-input" v-model="inputNote.isDone" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
            </label>
          </div>

          <span class="number align-self-start align-self-center my-2">
            {{ inputNote.id }}
          </span>

          <div class="restrict-text">
            <div v-if="!editMode['_' + inputNote.id]" class="input-text text-white"
              @click="inputNote.isDone = !inputNote.isDone" :class="{ underline: inputNote.isDone }">
              {{ inputNote.text }}
            </div>
            <input v-else v-model="editNote['_' + inputNote.id]" @change="saveNote(inputNote.id)">
          </div>

          <div class="d-flex align-items-center">
            <button class="edit-btn" @click.stop.prevent="toggleEdit(inputNote)">
              <img src="../assets/edit.png" class="icon" v-if="!editMode['_' + inputNote.id]">
              <img v-else src="../assets/check.png" class="icon">
            </button>
            <img src="../assets/delete.png" @click="deleteItem(inputNote.id)" class="icon">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.new {
  position: relative;
  border-color: #42b983;
  border-width: 200px;
  border-style: solid;
  border-image: linear-gradient(to top,
      red,
      rgba(0, 0, 0, 0)) 1 20%;
  transition: border-image 0.5s ease;
}
.fade-out {
  animation: fade-out 1s;
  background-color: #ff0808;
}
@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
}.xx{
  background-color: #2e4475;
}
input {
  outline: none;
  border: none;
  border-bottom: 4px;
  border-color: green;
  background-color: transparent;
}

input:active {
  outline: none;
  border: none;
  background-color: transparent;
}

input:focus {
  outline: none;
  border: none;
  background-color: transparent;
}

.input-form::placeholder {
  color: #ababab;
}

.edit-btn {
  border-width: 0;
  background-color: transparent;
}

.page-container {
  width: 800px;
  height: 800px;
  border-radius: 10px;
  border: 1px solid #000000;
  margin: 0 auto;
  margin: auto;
}

.content {
  width: 800px;
  flex-direction: column;
  align-items: center;
  overflow: auto;
}

.note-wrapper {
  position: relative;
  display: flex;
  width: 100%;
  overflow: auto;
}

/*
.note-wrapper::before,
.note-wrapper::after {
  content: "";
  position: absolute;
  padding-top: 100px;
  width: 100%;
  height: 80px;
  background-image: linear-gradient(to top, rgba(255, 255, 255, 0), #7331e7);
}
*/
/*.note-wrapper::after {
  bottom: 0;
}*/

.note-wrapper::before {
  top: 0;
  overflow: hidden;
}

.header-top {
  display: flex;
}

.noteBlock {
  margin-bottom: 10px;
  margin-left: 12px;
  border-radius: 18px;
  width: 500px;
  background-color: #e8e8e8;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.noteBlock:not(:hover) {
  background-color: #9f98d7;
}

.noteBlock:hover {
  background-color: #e5e5e5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 20px #CCC1A8,
    0px 0px 12px #CCC1A8,
    0px 0px 10px #CCC1A8;
}

.noteBlock:last-child {
  margin-bottom: 60px;
}

.input-container {
  margin-bottom: 20px;
  border-bottom: 2px solid #ababab;
}

.input-form {
  width: 500px;
  border-radius: 18px;
  outline: none;
  border: none;
  color: #a4a4a4;
}

.add-btn {
  background-color: #eec066;
  width: 75px;
  height: 32px;
  border-radius: 20px;
}

.add-btn:hover {
  box-shadow: 0px 4px 4px rgb(26, 49, 80);
}

.add-btn:active {
  box-shadow: 0px 3px 3px rgb(163, 182, 206);
}

.btn-text {
  font-family: "Inria Sans";
  font-size: 20px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin: -6px;
}

.icon {
  width: 20px;
  height: 20px;
}

.form-check-input {
  margin-top: 0px;
  width: 24px;
  height: 24px;
  border-radius: 25px !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.form-check-input:checked[type=checkbox] {
  background-color: #ff9b25;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-image: url(data:image/svg+xml,%3csvg xmlns= 'http://www.w3.org/2000/svg' viewBox= '0 0 20 20' %3e%3cpath fill= 'none' stroke= '%234F4F4F' stroke-linecap= 'round' stroke-linejoin= 'round' stroke-width= '3' d= 'M6 10l3 3l6-6' /%3e%3c/svg%3e);
}

.underline {
  text-decoration: line-through;
}

p,
span {
  font-family: "JetBrains Mono";
  color: black;
}

h1 {
  font-family: "Inria Sans";
  font-weight: 800;
  color: #2e4475;
  padding-top: 0px;
  padding-bottom: 0px;
  margin-bottom: 0px;
}

.restrict-text {
  text-align: start;
  width: 350px;
  padding: 5px 0 5px 5px;
}

.number {
  font-family: "JetBrains Mono";
  font-weight: 800;
  margin-right: 10px;
  margin-left: 10px;
  font-size: 12px;
}

.input-text {
  color: #000000 !important;
  height: auto;
}

::-webkit-scrollbar {
  width: 20px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #53a84c;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background: #56409b;
  border-radius: 7px;
}

::-webkit-scrollbar-thumb:hover {
  background: #bbbbbb;
}
</style>

