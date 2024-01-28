export default function useDateFormatter() {
  const formatDate = (date: Date | string): string => {
    
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };

    const dateObject = new Date(date);
    
    return dateObject.toLocaleDateString(undefined, options);
  };

  return {
    formatDate,
  };
}