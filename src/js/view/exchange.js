import axios from 'axios';

const country = {
  미국: ['USD', '달러'],
  일본: ['JPY', '100엔'],
  유럽연합: ['EUR', '유로'],
  중국: ['CNY', '위안'],
  홍콩: ['HKD', '달러'],
  태국: ['THB', '바트'],
  대만: ['TWD', '달러'],
  필리핀: ['PHP', '페소'],
  싱가포르: ['SGD', '달러'],
  호주: ['AUD', '달러'],
  베트남: ['VND', '100동'],
  영국: ['GBP', '파운드'],
  캐나다: ['CAD', '달러'],
  말레이시아: ['MYR', '링기트'],
  러시아: ['RUB', '루블'],
  남아공화국: ['ZAR', '랜드'],
  노르웨이: ['NOK', '크로나'],
  뉴질랜드: ['NZD', '달러'],
  덴마크: ['DKK', '크로나'],
  멕시코: ['MXN', '페소'],
  몽골: ['MNT', '투그릭'],
  바레인: ['BHD', '디나르'],
  방글라데시: ['BDT', '타카'],
  브라질: ['BRL', '헤알'],
  브루나이: ['BND', '달러'],
  사우디아라비아: ['SAR', '리얄'],
  스리랑카: ['LKR', '루피'],
  스웨덴: ['SEK', '크로나'],
  스위스: ['CHF', '프랑'],
  아랍에미리트공화국: ['AED', '디르함'],
  알제리: ['DZD', '디나르'],
  오만: ['OMR', '리얄'],
  요르단: ['JOD', '디나르'],
  이스라엘: ['ILS', '셰켈'],
  이집트: ['EGP', '파운드'],
  인도: ['INR', '루피'],
  인도네시아: ['IDR', '100루피아'],
  체코: ['CZK', '코루나'],
  칠레: ['CLP', '페소'],
  카자흐스탄: ['KZT', '텡게'],
  카타르: ['QAR', '리얄'],
  케냐: ['KES', '실링'],
  콜롬비아: ['COP', '페소'],
  쿠웨이트: ['KWD', '디나르'],
  탄자니아: ['TZS', '실링'],
  터키: ['TRY', '리라'],
  파키스탄: ['PKR', '루피'],
  폴란드: ['PLN', '즈워티'],
  헝가리: ['HUF', '포린트'],
};

const beforeCountry = document.querySelector('.exchange__section--before--countryinput');
const beforeMoney = document.querySelector('.exchange__section--before--moneyinput');
const exchangeBeforeUnit = document.querySelector('.exchange__section--before--unit');
const afterMoney = document.querySelector('.exchange__section--after--moneyinput');
const hotplaceWrap = document.querySelectorAll('.exchange__hotplace--detail--wrap');

const invertExchangeRender = async (money, inCountry) => {
  const apiURL = `https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRW${country[inCountry][0]}`;
  try {
    const response = await axios.get(apiURL);
    const exchangeMoney = money / response.data[0].basePrice;
    console.log(exchangeMoney);
    return exchangeMoney;
  } catch (error) {
    console.log(error);
  }
};

const exchangeRender = async () => {
  const apiURL = `https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRW${country[beforeCountry.value][0]}`;
  try {
    const response = await axios.get(apiURL);
    afterMoney.value = (beforeMoney.value * response.data[0].basePrice).toFixed(2);
    // exchangeBeforeUnit.textContent = response.data[0].currencyName || country[beforeCountry.value][1];
    exchangeBeforeUnit.textContent = country[beforeCountry.value][1];
  } catch (error) {
    console.log(error);
  }
};

const hotplaceRender = () => {
  [...hotplaceWrap].forEach(async el => {
    const hotplaceCountry = el.querySelector('.exchange__hotplace--detail--country');
    const hotplaceMoney = el.querySelector('.exchange__hotplace--detail--money');
    const hotplaceRatio = el.querySelector('.exchange__hotplace--detail--ratio');

    const apiURL = `https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRW${
      country[hotplaceCountry.innerText][0]
    }`;

    try {
      const response = await axios.get(apiURL);
      hotplaceMoney.textContent = response.data[0].basePrice.toFixed(2);
      // 양수라면 앞에 + 붙이고 class 빨간색 붙이고
      const option = response.data[0].signedChangeRate > 0 ? '+' : '';

      response.data[0].signedChangeRate > 0
        ? hotplaceRatio.classList.toggle('exchange__ratio--red')
        : hotplaceRatio.classList.toggle('exchange__ratio--blue');

      hotplaceMoney.textContent = response.data[0].basePrice.toFixed(2);
      hotplaceRatio.textContent = option + (response.data[0].signedChangeRate * 100).toFixed(2) + '%';
    } catch (error) {
      console.log(error);
    }
  });
};

export { country, beforeCountry, beforeMoney, invertExchangeRender, exchangeRender, hotplaceRender };
