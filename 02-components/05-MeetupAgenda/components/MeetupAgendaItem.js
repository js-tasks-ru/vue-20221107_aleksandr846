import { defineComponent } from '../vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles } from '../meetupService.js';

export default defineComponent({
  name: 'MeetupAgendaItem',

  agendaItemDefaultTitles: agendaItemDefaultTitles,
  agendaItemIcons: agendaItemIcons,

  props: {
    agendaItem: {
      type: Object,
      required: true
    }
  },

  computed: {
    agendaItemTitle() {
      return !this.agendaItem.title ? this.$options.agendaItemDefaultTitles[this.agendaItem.type] : this.agendaItem.title;
    }
  },
  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <!-- <img src="/assets/icons/icon-key.svg" class="icon" alt="key" /> -->
        <img :src="\`/assets/icons/icon-\${$options.agendaItemIcons[agendaItem.type]}.svg\`" class="icon" alt="key" />
      </div>
      <div class="agenda-item__col">{{ agendaItem.startsAt + ' - ' + agendaItem.endsAt }}</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">{{ agendaItemTitle }}</h3>
        <p class="agenda-item__talk" v-show="agendaItem.type == 'talk'">
          <span>{{ agendaItem.speaker }}</span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">{{ agendaItem.language }}</span>
        </p>
        <p v-show="!!agendaItem.description">{{ agendaItem.description }}</p>
      </div>
    </div>`,
});
