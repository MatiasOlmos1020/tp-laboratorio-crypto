<template>
    <div v-if="isOpen" class="modal-overlay">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-white border shadow-lg rounded">
          <div class="modal-body text-center p-4">
            <p>{{ message }}</p>
          </div>
          <div class="modal-footer d-flex justify-content-center">
            <button type="button" class="btn btn-danger m-3" @click="$emit('cancel')">Cancelar</button>
            <button type="button" class="btn btn-success m-3" @click="$emit('confirm')">Confirmar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isOpen: {
        type: Boolean,
        required: true
      },
      message: {
        type: String,
        default: "¿Estás seguro de que deseas continuar?"
      }
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1050;
  }
  
  .modal-content {
    max-width: 400px;
    border-radius: 8px;
  }
  </style>
  