<script>
export default {
  data() {
    return {
      inputNote: '',
      todos: [],
      isDone: false,
      id: 0,
    }
  },
  async mounted() {
    const data = await localStorage.getItem('todos')
    data ? this.todos = JSON.parse(data) : null
  },
  methods: {
    addNote() {
      if (this.inputNote != "") {
        this.todos.push({
          id: this.id,
          text: this.inputNote,
          isComplete: this.isDone
        })
        localStorage.setItem('todos', JSON.stringify(this.todos))
        this.inputNote = ''; // Очищаем поле ввода после добавления заметки
      }
    },
    deleteItem(id) {
      this.todos.forEach((item, index) => {
        if (item.id === id) {
          this.todos.splice(index, 1);
        }
      })
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
    toggleClass() {
      this.inputNote.isDone = !this.inputNote.isDone;
    }
  }
}
</script>
<template>
  <div class="page-container d-flex flex-column ">
      <h1 class="header-top align-self-center"> TODO LIST </h1>
      <div class="content d-flex flex-grow-1 flex-column">
        <div class="input-container">
          <input type="text"
                 placeholder="..Print your note..."
                 class="input-form"
                 v-model="inputNote">
        </div>
        <button class="btn add-btn"
                @click="addNote(id++)">
          <p class="btn-text">
            ADD
          </p>
        </button>
        <p> Список задач: {{ todos.length }} </p>
        <div class="note-wrapper  align-items-center d-flex flex-column flex-grow-1">
         <div class="noteBlock d-flex flex-row mx-4 "
               v-for="inputNote in todos" :key="inputNote.id">

                       <div class="form-check d-flex mx-2 align-self-center">
                         <input class="form-check-input"
                                v-model="inputNote.isDone"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault">
                         <label class="form-check-label"
                                for="flexCheckDefault">
                         </label>
                       </div>

                       <span class="number align-self-start align-self-center my-2">
                                   {{ inputNote.id }}
                                 </span>

                       <div class="restrict-text">
                                 <span
                                     class="input-text text-white"
                                     @click=" inputNote.isDone = !inputNote.isDone"
                                     :class="{ underline: inputNote.isDone}">
                                   {{ inputNote.text }}
                                 </span>
                       </div>

                       <img src="../assets/delete.png"
                            @click="deleteItem(inputNote.id)"
                            class="icon d-flex   align-self-center">
                     </div>
        </div>
      </div>
  </div>
</template>


<style>

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
  display: flex;
  width: 100%;
  overflow: auto;
}

.header-top {
  display: flex;
  /*
  transform: translateY(-50%); !* сдвиг вверх на 50% высоты блока .header для центрирования по вертикали *!
  */
}

.noteBlock {
  margin-bottom: 10px;
  margin-left: 12px;
  background-color: #e8e8e8;
  border-radius: 18px;
  width: 400px;
}

.noteBlock:last-child {
  margin-bottom: 60px;
}

.input-container {
  margin-bottom: 20px;
}

.input-form {
  width: 400px;
  border-radius: 18px;
  outline: none;
}

.input-form:focus {
  outline: none;
}

.input-form:hover {
  outline: none;
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

p, span {
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
  width: 280px;
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
  text-transform: capitalize;
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


