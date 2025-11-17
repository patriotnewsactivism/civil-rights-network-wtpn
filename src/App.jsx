import React, { useState } from 'react';
import { Search, FileText, MessageCircle, MapPin, Shield, Users, Clock, Database, Upload } from 'lucide-react';
import './App.css';
import UltimateDashboard from './components/UltimateDashboard.jsx';
import EnhancedInteractive3DMap from './components/EnhancedInteractive3DMap.jsx';
import EnhancedResourcesAndLaws from './components/EnhancedResourcesAndLaws.jsx';
import AILegalAssistant from './components/AILegalAssistant.jsx';
import EnhancedRealTimeDashboard from './components/EnhancedRealTimeDashboard.jsx';
import EnhancedFOIARequestTool from './components/EnhancedFOIARequestTool.jsx';
import PoliceAccountabilityDatabase from './components/PoliceAccountabilityDatabase.jsx';
import InvestigativeJournalismSuite from './components/InvestigativeJournalismSuite.jsx';

const App = () => {
  const [activeTab, setActiveTab] = useState('ultimate');

  const tabs = [
    { id: 'ultimate', label: 'Ultimate Dashboard', icon: Shield },
    { id: 'accountability', label: 'Police Accountability', icon: Database },
    { id: 'journalism', label: 'Investigative Tools', icon: Upload },
    { id: 'foia', label: 'FOIA Requests', icon: FileText },
    { id: 'dashboard', label: 'Real-Time Monitor', icon: Clock },
    { id: 'map', label: 'Interactive Map', icon: MapPin },
    { id: 'ai', label: 'AI Legal Assistant', icon: MessageCircle },
    { id: 'resources', label: 'Resources & Laws', icon: Search }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'ultimate':
        return <UltimateDashboard />;
      case 'accountability':
        return <PoliceAccountabilityDatabase />;
      case 'journalism':
        return <InvestigativeJournalismSuite />;
      case 'foia':
        return <EnhancedFOIARequestTool />;
      case 'dashboard':
        return <EnhancedRealTimeDashboard />;
      case 'map':
        return <EnhancedInteractive3DMap />;
      case 'ai':
        return <AILegalAssistant />;
      case 'resources':
        return <EnhancedResourcesAndLaws />;
      default:
        return <UltimateDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">Civil Rights Tool</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Empowering Communities</span>
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              Empowering citizens with knowledge and tools to protect their civil rights.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Built for investigative journalism and community advocacy.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
