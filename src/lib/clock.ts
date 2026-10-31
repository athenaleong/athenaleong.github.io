const sanFranciscoTime = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    month: 'short',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
});

export function formatSanFranciscoTime(date: Date, includeDate = true) {
    const parts = Object.fromEntries(sanFranciscoTime.formatToParts(date).map(part => [part.type, part.value]));
    const time = `${parts.hour}:${parts.minute}${parts.dayPeriod}`;
    return includeDate ? `${parts.month} ${parts.day} ${time}` : time;
}
