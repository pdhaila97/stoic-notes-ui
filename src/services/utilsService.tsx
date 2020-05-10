export const timestampToDate = (timestamp: number): string => {
    var date = new Date(timestamp);
    var dateAndTime = date.toLocaleString(undefined, { hour: 'numeric', minute: 'numeric', month: 'short', year: 'numeric', day: 'numeric' });
    return dateAndTime;
}