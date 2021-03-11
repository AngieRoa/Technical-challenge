import Home from './components/Home'
import Country from './components/Country'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    props: true,
    meta: {
      title: 'Countries'
    }
  },
  {
    path: '/:country',
    name: 'country-detail',
    component: Country,
    props: true,
    meta: {
      title: 'Country'
    }
  },
]

export default routes