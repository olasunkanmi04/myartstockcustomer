const sideBar = document.querySelector('.side-bar')

document.querySelector('.toggle').onclick = function () {
  this.classList.toggle('active')
  sideBar.classList.toggle('active')
}
