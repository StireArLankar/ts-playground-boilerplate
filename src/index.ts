import { cube } from './lib/math'

import './index.css'

const elem = 3

const init = () => {
  const temp = cube(elem)
  console.log(temp)
  return temp
}

init()
