// flex-gallery.js
class FlexGallery {
    constructor(selector, options = {}) {
      this.container = document.querySelector(selector);
      this.options = {
        transitionSpeed: options.transitionSpeed || '0.5s',
        hoverFlex: options.hoverFlex || '4',
        minFlex: options.minFlex || '0.5',
        showTitles: options.showTitles !== undefined ? options.showTitles : true,
        images: options.images || []
      };
      
      this.init();
    }
  
    init() {
      // Aplicar estilos ao container
      this.container.style.cssText = `
        display: flex;
        flex-direction: row;
        min-height: 100vh;
        width: min(1400px, 95vw);
        height: min(1000px, 90vh);
        margin: 0 auto;
        border-radius: 12px;
        overflow: hidden;
      `;
  
      // Criar elementos da galeria
      this.options.images.forEach(image => {
        const item = document.createElement('div');
        item.className = 'flex-gallery-item';
        
        // Configurar estilos do item
        item.style.cssText = `
          flex: ${this.options.minFlex};
          height: 100%;
          position: relative;
          transition: all ${this.options.transitionSpeed} cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          z-index: 0;
        `;
  
        // Adicionar barra preta
        const bar = document.createElement('div');
        bar.style.cssText = `
          position: absolute;
          left: 0;
          top: 0;
          width: 8px;
          height: 100%;
          background-color: #000;
          z-index: 3;
          pointer-events: none;
        `;
        
        // Adicionar imagem
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt || '';
        img.style.cssText = `
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all ${this.options.transitionSpeed} ease-in-out;
          position: relative;
          z-index: 1;
        `;
  
        // Adicionar overlay e texto se showTitles for true
        if (this.options.showTitles) {
          const overlay = document.createElement('div');
          overlay.style.cssText = `
            position: absolute;
            inset: 0;
            background-color: rgba(0, 0, 0, 0.4);
            opacity: 0;
            transition: opacity ${this.options.transitionSpeed} ease;
            z-index: 2;
          `;
  
          const textContainer = document.createElement('div');
          textContainer.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 1.5rem;
            color: white;
            transform: translateY(100%);
            transition: transform ${this.options.transitionSpeed} ease;
            z-index: 3;
          `;
  
          const title = document.createElement('h3');
          title.textContent = image.title || '';
          title.style.cssText = 'font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem;';
  
          const description = document.createElement('p');
          description.textContent = image.description || '';
          description.style.cssText = 'font-size: 0.875rem; opacity: 0.9;';
  
          textContainer.appendChild(title);
          textContainer.appendChild(description);
          item.appendChild(overlay);
          item.appendChild(textContainer);
        }
  
        // Adicionar eventos de hover
        item.addEventListener('mouseenter', () => {
          item.style.flex = this.options.hoverFlex;
          item.style.zIndex = '1';
          if (this.options.showTitles) {
            item.querySelector('div[style*="background-color: rgba(0, 0, 0, 0.4)"]').style.opacity = '1';
            item.querySelector('div[style*="position: absolute; bottom: 0;"]').style.transform = 'translateY(0)';
          }
        });
  
        item.addEventListener('mouseleave', () => {
          item.style.flex = this.options.minFlex;
          item.style.zIndex = '0';
          if (this.options.showTitles) {
            item.querySelector('div[style*="background-color: rgba(0, 0, 0, 0.4)"]').style.opacity = '0';
            item.querySelector('div[style*="position: absolute; bottom: 0;"]').style.transform = 'translateY(100%)';
          }
        });
  
        item.appendChild(bar);
        item.appendChild(img);
        this.container.appendChild(item);
      });
    }
  }