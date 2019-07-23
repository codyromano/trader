import React from 'react';
import PlainButton from './PlainButton';
import { PageWidthContainer } from './Grid';


export const tabs = [
  {id: 'spend', label: 'Trade' },
  {id: 'travel', label: 'Travel' },
  {id: 'bank', label: 'Bank'}
];

export default class TabMenu extends React.PureComponent {
  render() {
    const { onTabSelected, selectedTabId } = this.props;

    return (
      <div style={{
        position: 'fixed',
        bottom: '0px',
        left: '0px',
        width: '100%',
        backgroundColor: ' rgba(72, 84, 96,1.0)'
      }}>
        <PageWidthContainer noPadding>
      <ul className="tab-menu">
        {tabs.map(tab => {
          const classList = ['tab-menu-item'];
          if (tab.id === selectedTabId) {
            classList.push('tab-menu-item-selected');
          }
          return (
            <button key={tab.id} onClick={() => onTabSelected(tab)} className={classList.join(' ')}>{tab.label}</button>
          );
        })}
      </ul>
      </PageWidthContainer>
      </div>
    )
  }
}

