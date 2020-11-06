<template>
  <option value="data.OrganizationId">{{ data.Organization.org_name }}</option>
</template>

<script>
export default {
    name: 'Organization',
    props: ['data']
}
</script>

<style>

</style>