import React, { useState } from 'react';
import { ViewTrials } from "./ViewTrials";
import { CreateTrialView } from "./CreateTrialView";
import '../../styles/InvestigatorView.css';

export const InvestigatorView = () => {
  const [view, setView] = useState('viewTrials');

  const handleViewChange = (viewName) => {
    setView(viewName);
  };

  return (
    <>
      <div className="flex min-h-[50vh] investigator-container">
        <div className="sidebar">
          <h2 className="sidebar-title">Investigador Dashboard</h2>
          <ul>
            <li
              className={`sidebar-item ${view === 'viewTrials' ? 'active' : ''}`}
              onClick={() => handleViewChange('viewTrials')}
            >
              Ensayos Clínicos
            </li>
            <li
              className={`sidebar-item ${view === 'createTrialView' ? 'active' : ''}`}
              onClick={() => handleViewChange('createTrialView')}
            >
              Crear Ensayo Clínico
            </li>
          </ul>
        </div>

        <div className="main-content">
          {view === 'viewTrials' && <ViewTrials />}
          {view === 'createTrialView' && <CreateTrialView />}
        </div>
      </div>
    </>
  );
};
