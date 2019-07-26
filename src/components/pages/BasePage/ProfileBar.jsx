import React from 'react';
import Spacing from './Spacing';
import { PageWidthContainer } from './Grid';
import Image from './Image';
import Currency from './Currency';
import Help from './Help';
import NetWorth from './NetWorth';

const Stat = ({ label, children, primary }) => (
  <React.Fragment>
    <span>{label}</span>&nbsp;
    <strong
      style={{
        color: '#ffd32a',
      }}
    >
      {children}
    </strong>
  </React.Fragment>
);

const ProfileBar = ({ age, cash, debt, pouchSpaceUsed, pouchLimit }) => (
  <header
    style={{
      padding: '0',
      backgroundColor: 'rgba(72, 84, 96,1.0)',
    }}
  >
    <PageWidthContainer>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          color: '#d2dae2',
        }}
      >
        {/*
        <Spacing right={1}>

        <Image
          src="https://www.searchpng.com/wp-content/uploads/2019/02/Deafult-Profile-Pitcher.png"
          height="2rem"
          width="2rem"
        />
        </Spacing>
                  */}

        <Spacing right={1}>
          <Stat label="Net worth">
            <Currency n={cash - debt} />
            <Help>
              <NetWorth cash={cash} debt={debt} />
            </Help>
          </Stat>
        </Spacing>

        <Spacing right={1}>
          <Stat label="Items">
            <Currency n={pouchSpaceUsed} hidePrefix /> / <Currency hidePrefix n={pouchLimit} />
          </Stat>
        </Spacing>

        <Stat label="Age">
          {Math.floor(age)}
          <Help>
            <div style={{ color: '#000' }}>Try to become a billionaire before you pass away!</div>
          </Help>
        </Stat>
      </div>
    </PageWidthContainer>
  </header>
);

export default ProfileBar;
