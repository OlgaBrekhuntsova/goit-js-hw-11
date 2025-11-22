import { getImagesByQuery } from './js/pixabay-api';

import {
  clearGallery,
  createGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';
import iziToast from 'izitoast';

const refs = {
  formEle: document.querySelector('.form'),
};

refs.formEle.addEventListener('submit', e => {
  e.preventDefault();
  clearGallery();

  const query = refs.formEle.elements['search-text'].value.trim();
  if (!query) {
    alertToast.show('noSearchParams');
    return;
  }
  showLoader();
  getImagesByQuery(query)
    .then(data => {
      if (!data.total) {
        alertToast.show('notFound');
      } else {
        createGallery(data.hits);
      }
    })
    .finally(() => {
      hideLoader();
    });
  refs.formEle.reset();
});

refs.formEle.addEventListener('click', e => {
  if (e.target.nodeName === 'INPUT') {
    alertToast.close();
  }
});

export const alertToast = {
  message: {
    noSearchParams: 'Please fill out input field.',
    notFound:
      'Sorry, there are no images matching your search query. Please, try again!',
  },
  show(messageKey) {
    const message = this.message[messageKey]
      ? this.message[messageKey]
      : messageKey;
    iziToast.show({
      message: message,
      position: 'topRight',
      backgroundColor: '#EF4040',
      messageColor: '#ffffff',
      iconUrl: './img/x-octagon.svg',
      timeout: 10000,
      closeOnClick: true,
    });
  },
  close() {
    try {
      iziToast.hide({}, document.querySelector('.iziToast'));
    } catch {}
  },
};
