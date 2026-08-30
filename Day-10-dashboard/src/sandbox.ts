const popup= document.querySelector('.add-modal-card')
const openModal= document.querySelector('#addPopup')
const closeModal= document.querySelector('#closePopup')

openModal?.addEventListener('click', ()=>{
  popup?.classList.add('show')
})
closeModal?.addEventListener('click', ()=>{
  popup?.classList.remove('show')
})