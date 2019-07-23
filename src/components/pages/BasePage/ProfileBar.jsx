import React from 'react';
import Spacing from './Spacing';
import { PageWidthContainer } from './Grid';
import Image from './Image';

const ProfileBar = () => (
  <header style={{
    padding: '0',
    backgroundColor: 'rgba(72, 84, 96,1.0)',
  }}>
    <PageWidthContainer>
      
        <Image
          src="https://www.searchpng.com/wp-content/uploads/2019/02/Deafult-Profile-Pitcher.png"
          height="2rem"
          width="2rem"
        />
      
    </PageWidthContainer>
  </header>
);

export default ProfileBar;
