import React from 'react';

export const tabs = [
  {id: 'spend', label: 'Trade' },
  {id: 'travel', label: 'Travel' },
  {id: 'bank', label: 'Bank'}
];

export default class TabMenu extends React.PureComponent {
  render() {
    const { onTabSelected, selectedTabId } = this.props;

    return (
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
    )
  }
}

