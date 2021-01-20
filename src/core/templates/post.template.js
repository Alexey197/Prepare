export function renderPost(post, option = {}) {
  const {title, fulltext, date, type, id} = post
  const tag = type === 'news'
    ? `<li class="tag tag-blue tag-rounded">Новость</li>`
    : `<li class="tag tag-rounded">Заметка</li>`
  
  const favorites = JSON.parse(localStorage.getItem('favorites')) || []
  const candidate = favorites.find(p => p.id === id)
  
  const button = candidate
    ? `<button class="button-round button-small
    button-danger" data-id="${id}" data-title="${title}">Удалить</button>`
    : `<button class="button-round button-small
    button-primary" data-id="${id}"data-title="${title}">Сохранить</button>`
  
  return `
    <div class="panel">
      <div class="panel-head">
        <p class="panel-title">${title}</p>
        <ul class="tags">
          ${tag}
        </ul>
      </div>
      <div class="panel-body">
        <p class="multi-line">${fulltext}</p>
      </div>
      <div class="panel-footer w-panel-footer">
        <small>${date}</small>
        ${option.withButton ? button : ''}
      </div>
    </div>
  `
}