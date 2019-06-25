self.onmessage = ({data: {text}}) => {
  setTimeout(_=>{
    self.postMessage({text: text + text})
  },3000)
  
}