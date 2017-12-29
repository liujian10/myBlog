/**
 * Created by liujian on 2017/6/12.
 */
const setRem = () => {
  document.documentElement.style.fontSize = document.documentElement.clientWidth * 100 / 1920 + 'px';
};

export const initRem = () => {
  if (window.addEventListener) {
    document.addEventListener('DOMContentLoaded', function () {
      setRem();
    });

    window.addEventListener('load', function () {
      setTimeout(setRem, 300);
    });

    window.addEventListener('resize', function () {
      setTimeout(setRem, 300);
    });
  }
};
