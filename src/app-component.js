import { LitElement, html } from 'lit-element'
import marvelFetch from './marvelFetch'

export class AppComponent extends LitElement {
  static get properties() {
    return {
      characters: { type: Array },
      numberOfCharacters: { type: Number },
    }
  }
  constructor() {
    super()
    this.characters = []
    this.__getCharacters()
  }
  async __getCharacters() {
    const characterData = await marvelFetch()
    console.log(characterData)
    this.numberOfCharacters = characterData.data.total
    this.characters = characterData.data.results.map(character => ({
      name: character.name,
      url: character.resourceURI,
      imageUrl: `${character.thumbnail.path}.${character.thumbnail.extension}`
    }))
  }
  __renderCharacters() {
    return html`
      <ul>
        ${this.characters.map(character => html`
        <li>
          <a href=${character.url}>${character.name}</a>
          <img src=${character.imageUrl}>
        </li>
        `)}
      </ul>
    `
  }
  render() {
    return html`
      <h1>Concurrent JavaScript</h1>
      <p>Let's render Marvel characters using concurrent JavaScript</p>
      <p>Number of Marvel characters: ${this.numberOfCharacters}</p>
      ${this.characters.length !== 0 ? this.__renderCharacters() : null}
    `
  }
}

window.customElements.define('app-component', AppComponent)