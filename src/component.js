import Worker from "worker-loader!./worker"

export default (text = TO_BE_REPLACED) => {  
  const el = document.createElement('div')
  const worker = new Worker()
  const state = {text: 'foo'}
console.log(worker)
  worker.addEventListener('message', ({data: {text}}) => {
    state.text = text
    el.innerHTML = text
  })

  el.innerHTML = state.text
  el.onclick = () => worker.postMessage({text: state.text})
  // el.onclick = () => import('./lazy').then(lazy => {
  //   el.textContent = lazy.default.text
  // }).catch(err => console.log(err))
  return el
}