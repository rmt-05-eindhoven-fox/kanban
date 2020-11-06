<template>
    <nav class="navbar navbar-expand-lg navbar-dark primary-color">
            <p class="navbar-brand" href="#"><b>Fancy Todo</b></p>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav" aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="basicExampleNav">
                <ul class="navbar-nav mr-auto">
                </ul>
                <div class="form-inline">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <p class="nav-link waves-effect waves-light" @click="logout()"><b>Logout</b></p>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
</template>

<script>
  export default {
    name: 'Basic',
    components: {
    },
    methods: {
        logout() {
            localStorage.clear("token");
            this.$emit('screen', 'LoginForm')
            this.$emit('setToken',null)            
        }
    },
  }
</script>
