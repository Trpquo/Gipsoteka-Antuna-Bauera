import { visit } from 'unist-util-visit'

function transformer(ast) {
    visit(ast, 'image', visitor)
  
    function visitor(node) {
      const src = node.url
      const title = node.title
      const alt = node.alt

      const newNode = {
          type: 'html',
          value: `<figure>
            <img src=${src} alt="${alt}" title="${title}" />
            <figcaption>${alt}</figcaption>
          </figure>`
      }
    
      Object.assign(node, newNode)
    }
  }
  
  function images() {
    return transformer
  }
  
  export default images