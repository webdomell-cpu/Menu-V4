function nowTime() {
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes();
}

function inRange(range) {
  const [start, end] = range;
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);

  const now = nowTime();
  const s = sh*60+sm;
  const e = eh*60+em;

  return s < e ? (now>=s && now<=e) : (now>=s || now<=e);
}

function isVisible(item, settings) {
  if (!item.times) return true;

  const t = settings.times;

  return (
    (item.times.morning && inRange(t.morning)) ||
    (item.times.noon && inRange(t.noon)) ||
    (item.times.evening && inRange(t.evening)) ||
    (item.times.night && inRange(t.night))
  );
}
