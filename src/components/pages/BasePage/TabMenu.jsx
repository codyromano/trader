import React from 'react';
import PlainButton from './PlainButton';
import { PageWidthContainer } from './Grid';
import { withRouter } from 'react-router-dom';
import { withGameDatabase } from './withDatabase';

export const tabs = [
  { id: 'spend', label: 'Trade' },
  { id: 'work', label: 'Work' },
  { id: 'travel', label: 'Travel' },
  { id: 'bank', label: 'Bank' },
];

const style = {
  position: 'fixed',
  bottom: '0px',
  left: '0px',
  width: '100%',
  display: 'inline-block',
  backgroundColor: ' rgba(72, 84, 96,1.0)',
};

const labelStyle = {
  backgroundColor: 'orange',
  color: '#000',
  display: 'inline-block',
  margin: '0 0 0 0.5em',
  padding: '0.25em',
  borderRadius: '0.35em',
};
const Chip = ({ children }) => <span style={labelStyle}>{children}</span>;

class TabMenu extends React.PureComponent {
  onTabSelected = (tab) => {
    if (typeof this.props.onTabSelected === 'function') {
      this.props.onTabSelected(tab);
    }
    this.props.history.push(`/${tab.id}`);
  };

  render() {
    const badgeCount = {
      work: Object.keys(this.props.databaseValues.player.activeTasks).length,
    };

    return (
      <div style={style}>
        <PageWidthContainer noPadding>
          <ul className="tab-menu">
            {tabs.map((tab) => {
              const classList = ['tab-menu-item'];
              if (window.location.href.includes(tab.id)) {
                classList.push('tab-menu-item-selected');
              }
              return (
                <button
                  key={tab.id}
                  onClick={() => this.onTabSelected(tab)}
                  className={classList.join(' ')}
                >
                  {tab.label}

                  {badgeCount[tab.id] > 0 && <Chip>{badgeCount[tab.id]}</Chip>}
                </button>
              );
            })}
          </ul>
        </PageWidthContainer>
      </div>
    );
  }
}

TabMenu.defaultProps = {
  badgeCount: {},
};

export default withGameDatabase(withRouter(TabMenu), ['player']);
