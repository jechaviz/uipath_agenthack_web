<template>
  <section class="case-grid">
    <aside class="case-summary">
      <p class="eyebrow">Incident</p>
      <h2>{{ data.caseSummary.id }}</h2>
      <dl>
        <div><dt>Service</dt><dd>{{ data.caseSummary.service }}</dd></div>
        <div><dt>Severity</dt><dd>{{ data.caseSummary.severity }}</dd></div>
        <div><dt>Impact</dt><dd>{{ data.caseSummary.impact }}</dd></div>
        <div><dt>State</dt><dd>{{ data.caseSummary.current }}</dd></div>
      </dl>
    </aside>

    <section class="timeline-panel">
      <div class="panel-heading">
        <h2>Maestro Case Timeline</h2>
        <button class="primary" type="button" @click="advance">Run Demo Step</button>
      </div>
      <ol class="timeline">
        <li v-for="(step, index) in data.timeline" :key="step.title" :class="['step', statusFor(step, index)]">
          <span class="actor">{{ step.actor }}</span>
          <strong>{{ step.title }}</strong>
          <span class="confidence">{{ step.confidence }}%</span>
        </li>
      </ol>
    </section>

    <aside class="story-panel">
      <p class="eyebrow">Why it wins</p>
      <ul>
        <li v-for="line in data.story" :key="line">{{ line }}</li>
      </ul>
    </aside>
  </section>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return { active: 3 };
  },
  methods: {
    advance() {
      this.active = this.active >= this.data.timeline.length - 1 ? 0 : this.active + 1;
    },
    statusFor(step, index) {
      if (index < this.active) return 'done';
      if (index === this.active) return step.status === 'gate' ? 'gate' : 'active';
      return 'ready';
    },
  },
};
</script>
