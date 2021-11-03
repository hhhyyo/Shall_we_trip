const parsePeriod = (startDate, endDate) => `${startDate.split('-').join('.')}~${endDate.split('-').join('.')}`;

const searchParam = () => new URLSearchParams(window.location.search).get('tripId');

export { parsePeriod, searchParam };
