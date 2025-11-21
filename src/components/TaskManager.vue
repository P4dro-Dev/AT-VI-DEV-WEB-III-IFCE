<template>
  <div class="task-manager-card">
    <h2>Lista de Tarefas</h2>

    <form @submit.prevent="addTask" class="add-task-form">
      <input
        type="text"
        v-model="newTask"
        placeholder="Adicionar nova tarefa de estudo..."
        required
      />
      <button type="submit">Adicionar</button>
    </form>

    <ul class="task-list">
      <li v-if="tasks.length === 0" class="task-item empty-state">
        Nenhuma tarefa pendente! Adicione uma para começar.
      </li>
      <li
        v-for="task in tasks"
        :key="task.id"
        :class="['task-item', { 'completed': task.completed }]"
      >
        <span class="task-text">{{ task.text }}</span>
        
        <div class="task-actions">
          
          <button
            @click="toggleTaskStatus(task.id, task.completed)"
            :class="task.completed ? 'undo-btn' : 'complete-btn'"
            title="Concluir/Desfazer Tarefa"
          >
            {{ task.completed ? 'Desfazer' : 'Concluir' }}
          </button>
          
          <button
            @click="deleteTask(task.id)"
            class="delete-btn"
            title="Excluir Permanentemente"
          >
            Excluir
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy,
  doc, 
  updateDoc, 
  deleteDoc 
} from "firebase/firestore";
import { db } from "../firebase";

export default {
  setup() {
    const newTask = ref("");
    const tasks = ref([]);
    
    const col = collection(db, "tasks");
    const q = query(col, orderBy("createdAt", "desc"));

    onMounted(() => {
      onSnapshot(q, snap => {
        tasks.value = snap.docs.map(d => ({ 
          id: d.id, 
          completed: d.data().completed || false, // Garante que completed exista
          ...d.data() 
        }));
      });
    });

    async function addTask() {
      if (!newTask.value.trim()) return;
      try {
        await addDoc(col, { 
          text: newTask.value, 
          completed: false, // Novo campo
          createdAt: Date.now() 
        });
        newTask.value = "";
      } catch (e) {
        console.error("Erro ao adicionar documento: ", e);
      }
    }

    async function toggleTaskStatus(id, currentStatus) {
      try {
        const docRef = doc(db, "tasks", id);
        await updateDoc(docRef, {
          completed: !currentStatus 
        });
      } catch (e) {
        console.error("Erro ao atualizar o status: ", e);
      }
    }

    async function deleteTask(id) {
      try {
        const docRef = doc(db, "tasks", id);
        await deleteDoc(docRef);
      } catch (e) {
        console.error("Erro ao deletar documento: ", e);
      }
    }

    return { 
      newTask, 
      tasks, 
      addTask,
      toggleTaskStatus, 
      deleteTask 
    };
  }
};
</script>