export default function toMinutes({ hours, minutes, seconds }: any) {
  let total = 0;
  if (hours) {
    total += hours * 60;
  }
  if (minutes) {
    total += minutes;
  }
  if (seconds) {
    total += seconds / 60;
  }
  return total;
}
