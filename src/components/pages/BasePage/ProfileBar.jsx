import React from 'react';
import Spacing from './Spacing';
import { PageWidthContainer } from './Grid';
import Image from './Image';
import Currency from './Currency';
import Help from './Help';
import NetWorth from './NetWorth';
import Button from './Button';

// TODO: styled component
const statLabel = {
  display: 'block',
};

const Stat = ({ label, children, primary }) => (
  <React.Fragment>
    <div style={statLabel}>{label}</div>
    <strong
      style={{
        color: '#ffd32a',
      }}
    >
      {children}
    </strong>
  </React.Fragment>
);

const ProfileBar = ({ onPressQuit, player, age, cash, debt, pouchSpaceUsed, pouchLimit }) => (
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
        <Spacing right={1}>
          <div style={{ border: 'solid #fff 1px' }}>
            <Image src={player.type.image} height="2rem" width="2rem" />
          </div>
        </Spacing>

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

        <Spacing right={1}>
          <Stat label="Age">
            {Math.floor(age)}
            <Help>
              <div style={{ color: '#000' }}>Try to become a billionaire before you pass away!</div>
            </Help>
          </Stat>
        </Spacing>

        <Spacing right={1}>
          <Button muted onClick={onPressQuit}>
            Quit
          </Button>
        </Spacing>
      </div>
    </PageWidthContainer>
  </header>
);

export default ProfileBar;
