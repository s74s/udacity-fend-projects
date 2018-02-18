let tl = new TimelineMax();
    
tl
  .fromTo('.main-header__left', 1.5, { x:-300, opacity: 0 }, { x: 0, opacity: 1})
  .staggerFromTo('.main-nav a', 1.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, 0.25)
  .staggerFromTo('.to-animate', 0.3, { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, 0.2)
  .fromTo('.hero p', 2, { x: 300, opacity: 0 }, { x: 0, opacity: 1 }, '-= 1.5')
  .fromTo('.hero img', 1, { opacity: 0 }, { opacity: 1 })
  .staggerFromTo('.project__preview', 0.5, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, 0.25) 