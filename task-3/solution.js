class Templator {
  constructor(template) {
    this._template = template
  }

  compile(ctx) {
    let template = this._template

    while (true) {
      const startingPosition = template.indexOf('{{')
      const finalPosition = template.indexOf('}}')

      if (startingPosition === -1 || finalPosition === -1) {
        break
      }

      const propertyStr = template.slice(startingPosition, finalPosition + 2)
      const propertyName = propertyStr.replace(/\s|{|}/g, '')

      const propertyNames = propertyName.split('.')

      let propertyValue = ctx

      for (let i = 0; i < propertyNames.length; i++) {
        if (!propertyNames[0]) {
          propertyValue = ''
          break
        }

        propertyValue = propertyValue[propertyNames[i]]
      }

      if (typeof propertyValue === 'function') {
        window[propertyName] = propertyValue
        propertyValue = `window.${propertyName}()`
      }

      template = template.replace(propertyStr, propertyValue)
    }

    return template
  }
}

const chatsTmpl = new Templator(`
<!-- Можно внутренность {{}} с пробелами, можно без-->
<ul class="{{ className }}" data-chat-id="{{chat.id}}" onClick="{{handleClick}}">
  {{ items }}
</ul>
`)
const chatsElementTmpl = new Templator(`<li>{{name}}</li>`)

const context = {
  items: [1, 2, 3, 4]
    .map((item) => chatsElementTmpl.compile({ name: item }))
    .join('\n\t'),
  className: 'chat',
  chat: {
    id: 123,
  },
  handleClick: function () {
    console.log(document.querySelector('.chat'))
  },
}

const root = document.querySelector('.root')
root.innerHTML = chatsTmpl.compile(context)
