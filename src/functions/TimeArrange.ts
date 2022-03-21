export interface dependeciesObj {
  [phrase: string]: {
    min: number;
    max: number;
  };
}

export const TimeArrange = (array: dependeciesObj) => {
  const date = new Date().getHours();

  return Object.keys(array).map((obj) => {
    if (date >= array[obj as keyof dependeciesObj].min && date < array[obj as keyof dependeciesObj].max) {
      return obj;
    }
  });
};
