export function renderPost(post, option = {}) {
  const {title, fulltext, date, type, id} = post
  const tag = type === 'news'
    ? `<li class="tag tag-blue tag-rounded">Новость</li>`
    : `<li class="tag tag-rounded">Заметка</li>`
  
  const button = (JSON.parse(localStorage.getItem('favorites')) || [])
  .includes(id)
    ? `<button class="button-round button-small
    button-danger" data-id="${id}">Удалить</button>`
    : `<button class="button-round button-small
    button-primary" data-id="${id}">Сохранить</button>`
  
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