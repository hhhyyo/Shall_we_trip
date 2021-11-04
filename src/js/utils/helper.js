const parsePeriod = (startDate, endDate) => `${startDate.split('-').join('.')}~${endDate.split('-').join('.')}`;

const searchParam = () => new URLSearchParams(window.location.search).get('tripId');

const getTripStatus = (startDate, endDate) => {
  const today = new Date().getTime();

  return new Date(startDate).getTime() > today ? 1 : today < new Date(endDate).getTime() ? 0 : -1;

  // 시작일이 오늘보다 나중이면 다가올 여행  (오늘<시작일)
  // 시작일이 오늘보다 전이고 종료일이 오늘보다 나중이면 진행중인 여행 (시작일<오늘&&오늘<종료일)
  // 종료일이 오늘보다 전이면 지난 여행  (종료일<오늘)
};

const getBudgetLabel = tripStatus => (tripStatus === 0 ? '남은 예산' : tripStatus > 0 ? '총 예산' : '사용한 금액');

const getBudgetByLabel = (tripStatus, budget, totalExpense) =>
  tripStatus === 0 ? budget - totalExpense : tripStatus > 0 ? budget : totalExpense;

export { parsePeriod, searchParam, getTripStatus, getBudgetLabel, getBudgetByLabel };
