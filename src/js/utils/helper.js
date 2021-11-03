const parsePeriod = (startDate, endDate) => `${startDate.split('-').join('.')}~${endDate.split('-').join('.')}`;

export { parsePeriod };
