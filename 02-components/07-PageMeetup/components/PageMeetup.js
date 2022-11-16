import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupDescription from '../../02-MeetupDescription/components/MeetupDescription';
import MeetupCover from '../../03-MeetupCover/components/MeetupCover';
import MeetupInfo from '../../04-MeetupInfo/components/MeetupInfo';
import MeetupAgendaItem from '../../05-MeetupAgenda/components/MeetupAgendaItem';
import MeetupAgenda from '../../05-MeetupAgenda/components/MeetupAgenda';
import MeetupView from '../../06-MeetupView/components/MeetupView.js';
import { fetchMeetupById } from '../meetupService';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupDescription,
    MeetupCover,
    MeetupInfo,
    MeetupAgendaItem,
    MeetupAgenda,
    MeetupView
  },

  props: {
    meetupId: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      meetup: null,
      error: null,
      state: null
    };
  },

  watch: {
    meetupId() {
        this.getMeetup();
      }
  },

  methods: {
    getMeetup() {
        this.state = 'loading';
        this.meetup = null;
        this.error = null;
        
        fetchMeetupById(this.meetupId)
        .then((response) => {
          this.meetup = response;
          this.state = 'success';
        })
        .catch(err => {
          this.error = err.message;
          this.state = 'error';
        });
    }
  },
  mounted() {
    this.getMeetup();
  },

  template: `
    <div class="page-meetup">
      <!-- meetup view -->
      <UiContainer v-if="state == 'loading'">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>
      <MeetupView :meetup="meetup" v-else-if="state == 'success'" />
      <UiContainer v-else-if="state == 'error'">
        <UiAlert>{{ error }}</UiAlert>
      </UiContainer>
    </div>`,
});
