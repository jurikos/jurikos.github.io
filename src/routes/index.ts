type BaseRoutes = 'Index' | 'Experience' | 'Projects' | 'Contact';

const BaseRouteDictionary: { [key in BaseRoutes]: string } = {
  Index: '/',
  Experience: '/experience',
  Projects: '/projects',
  Contact: '/contact',
};

export default BaseRouteDictionary;
