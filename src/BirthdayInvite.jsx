import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import Confetti from 'react-confetti';

// Sound effects with error handling
const playSound = (sound) => {
  try {
    sound.currentTime = 0;
    sound.play().catch(err => console.log('Sound play failed:', err));
  } catch (err) {
    console.log('Sound error:', err);
  }
};

const coinSound = new Audio('/sounds/coin.mp3');
const selectSound = new Audio('/sounds/select.mp3');
const startSound = new Audio('/sounds/start.mp3');
const backgroundMusic = new Audio('/sounds/arcade-background.mp3');
backgroundMusic.loop = true;

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
  overflow: hidden;
  position: relative;
  font-family: 'Press Start 2P', cursive;
`;

const ArcadeScreen = styled(motion.div)`
  width: 90vw;
  height: 80vh;
  max-width: 1200px;
  background: #000;
  border: 20px solid #ff0080;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 50px rgba(255, 0, 128, 0.5);
`;

const ScreenContent = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-align: center;
  padding: 20px;
`;

const Title = styled(motion.h1)`
  font-size: clamp(1.5rem, 4vw, 3rem);
  color: #ff0080;
  text-shadow: 0 0 10px #ff0080;
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const InfoBox = styled(motion.div)`
  background: rgba(255, 0, 128, 0.1);
  border: 2px solid #ff0080;
  padding: 20px;
  border-radius: 10px;
  margin: 10px 0;
  width: 80%;
  max-width: 600px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 0, 128, 0.2);
    transform: scale(1.05);
  }
`;

const InfoText = styled.div`
  font-size: clamp(0.8rem, 2vw, 1.2rem);
  color: #fff;
  margin: 5px 0;
`;

const InfoLabel = styled.div`
  font-size: clamp(0.6rem, 1.5vw, 0.9rem);
  color: #ff0080;
  margin-bottom: 5px;
`;

const StartButton = styled(motion.button)`
  background: #ff0080;
  color: white;
  border: none;
  padding: 20px 40px;
  font-size: 1.2rem;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 2rem;
  font-family: 'Press Start 2P', cursive;
  text-transform: uppercase;
  box-shadow: 0 0 20px rgba(255, 0, 128, 0.5);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const GlitchText = styled(motion.span)`
  position: relative;
  display: inline-block;
  animation: glitch 1s infinite;

  @keyframes glitch {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translate(-2px, 2px);
    }
    40% {
      transform: translate(-2px, -2px);
    }
    60% {
      transform: translate(2px, 2px);
    }
    80% {
      transform: translate(2px, -2px);
    }
    100% {
      transform: translate(0);
    }
  }
`;

const Pixel = styled(motion.div)`
  position: absolute;
  width: 4px;
  height: 4px;
  background: #ff0080;
  pointer-events: none;
`;

const Scanline = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 2px;
  background: rgba(255, 0, 128, 0.3);
  pointer-events: none;
  z-index: 10;
`;

const ButtonPress = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 0, 128, 0.3);
  border-radius: inherit;
  pointer-events: none;
`;

const ArcadeGlow = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(255, 0, 128, 0.2) 0%, transparent 70%);
  pointer-events: none;
  z-index: 1;
`;

const Vignette = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.5) 100%);
  pointer-events: none;
  z-index: 2;
`;

const SoundControl = styled(motion.button)`
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(255, 0, 128, 0.2);
  border: 2px solid #ff0080;
  color: #ff0080;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 100;
  font-size: 1.5rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);

  &:hover {
    background: rgba(255, 0, 128, 0.3);
  }
`;

const EasterEgg = styled(motion.div)`
  position: absolute;
  font-size: 2rem;
  cursor: pointer;
  user-select: none;
  z-index: 5;
  filter: drop-shadow(0 0 10px rgba(255, 0, 128, 0.5));
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.2) rotate(10deg);
    filter: drop-shadow(0 0 20px rgba(255, 0, 128, 0.8));
  }
`;

const ScoreDisplay = styled(motion.div)`
  position: fixed;
  top: 20px;
  left: 20px;
  background: rgba(255, 0, 128, 0.2);
  border: 2px solid #ff0080;
  color: #ff0080;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 1rem;
  z-index: 100;
  backdrop-filter: blur(5px);
`;

const BirthdayInvite = () => {
  const [showContent, setShowContent] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [pixels, setPixels] = useState([]);
  const [scanlinePosition, setScanlinePosition] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [buttonPresses, setButtonPresses] = useState([]);
  const [score, setScore] = useState(0);
  const [easterEggs, setEasterEggs] = useState([]);
  const containerRef = useRef(null);

  // Background music control with error handling
  useEffect(() => {
    if (isMusicPlaying) {
      try {
        backgroundMusic.play().catch(err => {
          console.log('Background music play failed:', err);
          setIsMusicPlaying(false);
        });
      } catch (err) {
        console.log('Background music error:', err);
        setIsMusicPlaying(false);
      }
    } else {
      backgroundMusic.pause();
    }
  }, [isMusicPlaying]);

  // Create easter eggs
  useEffect(() => {
    const emojis = ['🎮', '🎲', '🎯', '🎪', '🎨', '🎭', '🎪', '🎯'];
    const eggs = emojis.map((emoji, index) => ({
      id: index,
      emoji,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
    }));
    setEasterEggs(eggs);
  }, []);

  // Create pixel effect
  useEffect(() => {
    const createPixel = () => {
      const pixel = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
      };
      setPixels(prev => [...prev, pixel]);
      setTimeout(() => {
        setPixels(prev => prev.filter(p => p.id !== pixel.id));
      }, 1000);
    };

    const interval = setInterval(createPixel, 100);
    return () => clearInterval(interval);
  }, []);

  // Animate scanline
  useEffect(() => {
    const animateScanline = () => {
      setScanlinePosition(prev => (prev + 1) % 100);
    };

    const interval = setInterval(animateScanline, 50);
    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    playSound(startSound);
    setIsMusicPlaying(true);
    setShowContent(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const handleInfoClick = (type) => {
    playSound(selectSound);
    createButtonPress();
    setScore(prev => prev + 10);
    switch(type) {
      case 'location':
        window.open('https://maps.google.com/?q=129+William+Mundy+Way,+Dartford,+UK');
        break;
      case 'calendar':
        window.open('https://calendar.google.com/calendar/render?action=TEMPLATE&text=Temi%27s+25th+Birthday&dates=20250615T120000Z/20250615T230000Z&location=129+William+Mundy+Way,+Dartford,+UK');
        break;
      case 'share':
        window.open('https://wa.me/?text=Hey!%20I%20just%20got%20invited%20to%20Temi%27s%2025th%20Birthday!%20Are%20you%20going?');
        break;
    }
  };

  const handleHover = () => {
    playSound(coinSound);
  };

  const handleEasterEggClick = (id) => {
    playSound(coinSound);
    setScore(prev => prev + 50);
    setEasterEggs(prev => prev.filter(egg => egg.id !== id));
    createButtonPress();
  };

  const toggleMusic = () => {
    setIsMusicPlaying(prev => !prev);
    playSound(coinSound);
  };

  const createButtonPress = () => {
    const press = {
      id: Date.now(),
      x: Math.random() * 100,
      y: Math.random() * 100,
    };
    setButtonPresses(prev => [...prev, press]);
    setTimeout(() => {
      setButtonPresses(prev => prev.filter(p => p.id !== press.id));
    }, 500);
  };

  return (
    <Container ref={containerRef}>
      <SoundControl
        onClick={toggleMusic}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isMusicPlaying ? '🔊' : '🔇'}
      </SoundControl>

      <ScoreDisplay
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        SCORE: {score}
      </ScoreDisplay>

      <Vignette />
      <ArcadeGlow
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
      {showConfetti && <Confetti />}
      
      {easterEggs.map(egg => (
        <EasterEgg
          key={egg.id}
          initial={{ x: `${egg.x}%`, y: `${egg.y}%`, opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.2 }}
          onClick={() => handleEasterEggClick(egg.id)}
        >
          {egg.emoji}
        </EasterEgg>
      ))}

      {pixels.map(pixel => (
        <Pixel
          key={pixel.id}
          initial={{ x: `${pixel.x}%`, y: `${pixel.y}%`, opacity: 1 }}
          animate={{
            y: `${pixel.y + 20}%`,
            opacity: 0,
          }}
          transition={{ duration: 1 }}
          style={{
            width: pixel.size,
            height: pixel.size,
          }}
        />
      ))}

      {buttonPresses.map(press => (
        <ButtonPress
          key={press.id}
          initial={{ 
            x: `${press.x}%`, 
            y: `${press.y}%`,
            scale: 0,
            opacity: 0.5
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0.5, 0, 0],
          }}
          transition={{ duration: 0.5 }}
        />
      ))}

      <Scanline
        style={{ top: `${scanlinePosition}%` }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
      />
      
      <ArcadeScreen
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ScreenContent>
          <AnimatePresence>
            {!showContent ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Title>
                  <GlitchText>INSERT COIN</GlitchText>
                  <br />
                  TO START THE PARTY!
                </Title>
                <StartButton
                  onClick={handleStart}
                  onMouseEnter={handleHover}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 0 30px rgba(255, 0, 128, 0.8)"
                  }}
                  whileTap={{ 
                    scale: 0.9,
                    boxShadow: "0 0 10px rgba(255, 0, 128, 0.4)"
                  }}
                >
                  START GAME
                </StartButton>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Title>
                  <GlitchText>TEMI'S 25TH</GlitchText>
                  <br />
                  BIRTHDAY PARTY
                </Title>

                <InfoBox 
                  onClick={() => handleInfoClick('location')}
                  onMouseEnter={handleHover}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(255, 0, 128, 0.5)"
                  }}
                  whileTap={{ 
                    scale: 0.95,
                    boxShadow: "0 0 10px rgba(255, 0, 128, 0.3)"
                  }}
                >
                  <InfoLabel>LOCATION</InfoLabel>
                  <InfoText>129 William Mundy Way, Dartford, UK</InfoText>
                </InfoBox>

                <InfoBox 
                  onClick={() => handleInfoClick('calendar')}
                  onMouseEnter={handleHover}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(255, 0, 128, 0.5)"
                  }}
                  whileTap={{ 
                    scale: 0.95,
                    boxShadow: "0 0 10px rgba(255, 0, 128, 0.3)"
                  }}
                >
                  <InfoLabel>DATE & TIME</InfoLabel>
                  <InfoText>June 15th, 2025 at 12:00 PM</InfoText>
                </InfoBox>

                <InfoBox 
                  onClick={() => handleInfoClick('share')}
                  onMouseEnter={handleHover}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(255, 0, 128, 0.5)"
                  }}
                  whileTap={{ 
                    scale: 0.95,
                    boxShadow: "0 0 10px rgba(255, 0, 128, 0.3)"
                  }}
                >
                  <InfoLabel>SHARE WITH FRIENDS</InfoLabel>
                  <InfoText>Click to share on WhatsApp</InfoText>
                </InfoBox>

                <StartButton
                  onClick={() => window.location.reload()}
                  onMouseEnter={handleHover}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 0 30px rgba(255, 0, 128, 0.8)"
                  }}
                  whileTap={{ 
                    scale: 0.9,
                    boxShadow: "0 0 10px rgba(255, 0, 128, 0.4)"
                  }}
                >
                  PLAY AGAIN
                </StartButton>
              </motion.div>
            )}
          </AnimatePresence>
        </ScreenContent>
      </ArcadeScreen>
    </Container>
  );
};

export default BirthdayInvite;
