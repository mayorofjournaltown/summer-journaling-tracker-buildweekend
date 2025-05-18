import { useState, useEffect } from 'react';

function App() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timeout;

    if (step >= 8 && step <= 12) {
      timeout = setTimeout(() => {
        setStep(step + 1);
      }, 1000); // 1 second for transition
    }

    if (step >= 21 && step <= 23) {
      timeout = setTimeout(() => {
        setStep(step + 1);
      }, 2000); // 2 seconds for finale
    }

    return () => clearTimeout(timeout);
  }, [step]);

  const screens = [
    {
      image: '/images/summer-start.png',
      heading: 'Summer Journaling Tracker',
      buttons: ['Start with Week One', 'Start with Week Two'],
    },
    ...Array.from({ length: 7 }, (_, i) => ({
      image: `/images/summer-week1-${i + 1}.png`,
      heading: `Week One – Day ${i + 1}`,
      buttons: ["Mark Today's Journaling Complete"],
    })),
    ...Array.from({ length: 6 }, (_, i) => ({
      image: `/images/summer-transition1-${i + 1}.png`,
      heading: 'Congratulations on completing a week of Summer Journaling!',
      buttons: i === 5 ? ['Continue to Week Two'] : [],
    })),
    ...Array.from({ length: 7 }, (_, i) => ({
      image: `/images/summer-week2-${i + 1}.png`,
      heading: `Week Two – Day ${i + 1}`,
      buttons: ["Mark Today's Journaling Complete"],
    })),
    ...Array.from({ length: 4 }, (_, i) => ({
      image: `/images/summer-finale-${i + 1}.png`,
      heading: i === 3 ? 'Congratulations, Journaling Star!' : '',
      buttons: [],
    }))
  ];

  const completedSteps = () => {
    let completed = [];
    if (step >= 1 && step <= 7) {
      for (let i = 1; i < step; i++) {
        completed.push(`✅ Week One – Day ${i} Complete`);
      }
    } else if (step >= 14 && step <= 20) {
      for (let i = 14; i < step; i++) {
        completed.push(`✅ Week Two – Day ${i - 13} Complete`);
      }
    }
    return completed;
  };

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ color: 'black', fontSize: '2rem', marginBottom: '1rem', textAlign: 'center' }}>
        {screens[step].heading}
      </h1>
      <img
        src={screens[step].image}
        alt="Tracker"
        style={{ width: '100%', maxWidth: '720px', height: 'auto' }}
      />
      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
        {screens[step].buttons.map((label, index) => (
          <button
            key={index}
            onClick={() => {
              if (label === 'Start with Week One') setStep(1);
              else if (label === 'Start with Week Two') setStep(14);
              else setStep(step + 1);
            }}
            style={{
              backgroundColor: label.includes('Week One') ? '#4db8ff' :
                               label.includes('Week Two') ? '#4b4ba7' : '#000',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {(step > 0 && !(step >= 8 && step <= 12) && !(step >= 21 && step <= 23)) && (
        <>
          <button
            onClick={() => setStep(0)}
            style={{
              marginTop: '1rem',
              backgroundColor: '#888',
              color: 'white',
              border: 'none',
              padding: '0.6rem 1.2rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Reset Tracker
          </button>

          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            {completedSteps().map((text, index) => (
              <p key={index} style={{ color: 'black', fontSize: '1rem', margin: '0.25rem 0' }}>{text}</p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
