// Destroy form popup
export function destroyPopup(formPopup) {
    formPopup.classList.remove('open');
    document.body.classList.add('remove-disable')

    formPopup.remove();
    formPopup = null;
}
  