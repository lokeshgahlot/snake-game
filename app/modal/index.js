export default ({header, msg, btnLabel}) => {
  const modal = document.querySelector('#template-modal').cloneNode(true);
  const headerEl = modal.querySelector('.header');
  headerEl.innerHTML = header;
  const msgEl = modal.querySelector('.msg');
  msgEl.innerHTML = msg;
  const btnEl = modal.querySelector('.btn');
  btnEl.innerHTML = btnLabel;
  document.body.appendChild(modal);

  return new Promise( (resolve, reject) => {
      const fn = () => {
        btnEl.removeEventListener('click', fn);
        document.body.removeChild(modal);
        resolve();
      }
      btnEl.addEventListener('click', fn);
    });
}
