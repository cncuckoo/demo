import './stylus.styl'
import url from './sass.scss'
import './less.less'
import component from './component'

import "react";
import "react-dom";

import { bake } from './shake'
bake()

document.body.appendChild(component())

const req = require.context('./')
console.log(req.id)