<template>
  <div class="container" id="moveTask-page" style="padding-top: 5vh;">
    <div id="formTask" class="row justify-content-center">
      <form style="width: 40%; background-color: cornsilk;">
        <h2>Move Task</h2>
        <div class="form-group">
          <label>Category</label>
          <select multiple class="form-control">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary">Move</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "editCat"
}
</script>

<style>

</style>