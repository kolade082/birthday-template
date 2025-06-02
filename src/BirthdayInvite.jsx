// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { FaGlassCheers, FaUtensils, FaTshirt, FaGift } from 'react-icons/fa';
import { MdEvent, MdLocationOn } from 'react-icons/md';

// Import the image using a dynamic import
const Image1 = new URL('./assets/img1.jpeg', import.meta.url).href;
const Image2 = new URL('./assets/img2.jpeg', import.meta.url).href;
const Image3 = new URL('./assets/img3.jpeg', import.meta.url).href;

const BirthdayInvite = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const balloonColors = [
      '#000000', // Black
      '#1A1A1A', // Dark Gray
      '#333333', // Charcoal
      '#4D4D4D', // Dark Silver
      '#666666', // Silver Gray
      '#808080', // Silver
      '#A9A9A9', // Light Silver
      '#C0C0C0', // Bright Silver
      '#D3D3D3', // Light Gray
      '#E8E8E8'  // Platinum
    ];
    
    // Create balloons
    const createBalloon = () => {
      const balloon = document.createElement('div');
      balloon.className = 'balloon';
      balloon.style.left = `${Math.random() * 100}vw`;
      balloon.style.top = `${Math.random() * 100}vh`;
      balloon.style.opacity = '0.9';
      balloon.style.transform = `scale(${Math.random() * 0.2 + 0.9})`;
      balloon.style.background = balloonColors[Math.floor(Math.random() * balloonColors.length)];
      document.body.appendChild(balloon);
      
      // Remove balloon after animation
      balloon.addEventListener('animationend', () => {
        balloon.remove();
      });
    };

    // Create initial balloons
    for (let i = 0; i < 8; i++) {
      setTimeout(() => createBalloon(), i * 200);
    }

    // Create balloons periodically
    const balloonInterval = setInterval(createBalloon, 2000);
    
    // Continuous confetti
    const randomInRange = (min, max) => Math.random() * (max - min) + min;
    
    const interval = setInterval(() => {
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 0,
        particleCount: 15,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#C0C0C0', '#808080', '#FFFFFF', '#A9A9A9', '#D3D3D3']
      });
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 0,
        particleCount: 15,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#C0C0C0', '#808080', '#FFFFFF', '#A9A9A9', '#D3D3D3']
      });
    }, 200);

    return () => {
      clearInterval(interval);
      clearInterval(balloonInterval);
      // Clean up any remaining balloons
      document.querySelectorAll('.balloon').forEach(balloon => balloon.remove());
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.15,
        staggerChildren: 0.01
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.1,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <motion.div 
      className="invite-container"
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.div 
        className="profile-section"
        variants={itemVariants}
      >
        <div className="profile-images">
          <motion.img 
            src={Image2}
            alt="Birthday Person" 
            className="profile-image"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 500, damping: 10 }}
          />
          <motion.img 
            src={Image1}
            alt="Birthday Person" 
            className="profile-image"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 500, damping: 10 }}
          />
          <motion.img 
            src={Image3}
            alt="Birthday Person" 
            className="profile-image"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 500, damping: 10 }}
          />
        </div>
        <motion.h1 
          className="invite-title"
          variants={itemVariants}
        >
          Join Us for a Special Celebration!
        </motion.h1>
        <motion.p 
          className="invite-subtitle"
          variants={itemVariants}
        >
          We're turning 25 and we want you there!
        </motion.p>
      </motion.div>

      <motion.div 
        className="details-section"
        variants={containerVariants}
      >
        <motion.div 
          className="detail-item"
          variants={itemVariants}
          whileHover={{ y: -5 }}
        >
          <div className="detail-image">
            <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=80" alt="Event" />
            <div className="image-overlay"></div>
          </div>
          <div className="detail-content">
            <h3><MdEvent className="icon" /> Let's Party! 🎉</h3>
            <p>Yo! The vibes are gonna be crazy on June 14th! We're turning up at 129 William Mundy Way, DA1 5XQ. Come through and let's make some memories! No boring stuff, just pure fun! 🎊</p>
          </div>
        </motion.div>

        <motion.div 
          className="detail-item"
          variants={itemVariants}
          whileHover={{ y: -5 }}
        >
          <div className="detail-image">
            <img src="https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80" alt="Dinner and Drinks" />
            <div className="image-overlay"></div>
          </div>
          <div className="detail-content">
            <h3><FaUtensils className="icon" /> Food & Drinks Galore! 🍽️</h3>
            <p>Listen up! We've got ALL the good stuff - food, drinks, you name it! Come hungry because we're feeding everyone! No holding back, just eat and drink whatever you see! 🍕🍹</p>
          </div>
        </motion.div>

        <motion.div 
          className="detail-item"
          variants={itemVariants}
          whileHover={{ y: -5 }}
        >
          <div className="detail-image">
            <img src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&auto=format&fit=crop&q=80" alt="Attire" />
            <div className="image-overlay"></div>
          </div>
          <div className="detail-content">
            <h3><FaTshirt className="icon" /> Dress to Impress! ✨</h3>
            <p>Time to shine! Rock your best white and silver outfits! Let's make this party look like a starry night! No boring colors allowed! 💫</p>
          </div>
        </motion.div>

        <motion.div 
          className="detail-item"
          variants={itemVariants}
          whileHover={{ y: -5 }}
        >
          <div className="detail-image">
            <img src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&auto=format&fit=crop&q=80" alt="Gifts" />
            <div className="image-overlay"></div>
          </div>
          <div className="detail-content">
            <h3><FaGift className="icon" /> Just Bring the Vibes! 🎁</h3>
            <p>Your presence is the best present! But hey, if you really want to bring something, we won't say no! 😉 Just come ready to have the time of your life! 🎈</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default BirthdayInvite;
