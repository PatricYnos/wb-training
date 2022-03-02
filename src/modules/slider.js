import Swiper, {
  Navigation,
  Autoplay
} from 'swiper';

export const slider = () => {
  const swiper = new Swiper('.swiper-container', {
    loop: true,
    modules: [Navigation, Autoplay],
    autoplay: {
      delay: 3000
    },
    // Navigation arrows
    navigation: {
      nextEl: '.slider-button-next',
      prevEl: '.slider-button-prev',
    },
  });
};