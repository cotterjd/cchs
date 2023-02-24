<template>
  <div class="about">
    <h1>version {{version}}</h1>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'

export default defineComponent({
  name: `AboutView`,
  computed: {
    ...mapState({
      version: (state: any) => state.version,
    }),
  },
})
</script>
