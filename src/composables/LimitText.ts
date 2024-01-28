export default function useStringLimiter() {
  const limitString = (input: string, maxLength: number): string => {
    return input.length > maxLength ? input.slice(0, maxLength) + '...' : input;
  };

  return {
    limitString,
  };
}

// use like

// import useStringLimiter from '@/composables/useStringLimiter';
// const { limitString } = useStringLimiter();

// onMounted(() => {
//   limitedString.value = limitString(originalString.value, 200);
// });

// <p>{{ limitedString }}</p>