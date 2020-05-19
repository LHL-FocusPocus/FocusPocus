export default function formatNavbarText(used_quota, allotment) {
  const remaining = used_quota / allotment;
  if (remaining < 0.5) {
    return "You seem to be on track today, keep up the good work!";
  } else if (remaining < 0.8) {
    return "Pace yourself, you're getting close to your browsing cap!";
  } else if (remaining < 1) {
    return "You're almost at the cap for today!";
  } else {
    return "Welp, have fun browsing now!";
  }
}
