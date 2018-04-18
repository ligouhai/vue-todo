<template>
  <div class="helper">
    <span class="left">2 items left</span>
    <span class="tabs">
      <!-- key 提高性能 -->
      <span 
        v-for="state in states" 
        :key="state" 
        :class="[state,filter === state ? 'active' : '']"
        @click="toggleFilter(state)">
        {{state}}
      </span>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      states: ["all", "active", "completed"]
    };
  },
  methods: {
    toggleFilter() {
      
    }
  }
};
</script>

