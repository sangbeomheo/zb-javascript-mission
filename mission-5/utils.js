/* eslint-disable no-undef */
const $ = (selector, target = document) => target.querySelector(selector);

const $All = (selector, target = document) => target.querySelectorAll(selector);

const fetchDataUseAxios = async URL => {
  try {
    const { data } = await axios.get(`${URL}`);
    return data;
  } catch (error) {
    console.log(`axios get 요청 에러: ${error}`);
  }
};

export { $, $All, fetchDataUseAxios };

// dc404426fa584baea40d6dfcac496898
