<template>
  <div class="card-skeleton"></div>
</template>

<style>
.card-skeleton {
  flex: 0 0 300px;
  max-width: 300px;
  box-shadow: 0px 0px 5px 5px rgb(0 0 0 / 2%);
  transition: box-shadow 0.3s ease-in-out;
  width: 100%;
  height: 400px;
}

.card-skeleton:hover {
  box-shadow: 0px 0px 5px 5px rgb(0 0 0 / 3%);
}

.card-skeleton:empty::after {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);

  background-image:
    linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%),
    linear-gradient(#ccc 100%, transparent 0);

  background-size:
    20% 100%,
    /* animation */
    100% 220px,
    /* Image */
    90% 28px,
    /* title */
    50% 28px,
    /* data */
    90% 55px,
    /* date */
    100% 100%;
  /* card bg */

  background-position:
    -150% 0,
    /*animation*/
    0 0,
    /* Image */
    15px 240px,
    /* title */
    15px 288px,
    /* data */
    15px 328px,
    /* date */
    0 0
    /* card */
  ;

  background-repeat: no-repeat;
  animation: loadingAIDS 1.5s infinite;
}

@keyframes loadingAIDS {
  to {
    background-position:
      350% 0,
      0 0,
      /* Image */
      15px 240px,
      /* title */
      15px 288px,
      /* data */
      15px 328px,
      /* date */
      0 0;
  }
}</style>