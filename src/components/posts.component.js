import {Component} from '../core/component'
import {apiService} from '../services/api.service'
import {TransformService} from '../services/transform.service'
import {renderPost} from '../core/templates/post.template'

export class PostsComponent extends Component {
  constructor(id, {loader}) {
    super(id)
    this.loader = loader
  }
  
  init() {
    this.$el.addEventListener('click', buttonHandler.bind(this))
  }
  
  async onShow() {
    this.loader.show()
    const fbData = await apiService.fetchPosts()
    const posts = TransformService.fbObjectToArray(fbData)
    const html = posts.map(post => renderPost(post, {withButton: true})).join(``)
    this.loader.hide()
    this.$el.insertAdjacentHTML('afterbegin', html)
  }
  
  onHide() {
    this.$el.innerHTML = ''
  }
}

function buttonHandler(evt) {
  const $el = evt.target
  const id = $el.dataset.id
  
  if (id) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []
    console.log(favorites)
    
    if (favorites.includes(id)) {
      $el.textContent = 'Сохранить'
      $el.classList.add('button-primary')
      $el.classList.remove('button-danger')
      favorites = favorites.filter(fId => fId !== id)
    } else {
      $el.textContent = 'Удалить'
      favorites.push(id)
      $el.classList.remove('button-primary')
      $el.classList.add('button-danger')
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }
}