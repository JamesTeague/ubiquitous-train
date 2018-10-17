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
          <a
            href={'mailto:incoming+JamesTeague/ubiquitous-train@incoming.gitlab.com'}
          >
            <small className={'text-muted'}>
              Report a bug or suggestion
            </small>
          </a>
        </div>
      </div>

    </div>
  </footer>;

export default connect()(Footer)
