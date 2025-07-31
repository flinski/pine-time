export function formatTime(secs: number) {
  const minutes = Math.floor(secs / 60)
  const seconds = Math.floor(secs % 60)

  const formattedMinutes = minutes.toString().padStart(2, '0')
  const formattedSeconds = seconds.toString().padStart(2, '0')

  return `${formattedMinutes} ${formattedSeconds}`
}

export function secsToMins(secs: number) {
  return Math.floor(secs / 60)
}
