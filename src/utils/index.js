// "2023-10-18T01:09:29.089414Z" to "18th October 2023"
function formatDateString(inputDate) {
  const date = new Date(inputDate)
  const day = date.getDate()
  const month = getMonthName(date.getMonth())
  const year = date.getFullYear()

  const dayWithSuffix = day + getDaySuffix(day)

  return `${dayWithSuffix} ${month} ${year}`
}

// "2023-10-28" to "28th October 2023"
function formatDate(inputDate) {
  const [year, month, day] = inputDate.split("-")
  const formattedDay = day + getDaySuffix(day)
  const formattedMonth = getMonthName(parseInt(month) - 1)

  return `${formattedDay} ${formattedMonth} ${year}`
}

function getMonthName(month) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  return months[month]
}

function getDaySuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th"
  }
  switch (day % 10) {
    case 1:
      return "st"
    case 2:
      return "nd"
    case 3:
      return "rd"
    default:
      return "th"
  }
}

function getDateDaysFromNow(daysFromNow) {
  const currentDate = new Date()
  const targetDate = new Date(currentDate)
  targetDate.setDate(currentDate.getDate() + daysFromNow)
  const year = targetDate.getFullYear()
  const month = (targetDate.getMonth() + 1).toString().padStart(2, "0")
  const day = targetDate.getDate().toString().padStart(2, "0")
  return `${year}-${month}-${day}`
}

export { formatDateString, formatDate, getDateDaysFromNow }
