<template>
  <div class="container">
    <header class="header">
      <h1>StudyTasks</h1>
      <p>Gerencie tarefas de estudo com Vue + Firebase</p>
    </header>

    <TaskManager />

    <footer class="footer">
      <p>Projeto StudyTasks ✔ Integrado com Firebase</p>
    </footer>
  </div>
</template>

<script>
import TaskManager from "./components/TaskManager.vue";
export default { components: { TaskManager } };
</script>
