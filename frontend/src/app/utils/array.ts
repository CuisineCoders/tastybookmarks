export function moveItem<T>(array: Array<T>, fromIndex: number, toIndex: number): Array<T> {
  if (fromIndex === toIndex) {
    return array.slice();
  }

  const newArray = array.slice();
  const [movedItem] = newArray.splice(fromIndex, 1);
  newArray.splice(toIndex, 0, movedItem);

  return newArray;
}