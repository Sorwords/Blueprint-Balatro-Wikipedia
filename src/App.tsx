import { useState } from 'react';
import Balatro from './components/BalatroBackground/balatroBackground';
import Navbar from './components/Navbar';
import MusicPlayer from './components/MusicPlayer';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import JokersPage from './pages/JokersPage';
import TarotPage from './pages/TarotPage';
import PlanetPage from './pages/PlanetPage';
import SpectralPage from './pages/SpectralPage';
import VouchersPage from './pages/VouchersPage';
import BlindsPage from './pages/BlindsPage';
import EnhancementsPage from './pages/EnhancementsPage';
import EditionsPage from './pages/EditionsPage';
import CalculatorPage from './pages/CalculatorPage';
import AchievementsPage from './pages/AchievementsPage';
import SynergyPage from './pages/SynergyPage';
import BlindCalculatorPage from './pages/BlindCalculatorPage';

type Page = 'home' | 'jokers' | 'tarot' | 'planets' | 'spectral' | 'vouchers' | 'blinds' | 'enhancements' | 'editions' | 'calculator' | 'achievements' | 'synergy' | 'blindcalc';

export default function App() {
  const [page, setPage] = useState<Page>('home');

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage onNavigate={setPage} />;
      case 'jokers': return <JokersPage />;
      case 'tarot': return <TarotPage />;
      case 'planets': return <PlanetPage />;
      case 'spectral': return <SpectralPage />;
      case 'vouchers': return <VouchersPage />;
      case 'blinds': return <BlindsPage />;
      case 'enhancements': return <EnhancementsPage />;
      case 'editions': return <EditionsPage />;
      case 'calculator': return <CalculatorPage />;
      case 'achievements': return <AchievementsPage />;
      case 'synergy': return <SynergyPage />;
      case 'blindcalc': return <BlindCalculatorPage />;
      default: return <HomePage onNavigate={setPage} />;
    }
  };

  return (
    <div className="app-layout">
      <div className="balatro-bg">
        <Balatro
          color1="#1a0f00"
          color2="#0a0800"
          color3="#0f0b00"
          contrast={3.0}
          lighting={0.4}
          spinSpeed={4.0}
          spinAmount={0.15}
          pixelFilter={500}
          mouseInteraction={true}
        />
      </div>
      <Navbar currentPage={page} onNavigate={setPage} />
      <main className="main-content">
        {renderPage()}
        <Footer />
      </main>
      <MusicPlayer />
    </div>
  );
}
