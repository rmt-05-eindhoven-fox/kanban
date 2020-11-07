<template>
<div>
    <div class="row bg-dark text-white justify-content-center align-items-center" style="height: 100vh;">
        <form>
            <div class="col bg-light text-dark rounded shadow" style="width: 50vw;">
                <div class="row card-header text-center font-weight-bold justify-content-center mb-4">Detail Task : Coba</div>
                <div class="mb-2">
                    <h6 style="font-weight: bold;">Title :</h6>
                    <p style="font-size: small">Coba</p>
                </div>
                <div class="mb-2">
                    <h6 style="font-weight: bold;">Status :</h6>
                    <p style="font-size: small">Doing</p>
                </div>
                <div class="d-flex mt-5 justify-content-between">
                    <div class="mb-4"></div>
                    <div class="mb-4">
                        <button type="button" class="btn btn-danger">Delete</button>
                    </div>
                    <div class="mb-4">
                        <button type="button" class="btn btn-warning text-white">To-Do</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
</template>

<script>
export default {
    name: 'DetailBacklog'
}
</script>

<style>

</style>