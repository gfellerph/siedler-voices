<template>
  <div class="sounds">
    <p>Listening: {{listening}}</p>
    <p>Playing: {{playing}}</p>
    <p>
      <button @click="toggleListen">
        <span v-if="listening">Stop listening</span>
        <span v-if="!listening">Start listening</span>
      </button>
      <button @click="play(commands[0].sound)">play Strasse</button>
    </p>
    <p>Heard: {{recognition.interimResults}}</p>
  </div>
</template>

<script>
  /* global annyang */
  /* global webkitSpeechRecognition */
  /* global webkitSpeechGrammarList */

  /* const sounds = {
    street: '/static/jackhammer.mp3',
  };*/

  export default {
    name: 'Sounds',

    data() {
      return {
        listening: false,
        player: new Audio(),
        playing: false,
        /* eslint-disable new-cap */
        recognition: new webkitSpeechRecognition(),
        commands: [
          {
            sound: '/static/hammer.mp3',
            alternatives: [
              'Strass',
              'Strasse',
              'Straße',
              'Straß',
            ],
          },
        ],
      };
    },

    mounted() {
      const commands = {
        Straße: this.checkResult,
        Lehm: this.checkResult,
      };
      /* const grammar = '#JSGF V1.0; grammar siedler; public <command> = Lehm | Strasse | Strass;';
      const speechRecognitionList = new webkitSpeechGrammarList();
      speechRecognitionList.addFromString(grammar, 1);
      this.recognition.lang = 'de-DE';
      this.recognition.continuous = true;
      this.recognition.interimResults = false;
      this.recognition.grammar = speechRecognitionList;
      this.recognition.onresult = this.checkResult;
      this.recognition.onend = this.handleEnd;
      this.recognition.onstart = this.handleStart; */
      annyang.debug(true);
      annyang.setLanguage('de-DE');
      annyang.addCommands(commands);
    },
    methods: {
      toggleListen() {
        this.listening = !this.listening;
        if (this.listening) {
          annyang.start();
        } else {
          annyang.abort();
        }
      },
      checkResult(event) {
        // const result = event.results[0][0].transcript;
        /* eslint-disable no-console */
        console.log(event.results[0][0].transcript);
        /* for (let i = 0; i < this.commands.length; i += 1) {
          for (let ii = 0; ii < this.commands[i].alternatives.length; ii += 1) {
            if (result.indexOf(this.commands[i].alternatives[ii] > -1)) {
              this.play(this.commands[i].sound);
              this.recognition.abort();
              return;
            }
          }
        } */
        // this.play(this.commands[0].sound);
      },
      handleEnd() {
        if (this.listening) {
          this.recognition.start();
        }
      },
      handleStart() {
        /* eslint-disable no-console */
        console.log('webkit speech recognition started');
      },
      play(sound) {
        console.log(sound);
        if (this.playing) return;
        this.player.src = sound;
        this.playing = true;
        this.player.play();
        this.player.onended = function audioEnd() {
          this.player.onended = null;
          this.playing = false;
        }.bind(this);
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>
