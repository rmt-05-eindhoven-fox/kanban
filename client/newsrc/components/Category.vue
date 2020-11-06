<template>
  <div>
     <!-- CARD -->
    <div class="container">
      <div class="row" >

        <div class="item col-md-3 col-sm-6 col-12"> 
          <h1 v-text="BackLog"></h1>
          <div class="category">
            <div class="card border-secondary mb-3" style="max-width: 18rem;">
              <div class="card-header bg-transparent border-secondary">Header</div>
              <div class="card-body text-secondary">
                <h5 class="card-title">secondary card title</h5>
                <p class="card-text"></p>
              </div>

              <!-- v-model -->
              <div class="card-footer bg-transparent border-secondary">
                <h5>{{edit}}</h5>
                <input type="text" v-model='edit' class="form-control" placholder='edit task'>
              </div>

              <!-- for loop test -->
              <ul>
                <li v-for="(test, i) in testLoop" :key="i">
                  {{test.name}}
                </li>
              </ul>

            </div>
            <div class="card border-secondary mb-3" style="max-width: 18rem;">
              <div class="card-header bg-transparent border-secondary">Header</div>
              <div class="card-body text-secondary">
                <h5 class="card-title">secondary card title</h5>
                <p class="card-text"></p>
              </div>
              <div class="card-footer bg-transparent border-secondary">Footer</div>
            </div>
          </div>
        </div>  

        <div class="item col-md-3 col-sm-6 col-12" > 
          <h1>{{ ToDo }}</h1>
          <div class="category">
            <div class="card border-warning mb-3" style="max-width: 18rem;">
              <div class="card-header bg-transparent border-warning">Header</div>
              <div class="card-body text-warning">
                <h5 class="card-title">warning card title</h5>
                <p class="card-text"></p>
              </div>
              <div class="card-footer bg-transparent border-warning">Footer</div>
            </div>

            <div class="card border-warning mb-3" style="max-width: 18rem;">
              <div class="card-header bg-transparent border-warning">Header</div>
              <div class="card-body text-warning">
                <h5 class="card-title">warning card title</h5>
                <p class="card-text"></p>
              </div>
              <div class="card-footer bg-transparent border-warning">Footer</div>
            </div>
          </div>
        </div>  

        <div class="item col-md-3 col-sm-6 col-12" > 
          <h1>{{ OnProgress }}</h1>
          <div class="category">
            <div class="card border-success mb-3" style="max-width: 18rem;">
              <div class="card-header bg-transparent border-success">Header</div>
              <div class="card-body text-success">
                <h5 class="card-title">Success card title</h5>
                <p class="card-text"></p>
              </div>
              <div class="card-footer bg-transparent border-success">Footer</div>
            </div>

            <div class="card border-success mb-3" style="max-width: 18rem;">
              <div class="card-header bg-transparent border-success">Header</div>
              <div class="card-body text-success">
                <h5 class="card-title">Success card title</h5>
                <p class="card-text"></p>
              </div>
              <div class="card-footer bg-transparent border-success">Footer</div>
            </div>
          </div>
        </div>  

        <div class="item col-md-3 col-sm-6 col-12" > 
          <h1>{{ Completed }}</h1>
          <div class="category">
            <div class="card border-primary mb-3" style="max-width: 18rem;">
              <div class="card-header bg-transparent border-primary">Header</div>
              <div class="card-body text-primary">
                <h5 class="card-title">primary card title</h5>
                <p class="card-text"></p>
              </div>
              <div class="card-footer bg-transparent border-primary">Footer</div>
            </div>

            <div class="card border-primary mb-3" style="max-width: 18rem;">
              <div class="card-header bg-transparent border-primary">Header</div>
              <div class="card-body text-primary">
                <h5 class="card-title">primary card title</h5>
                <p class="card-text"></p>
              </div>
              <div class="card-footer bg-transparent border-primary">Footer</div>
            </div>
          </div>
        </div>  
      </div>

    </div>
  <!-- END CARD -->
  </div>
</template>

<script>
export default {
  name: 'Category',
  data() {
    return {}
  }
}
</script>

<style>

</style>