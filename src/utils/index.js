export function filterType (text, type) {
  const tmp = type.find((k) => k.value === text)
  return tmp.label
}

export function filterItem (text, type) {
  const item = type.find((k) => k.value === text)
  return item ? item : {
    value: null,
    label: '--',
    color: '#000'
  }
}
