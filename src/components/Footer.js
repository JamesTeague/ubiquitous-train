import React from 'react';
import { connect } from 'react-redux';

const Footer = () =>
  <footer
    className={'footer'}
  >
    <div className={'container-fluid'}>
      <div
        className={'d-flex justify-content-start flex-wrap'}
      >
        <div
          className={'mr-auto p-2'}
        >
          <small className={'text-muted'}>
            2018 Penguinhouse Technologies
          </small>
        </div>
        <div className={'p-2'}>
          <a href={'mailto:jtteague13@gmail.com'}>
            <small className={'text-muted'}>
              Email support
            </small>
          </a>
        </div>
        <div className={'p-2'}>
          <a
            href={'https://github.com/JamesTeague/ubiquitous-train/issues/new?title=Bug%20Title&body=Bug%20Description&labels=bug'}
            target={'_blank'}
          >
            <small className={'text-muted'}>
              Report a bug
            </small>
          </a>
        </div>
      </div>

    </div>
  </footer>;

export default connect()(Footer)
