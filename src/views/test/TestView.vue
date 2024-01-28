<script lang="ts" setup>
import axiosClient from '@/axiosClient';
import { ref, onMounted, computed } from 'vue';
import type { QuestionsType } from '@/types/QuestionsType'
import type { AnswerType } from '@/types/AnswerType'
import { TestResultsStore } from '@/stores/TestResultsStore'

const testResults = TestResultsStore();

const questions = ref<Array<QuestionsType>>([]);
const itemsPerPage = 11;
const currentPage = ref<number>(1);


onMounted((): void => {
  axiosClient.get('api/getQuestion')
    .then((res: any) => {
      questions.value = res.data
    })
    .catch((err: any) => {
      console.log('could not get questions', err);
    });
});

const slicedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return questions.value.slice(start, end);
});


// all answers
const answers = ref<Array<AnswerType>>([]);
// //Progress bar counter
const progressProcent = ref<number>(0);
const progressBarText = ref<number>();
const showProgresBar = ref<boolean>(false);
const allQuestionsAnswered = ref<boolean>(false);
/**
 * Handels values from the answer radio buttons
 */
const onRadiobutonClick = (questionId: number, value: number): void => {
  const isQuestionAlreadyAnswered = answers.value.some((answeredItem: AnswerType) => answeredItem?.questionId === questionId);

  if (!isQuestionAlreadyAnswered) {
    answers.value.push({ value: value, questionId: questionId });
    // if ($(this).parent().hasClass('checked') == false) {
    progressProcent.value = progressProcent.value + 2.27272727;
    progressBarText.value = Math.ceil(progressProcent.value);
    showProgresBar.value = true;
    if (progressBarText.value === 100) {
      allQuestionsAnswered.value = true;
    }
    // } $(this).parent().addClass('checked');
  }

  if (answers.value.length > 43) {
    submitButtonStatus.value = true;
    nextButtonStatus.value = false;
    prevButtonStatus.value = false;
  }

}

/**
 * Submit form with Answers get avaluated data
 */
const submitHandler = (): void => {
  axiosClient.post('api/getQuestion', answers)
    .then((res: any) => {
      testResults.testResults = res.data
    })
    .catch((err: any) => {
      console.log('could not get questions', err);
    });
};


//Progress bar changelog and tab switching
//foward button
// $('.question:nth-child(n+12)').addClass('hide');

const progressMinutes = ref<string>("7:30");
const submitButtonStatus = ref<boolean>(false);
const nextButtonStatus = ref<boolean>(true);

const showNextPage = () => {

  currentPage.value++;

  if (currentPage.value > Math.ceil(questions.value.length / itemsPerPage)) {
    currentPage.value = 1;
  }

  if (currentPage.value == 2) {
    prevButtonStatus.value = true;
    // progressMinutes.value = "7:30";
  } else if (currentPage.value == 3) {
    progressMinutes.value = "5:00";
  } else if (currentPage.value == 4) {
    progressMinutes.value = "2.5";
    nextButtonStatus.value = false;
  }

  scrollToTop();
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // Adds smooth scroll behavior
  });
}

  const prevButtonStatus = ref<boolean>(false);
  // // Go back button
  const showPrevPage = () => {
    currentPage.value--;

    if (currentPage.value === 1) {
      prevButtonStatus.value = false;
      nextButtonStatus.value = true;
    }
  }
// // Go back button

</script>

<template>
  <div class="container testing-page">

    <div class="progress-container" id="progress-container" :class="{ hide: !showProgresBar }">
      <strong class="progress-status">Done {{ currentPage }}/4</strong> <span class="pull-right"><i class="fa fa-clock-o"
          aria-hidden="true"></i> <i class="progress-minutes">~{{ progressMinutes }}min</i></span>
      <div class="progress">
        <div class="progress-bar progress-bar-striped active" id="progress-bar" role="progressbar" aria-valuenow="0"
          :style="{ width: progressProcent + '%' }" :class="{ 'green-ackground': allQuestionsAnswered }" aria-valuemin="0"
          aria-valuemax="100"> {{ progressBarText }}%</div>
      </div>
      <p v-if="answers.length > 33">Almosst Done you need only {{ 44 - answers.length }} questions to answer</p>
    </div>

    <div class="center">
      <h1><b> Pyetsori i Personalitetit </b></h1>
      <div class="row">
        <div class="test-rules" style="margin: 40px 0">
          <div class="col-md-2 bounce col-md-offset-1"><i class="fas fa-ban fa-4x"></i>
            <p>Është pa pagesë</p>
          </div>
          <div class="col-md-2 bounce"> <i class="fab fa-buromobelexperte fa-4x"></i>
            <p>Ndahët në 4 rubrika me nga 11 pyetje</p>
          </div>
          <div class="col-md-2 bounce"><i class="fas fa-stopwatch fa-4x"></i>
            <p>Nuk merr më shumë kohë se 10 min</p>
          </div>
          <div class="col-md-2 bounce"><i class="fas fa-street-view fa-4x"></i>
            <p>Përgjigjuni sinqerisht për të marr resultat më të saktë</p>
          </div>
          <div class="col-md-2 bounce"><i class="far fa-dot-circle fa-4x"></i>
            <p>Lëni sa më pakë Pyetje neotrale</p>
          </div>
        </div>
      </div>
      <hr>
      <br>
    </div>
    <form @submit.prevent="submitHandler" class="form-horizontal">
      <!-- Tab panes -->
      <div class="tab-content" id="all-tabs">
        <div class="question form-group" v-for="question in slicedItems" :key="question.id">
          <div class="">
            <h4 style="font-weight: 700;">{{ question.question }}</h4>
          </div>
          <div class="test-field">
            <div class="col-md-3 answer-lg">
              <div class="hidden-xs spajtohem-lg">{{ question.spajtohem }}</div>
            </div>
            <div class="col-md-6 circles">
              <input :name="'q' + question.id" type="radio" :id="question.id + 'option1'" class="left" title="Shumë" value="-3"
                @click="onRadiobutonClick(question.id || 0, -3)">
              <input :name="'q' + question.id" type="radio" :id="question.id + 'option2'" class="left" value="-2" title="Mesatarisht"
                @click="onRadiobutonClick(question.id || 0, -2)">
              <input :name="'q' + question.id" type="radio" :id="question.id + 'option3'" class="left" value="-1" title="Pak"
                @click="onRadiobutonClick(question.id || 0, -1)">
              <input :name="'q' + question.id" type="radio" :id="question.id + 'neotral1'" value="0" title="Neotral"
                @click="onRadiobutonClick(question.id || 0, 0)">
              <input :name="'q' + question.id" type="radio" :id="question.id + 'option1r'" class="right" value="1" title="Pak"
                @click="onRadiobutonClick(question.id || 0, 1)">
              <input :name="'q' + question.id" type="radio" :id="question.id + 'option2r'" class="right" value="2" title="Mesatarisht"
                @click="onRadiobutonClick(question.id || 0, 2)">
              <input :name="'q' + question.id" type="radio" :id="question.id + 'option3r'" class="right" value="3" title="Shumë"
                @click="onRadiobutonClick(question.id || 0, 3)">
            </div>
            <div class="col-md-3 answer-lg">
              <div class="hidden-xs pajtohem-lg">{{ question.pajtohem }}</div>
            </div>
          </div>
          <div class="pajtohem visible-xs">
            <div class="col-xs-6">
              <p>{{ question.spajtohem }}</p>
            </div>
            <div class="col-xs-6">
              <p>{{ question.pajtohem }}</p>
            </div>
          </div>
        </div>

        <div class="form-group col-md-12 col-md-offset-2">

          <div class="">
            <a id="goforward" class="tab-forward btn btn-primary btn-lg btn-block" data-toggle="tooltip"
              @click="showNextPage" data-placement="top" title="Vazhdo" v-if="nextButtonStatus">Vazhdo</a>
          </div>
          <div class="">
            <a id="goBack" class="tab-prev btn btn-warning btn-lg btn-block" data-toggle="tooltip" data-placement="top"
              title="Ktheu" @click="showPrevPage" v-if="prevButtonStatus">Mbrapa</a>
          </div>

          <div class="center">
            <input type="submit" class="btn btn-success btn-lg btn-block center" value="Perfundo" id="submit"
              v-if="submitButtonStatus">
          </div>
        </div>

        <div class="alert alert-danger hide"> Keni lënë Pyetje pa përzgjedhur, Shfrytezoni butonin "Kthehu" per te shikuar
        </div>
      </div><!-- end of teb content -->
    </form>
  </div>
</template>