import {Component} from '../core/component'

export class NavigationComponent extends Component {
  constructor(id) {
    super(id)
    
    this.tabs = []
  }
  
  init() {
    this.$el.addEventListener('click', tabClickHandler.bind(this))
  }
  
  registerTabs(tabs) {
    this.tabs = tabs
  }
}

function tabClickHandler(evt) {
  evt.preventDefault()
  if (evt.target.classList.contains('tab')) {
    Array.from(this.$el.querySelectorAll('.tab'))
      .forEach(tab => tab.classList.remove('active'))
    evt.target.classList.add('active')
    
    const activeTab = this.tabs.find(t => t.name === evt.target.dataset.name)
    this.tabs.forEach(tab => tab.component.hide())
    activeTab.component.show()
  }
}