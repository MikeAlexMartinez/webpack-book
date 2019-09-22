import React from 'react';
import ReactDOM from 'react-dom';

import component from "./component";
import "purecss";
import "./main.css";

const demoComponent = component("Another");
document.body.appendChild(demoComponent);