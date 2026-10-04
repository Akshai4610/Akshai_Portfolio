// Add a project here and the grid + pagination update automatically (2 per page).
export const projects = [
  {
    id: 1,
    title: 'Designers Den Outlet',
    type: 'Full-Stack Web Application',
    description: 'An online platform connecting emerging artists with art lovers and collectors, featuring artist profiles and artwork listings.',
    image: '',
    technologies: ['Python', 'SQLite', 'HTML', 'CSS', 'JavaScript'],
    features: [
      'Auction functionality and social media integration to improve engagement and reach',
      'RESTful APIs for communication between frontend and backend',
      'MongoDB for secure storage of user and artwork information',
      'Intuitive, responsive UI focused on engagement and accessibility',
    ],
    github: '',
    demo: '',
  },
  {
    id: 2,
    title: 'Crop Cast',
    type: 'AI/ML Application',
    description: 'A weather-based crop recommendation system that suggests suitable crops from weather and soil parameters.',
    image: '',
    technologies: ['Python', 'Machine Learning', 'FastAPI', 'MongoDB'],
    features: [
      'Analysis of temperature, rainfall, humidity and soil data for data-driven agricultural decisions',
      'Predictive models to improve crop yield forecasting and reduce farming risks',
      'Backend APIs for real-time recommendation generation and data processing',
    ],
    github: 'https://github.com/Akshai4610/Crop-Cast.git', demo: '', image: '/images/Crop_Cast_Image.png',
  },
]
