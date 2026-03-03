class DevJobsAvatar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  render() {
    const service = this.getAttribute("service") ?? "github";
    const size = this.getAttribute("size") ?? "24";
    const username = this.getAttribute("username") ?? "midudev";
    this.shadowRoot.innerHTML = `
    <style>
        img { 
            border-radius:100%;
            width: ${size}px;
            heigth: ${size}px;
        }
    </style>
    <img src="${this.createUrl(service, username)}" alt="avatar de ${username}" />`;
  }

  createUrl(service, username) {
    return `https://unavatar.io/${service}/${username}`;
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("devjobs-avatar", DevJobsAvatar);
