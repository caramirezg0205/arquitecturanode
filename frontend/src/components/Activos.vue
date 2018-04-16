<template>
  <div>
    <div>
      <h2>Agregar Activo</h2>
      <div>
        <input type="text" class="form-control"
          placeholder="Nombre del activo"
          v-model="activo">
        <button @click="addActivo" class="btn btn-primary">Guardar</button>
      </div>
    </div>
    <br/>
    <br/>
    <div>
      <h2>Listado de Activos</h2>
      <ul class="list-group">
        <li v-for="activo in activos" class="list-group-item" :key ="activo.id">
           <h4> {{ activo.id }} </h4>
          <h4> {{ activo.activo }} </h4>
          <button class="btn btn-warning" @click="showModal(activoToUpdate = activo)">Editar</button>
          <button class="btn btn-danger" @click="deleteActivo(activo.id)">Eliminar</button>
        </li>
      </ul>
    </div>

    <b-modal ref="myModalRef" hide-footer title="Editar Activo">
      <div class="d-block text-center">
         <b-form-input v-model="txtEditActivo"
                  type="text"
                  placeholder="Ingrese el activo"></b-form-input>
      </div>
       <b-btn variant="default" @click="hideModal">Cerrar</b-btn>
      <b-btn variant="primary" @click="actualizarActivo(activoToUpdate)">Guardar</b-btn>
    </b-modal>
  </div>
</template>
<script>
  import ActivoService from '@/http/ActivoService'

  export default {
    name: 'Activos',
    data () {
      return {
        activos: [],
        activo: '',
        txtEditActivo: '',
        activoToUpdate: null
      }
    },

    mounted () {
      this.cargarActivos()
    },

    methods: {
      async addActivo () {
        await ActivoService.addActivo({
          activo: this.activo
        })
        this.cargarActivos()
      },

      async cargarActivos () {
        const list = await ActivoService.listActivos()
        this.activos = list.data
      },

      async deleteActivo (id) {
        await ActivoService.deleteActivo(id)
        this.cargarActivos()
      },
      async actualizarActivo (activo) {
        activo.activo = this.txtEditActivo
        await ActivoService.updateActivo(activo)
        this.limpiarCamposEdit()
        this.$refs.myModalRef.hide()
        this.$refs.modal.hide()
      },
      limpiarCamposEdit () {
        this.txtEditActivo = ''
      },
      showModal (activo) {
        this.txtEditActivo = activo.activo
        this.$refs.myModalRef.show()
      },
      hideModal () {
        this.$refs.myModalRef.hide()
      }

    }
  }
</script>
