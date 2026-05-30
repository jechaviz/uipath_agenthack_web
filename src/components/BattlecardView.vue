<template>
  <section class="battle-grid">
    <article v-for="item in items" :key="item.label" class="battle-card">
      <div>
        <p class="eyebrow">Threat {{ item.threat }}%</p>
        <h2>{{ item.label }}</h2>
      </div>
      <p>{{ item.counter }}</p>
      <progress :value="item.threat" max="100"></progress>
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
