<template>
  <div id="app">
    <img
      src="https://chapterone.qodeinteractive.com/wp-content/uploads/2019/07/home-5-single-image-3.png"
      alt="logo"
    />
    <h1>English dictionary</h1>
    <p>Find meanings and save for quick reference</p>
    <div class="app-content">
      <div class="content-search">
        <h2 v-if="isError">{{ errorMessage }} :(</h2>
        <my-input
          type="text"
          placeholder="Enter word"
          v-model="wordQuery"
          @keypress="onSubmit"
          class="word-input"
        />
      </div>
      <div v-if="!isLoading && !isError">
        <div class="word-card">
          <div class="word">
            <svg-icon
              :fa-icon="faPlayCircle"
              @click="playAudio"
              class="word-btn"
            ></svg-icon>
            <audio ref="audio" :src="wordDetails[0].phonetics[0].audio"></audio>

            <h3>
              {{ wordDetails[0].word }} [{{ wordDetails[0].phonetics[0].text }}]
            </h3>
          </div>
          <div class="word-details">
            <p class="details-text-container">
              <strong>Part of speech: </strong>
              {{ wordDetails[0].meanings[0].partOfSpeech }}
            </p>

            <p class="details-text-container">
              <strong>Definition: </strong>
              {{ wordDetails[0].meanings[0].definitions[0].definition }}
            </p>

            <p
              class="details-text-container"
              v-if="wordDetails[0].meanings[0].definitions[0].example"
            >
              <strong>Example: </strong
              >{{ wordDetails[0].meanings[0].definitions[0].example }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import useFetch from "@/hooks/useFetch";
import { faHeadphones, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
export default {
  name: "app",

  setup() {
    const wordQuery = ref("");
    const audio = ref(null);

    const state = reactive({
      wordDetails: [],
      isError: false,
      errorMessage: "",
      isLoading: true,
    });

    const onSubmit = async (e) => {
      if (e.key === "Enter") {
        const { data, isLoading, isError, errorMessage, fetchData } = useFetch({
          url: `https://api.dictionaryapi.dev/api/v2/entries/en/${wordQuery.value}`,
        });

        await fetchData();

        state.wordDetails = data.value;
        state.isError = isError.value;
        state.errorMessage = errorMessage.value;
        state.isLoading = isLoading.value;

        wordQuery.value = "";
      }
    };

    const playAudio = () => {
      audio.value.play();
    };

    return {
      wordQuery,
      ...toRefs(state),
      onSubmit,
      playAudio,
      audio,
      faHeadphones,
      faPlayCircle,
    };
  },
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  color: rgba(0, 0, 0, 0.87);
  font-family: Mulish, sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5;
  background-color: rgb(241, 243, 244);
}

#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}

.app-content {
  padding: 30px;
  width: 100%;

  .content-search {
    width: 50vw;
    margin: auto;
  }
  .word-input {
    width: 100%;
  }
  .word-input:focus {
    border: 1px solid teal;
  }
}

.word-card {
  max-width: 700px;
  margin: 30px auto;
  padding: 50px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);

  background-color: #fff;

  .word-btn {
    margin-right: 5px;
    cursor: pointer;
  }

  .word-btn:hover {
    color: orange;
  }

  .word {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .word-details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    .details-text-container {
      text-align: left;
      line-height: 1.2rem;
      margin-top: 15px;
    }
  }
}
</style>
