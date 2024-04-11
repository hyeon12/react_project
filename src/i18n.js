import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ko from './langs/ko'; // ko/index.js
import en from './langs/en';

const resources = {
  en: {
    translation: en, //위에서 불러온 en (언어파일)
  },
  ko: {
    translation: ko,
  }
};

i18n.use(initReactI18next).init({ //통합시킬 모듈
    resources, // JS 객체의 이름명과 변수명이 동일하면 생략 가능
    lng: navigator.language,
})
