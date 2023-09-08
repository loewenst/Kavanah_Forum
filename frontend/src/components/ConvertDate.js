const convertDate = (utcDate) => {
  const dateObject = new Date(utcDate)
  const date = dateObject.toLocaleDateString()
  return date
}

export default convertDate
