import React from 'react';

import nodeIcon from '../assets/nodejs.png';
import reactIcon from '../assets/react.png';
import mongoIcon from '../assets/mongodb.png';
import githubIcon from '../assets/github.png';
import herokuIcon from '../assets/heroku.png';
import igtiIcon from '../assets/igti.png';

const mongodbLink = 'https://www.mongodb.com';
const reactLink = 'https://reactjs.org';
const nodejsLink = 'https://nodejs.org';
const herokuLink = 'https://heroku.com';
const githubLink = 'https://github.com/rscamacho/personalFinance-FinalChallenge-IGTI';
const igtiLink = 'https://www.igti.com.br/custom/bootcamp-desenvolvedor-full-stack/';


export default function Footer() {
  return (
    <div className="row _footer _semi-bold">

      <div className="col s12 m6 l4 _footer">

        <div className="row center">
          <span>
            Com as tecnologias
          </span>
        </div>

        <div className="row center">

          <div className="">
            <a href={nodejsLink} target="_blank" rel="noopener noreferrer">
              <img className="col s4 center _tech-logo" src={nodeIcon} alt="Node js" />
            </a>
          </div>
          <div className="">
            <a href={reactLink} target="_blank" rel="noopener noreferrer">
              <img className="col s4 center" src={reactIcon} alt="React" />
            </a>
          </div>
          <div className="">
            <a href={mongodbLink} target="_blank" rel="noopener noreferrer">
              <img className="col s4 center" src={mongoIcon} alt="MongoDB" />
            </a>
          </div>

        </div>

      </div>

      <div className="col s12 m6 l4 _footer">

        <div className="row center">
          <span>
            Hospedado em
          </span>
        </div>


        <div className="row center">

          <div className="">
            <a href={herokuLink} target="_blank" rel="noopener noreferrer">
              <img className="col s4 offset-s2 center" src={herokuIcon} alt="heroku" />
            </a>
          </div>

          <div className="">
            <a href={githubLink} target="_blank" rel="noopener noreferrer">
              <img className="col s4 offset-s0 center" src={githubIcon} alt="Github" />
            </a>
          </div>

        </div>

      </div>


      <div className="col s12 m6 l4 _footer">

        <div className="row center">
          <span>
            Aprendi com
          </span>
        </div>

        <div className="row center">
          <div className=""></div>
          <a href={igtiLink} target="_blank" rel="noopener noreferrer">
            <img className="col s6 offset-s3 center" src={igtiIcon} alt="IGTI" />
          </a>
        </div>
      </div>

    </div>
  )
}
