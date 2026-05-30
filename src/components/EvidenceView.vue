<template>
  <section class="list-panel">
    <article v-for="item in items" :key="item.name" class="list-row">
      <span :class="['state-dot', item.state]"></span>
      <div>
        <h2>{{ item.name }}</h2>
        <p>{{ item.path }}</p>
      </div>
      <strong>{{ item.state }}</strong>
    </article>
  </section>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>
