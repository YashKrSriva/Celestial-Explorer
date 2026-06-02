import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Camera, Asterisk } from 'lucide-react';
import { SpaceCard } from './components/SpaceCard';
import { APODContent } from './components/APODContent';
import { ISSContent } from './components/ISSContent';
import { NEOContent } from './components/NEOContent';
import { APOD, ISSLocation, NearEarthObject } from './types';
import { ISSIcon } from './components/ISSIcon';

const NASA_API_KEY = 'b4bxneeYmCIgZ2bhfdg9Ginphe4bFAGKl7ppFuM7';

function App() {
  const [selectedCard, setSelectedCard] = useState<'apod' | 'iss' | 'neo'>('apod');
  const [apodData, setApodData] = useState<APOD | null>(null);
  const [issData, setIssData] = useState<ISSLocation | null>(null);
  const [neoData, setNeoData] = useState<NearEarthObject[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        switch (selectedCard) {
          case 'apod':
            const apodResponse = await axios.get<APOD>(
              `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&hd=true`
            );
            setApodData(apodResponse.data);
            break;
          case 'iss':
            const issResponse = await axios.get(
              'https://api.wheretheiss.at/v1/satellites/25544'
            );
            setIssData(issResponse.data);
            break;
          case 'neo':
            const today = new Date().toISOString().split('T')[0];
            const neoResponse = await axios.get(
              `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${NASA_API_KEY}`
            );
            setNeoData(Object.values(neoResponse.data.near_earth_objects)[0] as NearEarthObject[]);
            break;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setIsLoading(false);
    };

    fetchData();

    if (selectedCard === 'iss') {
      const interval = setInterval(fetchData, 5000);
      return () => clearInterval(interval);
    }
  }, [selectedCard]);

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop")'
      }}
    >
      <div className="min-h-screen bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white/90 text-center mb-8 tracking-tight">
            Cosmic Explorer
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <SpaceCard
              title="Picture of the Day"
              icon={<Camera size={24} />}
              isSelected={selectedCard === 'apod'}
              onClick={() => setSelectedCard('apod')}
            />
            <SpaceCard
              title="ISS Tracker"
              icon={<ISSIcon className="w-6 h-6" />}
              isSelected={selectedCard === 'iss'}
              onClick={() => setSelectedCard('iss')}
            />
            <SpaceCard
              title="Near Earth Objects"
              icon={<Asterisk size={24} />}
              isSelected={selectedCard === 'neo'}
              onClick={() => setSelectedCard('neo')}
            />
          </div>

          <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 shadow-2xl">
            {selectedCard === 'apod' && (
              <APODContent data={apodData} isLoading={isLoading} />
            )}
            {selectedCard === 'iss' && (
              <ISSContent data={issData} isLoading={isLoading} />
            )}
            {selectedCard === 'neo' && (
              <NEOContent data={neoData} isLoading={isLoading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;