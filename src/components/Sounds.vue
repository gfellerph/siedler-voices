<template>
  <div class="sounds">
    <p>Listening: {{listening}}</p>
    <p>
      <button @click="toggleListen">
        <span v-if="listening">Stop listening</span>
        <span v-if="!listening">Start listening</span>
      </button>
    </p>
  </div>
</template>

<script>
  /* global annyang */

  export default {
    data() {
      return {
        listening: false,
        heard: '',
      };
    },

    ready() {
      const commands = {
        'hallo :name': this.setName,
      };

      annyang.init(commands);
      annyang.setLanguage('de-DE');
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
      setName(name) {
        this.heard = name;
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>
