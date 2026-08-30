const popup = document.querySelector('.add-modal-card');
const openModal = document.querySelector('#addPopup');
const closeModal = document.querySelector('#closePopup');
openModal === null || openModal === void 0 ? void 0 : openModal.addEventListener('click', () => {
    popup === null || popup === void 0 ? void 0 : popup.classList.add('show');
});
closeModal === null || closeModal === void 0 ? void 0 : closeModal.addEventListener('click', () => {
    popup === null || popup === void 0 ? void 0 : popup.classList.remove('show');
});
export {};
//# sourceMappingURL=sandbox.js.map