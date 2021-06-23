import svgs from './svgs'
import buttonProps from './props/button'

export const generalComponents = [
  { name: 'Button', image: svgs.button, ...buttonProps },
  { name: 'Icon', image: svgs.icon }
]

export const layoutComponents = [
  { name: 'Divider', image: svgs.divider },
  { name: 'Grid', image: svgs.grid },
  { name: 'Layout', image: svgs.layout },
  { name: 'Space', image: svgs.space }
]

export const navigationComponents = [
  { name: 'Affix', image: '' },
  { name: 'Breadcrumd', image: '' },
  { name: 'Dropdown', image: '' },
  { name: 'Menu', image: '' },
  { name: 'PageHeader', image: '' },
  { name: 'Pagination', image: '' },
  { name: 'Steps', image: '' }
]

export const componentGroups = [
  { group: 'General', components: generalComponents },
  { group: 'Layout', components: layoutComponents },
  { group: 'Navigation', components: navigationComponents }
]
