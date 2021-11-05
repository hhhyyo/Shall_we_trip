import { parsePeriod, getTripStatus, getBudgetLabel, getBudgetByLabel } from '../utils/helper';

const $nickname = document.querySelector('.trips-container__title>b');
const $inprogressTrip = document.querySelector('.inprogress-trip');
const $upcomingTrip = document.querySelector('.upcoming-trip');
const $lastTrip = document.querySelector('.last-trip');

const getTripsInfo = trips =>
  trips.map(({ tripId, title, budget, cashTotal, cardTotal, currency, startDate, endDate }) => {
    const tripStatus = getTripStatus(startDate, endDate);
    const totalExpense = cashTotal + cardTotal;
    const tripsItemHtml = `
          <li class="trips-item">
            <a href="/trip-expense?tripId=${tripId}">
              <div class="trips-item__bg">
                <h4 class="trips-item__title">${title}</h4>
                <div class="trips-item__content">
                  <div>${parsePeriod(startDate, endDate)}</div>
                  <div>
                    ${getBudgetLabel(tripStatus)} 
                    <b>${getBudgetByLabel(tripStatus, budget, totalExpense)} ${currency}</b>
                  </div>
                </div>
              </div>
            </a>
          </li>`;

    return [tripStatus, tripsItemHtml];
  });

const renderTripList = trips => {
  const tripsInfo = getTripsInfo(trips);
  let inprogressList = [];
  let upcomingTrip = [];
  let lastTrip = [];

  $nickname.textContent = localStorage.getItem('nickname');

  tripsInfo.forEach(([tripStatus, tripsItemHtml]) => {
    if (tripStatus === 0) {
      inprogressList = [...inprogressList, tripsItemHtml];
    } else if (tripStatus > 0) {
      upcomingTrip = [...upcomingTrip, tripsItemHtml];
    } else {
      lastTrip = [...lastTrip, tripsItemHtml];
    }
  });

  if (inprogressList.length > 0) {
    $inprogressTrip.innerHTML = inprogressList.join('');
  } else {
    $inprogressTrip.innerHTML = '<li class="trips-item empty active">여행을 추가해주세요.</li>';
  }

  if (upcomingTrip.length > 0) {
    $upcomingTrip.innerHTML = upcomingTrip.join('');
  } else {
    $upcomingTrip.innerHTML = '<li class="trips-item empty active">여행을 추가해주세요.</li>';
  }

  if (lastTrip.length > 0) {
    $lastTrip.innerHTML = lastTrip.join('');
  } else {
    $lastTrip.innerHTML = '<li class="trips-item empty active">여행을 추가해주세요.</li>';
  }
};

export default {
  renderTripList,
};
