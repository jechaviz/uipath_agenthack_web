<template>
  <main class="app-shell">
    <header class="hero-band">
      <div>
        <p class="eyebrow">{{ data.track }}</p>
        <h1>{{ data.product }}</h1>
        <p class="tagline">{{ data.tagline }}</p>
      </div>
      <div class="prod-meter" aria-label="Production readiness">
        <span>{{ data.prod }}%</span>
        <small>Prod readiness</small>
      </div>
    </header>

    <MetricStrip :metrics="data.metrics" />

    <nav class="tab-row" aria-label="Demo sections">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab-button', { active: tab.id === activeTab }]"
        type="button"
        @click="activeTab = tab.id"
      >
        <i :data-lucide="tab.icon"></i>
        <span>{{ tab.label }}</span>
      </button>
    </nav>

    <CaseOpsView v-if="activeTab === 'case'" :data="data" />
    <BattlecardView v-else-if="activeTab === 'battle'" :items="data.battlecard" />
    <EvidenceView v-else-if="activeTab === 'evidence'" :items="data.evidence" />
    <AutomationView v-else :items="data.automations" />
  </main>
</template>

<script>
import MetricStrip from '/src/components/MetricStrip.vue';
import CaseOpsView from '/src/components/CaseOpsView.vue';
import BattlecardView from '/src/components/BattlecardView.vue';
import EvidenceView from '/src/components/EvidenceView.vue';
import AutomationView from '/src/components/AutomationView.vue';

export default {
  components: {
    MetricStrip,
    CaseOpsView,
    BattlecardView,
    EvidenceView,
    AutomationView,
  },
  data() {
    return {
      data: window.agenticIncidentOpsData,
      activeTab: 'case',
      tabs: [
        { id: 'case', label: 'Case', icon: 'activity' },
        { id: 'battle', label: 'Battlecard', icon: 'swords' },
        { id: 'evidence', label: 'Evidence', icon: 'folder-check' },
        { id: 'automation', label: 'Automation', icon: 'bot' },
      ],
    };
  },
  mounted() {
    this.refreshIcons();
  },
  updated() {
    this.refreshIcons();
  },
  methods: {
    refreshIcons() {
      this.$nextTick(() => {
        if (window.lucide) window.lucide.createIcons();
      });
    },
  },
};
</script>
