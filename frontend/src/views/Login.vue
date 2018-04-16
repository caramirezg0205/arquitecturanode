<template>
    <div class="app flex-row align-items-center">
        <div class="container">
            <vue-snotify></vue-snotify>
            <div class="row justify-content-center">
              <div class="col-md-8">
                <div class="card-group">
                  <div class="card" style="background-color: #131B30">
                    <div class="card-body text-center">
                      <img src="../assets/logomiteleferico.png" width="200" alt="Card image cap">
                    </div>
                  </div>
                  <div class="card">
                  <div class="card-body">
                    <h3>Sistemas Mi Teleférico</h3>
                    <p class="text-muted">Login | Ingrese usuario y contraseña</p>
                    <div class="input-group mb-3">
                      <span class="input-group-addon"><i class="icon-user"></i></span>
                      <input type="text" class="form-control" v-model="username"  placeholder="Usuario">
                    </div>
                    <div class="input-group mb-4">
                      <span class="input-group-addon"><i class="icon-lock"></i></span>
                      <input type="password" class="form-control" v-on:keyup.enter="login" v-model="password"
                       placeholder="Contraseña">
                    </div>
                    <div class="row">
                      <div class="col-12 text-center">
                        <button type="button" class="btn btn-link px-0">¿Olvido su contraseña?</button>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12">
                        <button type="button" v-on:click="login" class="btn btn-primary px-4">Ingresar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <b-modal title="Error" v-model="myModal" @ok="myModal = false">
                {{mensajeError}}
            </b-modal>
        </div>
    </div>
</template>
<script>
  import Vue from 'vue'
  import AuthService from '@/http/AuthService'
  import Snotify, { SnotifyPosition } from 'vue-snotify'

  const options = {
    toast: {
      position: SnotifyPosition.rightCenter
    }
  }

  Vue.use(Snotify, options)
  export default {
    name: 'Login',
    data () {
      return {
        id: null,
        usuario: '',
        token: null,
        username: '',
        password: '',
        localstorage: '',
        myModal: false,
        mensajeError: ''
      }
    },
    methods: {
      async login () {
        this.$Progress.start()
        var vm = this
        if (this.username !== '' && this.password !== '') {
          var params =
            { username: this.username, password: this.password }
          const response = await AuthService.authenticate(params)
          const data = response.data
          if (data.success === true) {
            localStorage.setItem('token', data.token)
            vm.$router.push('/activos')
          } else {
            this.mensajeError = data.message
          }
        } else {
          vm.$snotify.error('Ingrese usuario y contraseña')
          this.$Progress.fail()
        }
      }
    }
  }
</script>
<style>
  @import "~vue-snotify/styles/material.css";
</style>

