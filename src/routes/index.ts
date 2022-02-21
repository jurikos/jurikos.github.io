type BaseRoutes = 'Index' | 'Experience' | 'Projects' | 'Features' | 'Contact';

const BaseRouteDictionary: { [key in BaseRoutes]: string } = {
  Index: '/',
  Experience: '/experience',
  Projects: '/projects',
  Features: '/features',
  Contact: '/contact',
};

export default BaseRouteDictionary;
