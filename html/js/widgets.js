async function performSearch(query,inputDOM,itemDOM,flags = 'gi') {
  const items = itemDOM.querySelectorAll('li');
  inputDOM.classList.add('search-working');
  const queryLower = query.toLowerCase();
  if(!queryLower.includes(' ')){
    items.forEach((li, index) => {
      const text = (li.dataset.index || li.getAttribute('data-index') || li.textContent || li.innerHTML).trim();
      const textLower = text.toLowerCase();
      while(li.innerHTML.includes('<mark class="highlight">')){li.innerHTML = li.innerHTML.replace('<mark class="highlight">','').replace('</mark>','');}
      if (textLower.includes(queryLower)) {
        if (queryLower.length>0) {
          try {
            const regex = new RegExp(query, flags);
            li.innerHTML = li.innerHTML.replace(/(<[^>]+>)|(&\S{1,4};)|([^<&]+)/gi, function (_, tag, entity, text) {
              //console.log(`${tag} ${entity} ${text}`);
              if (tag) return tag; 
              if (entity) return entity;
              if (!text) return text;
              return text.replace(regex, '<mark class="highlight">$&</mark>');
            });
            inputDOM.classList.remove('search-error');
          } catch (e) {
            inputDOM.classList.add('search-error');
            console.log(`error:${e}`);
          }
        }
        li.style.display = 'list-item';
      } else {
        li.style.display = 'none';
      }
    });
  } else {
    const querykeywords = queryLower.split(' ');
    items.forEach((li, index) => {
      const text = (li.dataset.index || li.getAttribute('data-index') || li.textContent || li.innerHTML).trim();
      const textLower = text.toLowerCase();
      while(li.innerHTML.includes('<mark class="highlight">')){li.innerHTML = li.innerHTML.replace('<mark class="highlight">','').replace('</mark>','');}
      querykeywords.forEach( (kw, index) =>{
        //console.log(kw);
        if (textLower.includes(kw)) {
          if (kw.length>0) {
            try {
              const regex = new RegExp(kw, flags);
              li.innerHTML = li.innerHTML.replace(/(<[^>]+>)|(&\S{1,4};)|([^<&]+)/gi, function (_, tag, entity, text) {
                //console.log(`${tag} ${entity} ${text}`);
                if (tag) return tag; 
                if (entity) return entity;
                if (!text) return text;
                return text.replace(regex, '<mark class="highlight">$&</mark>');
              });
              inputDOM.classList.remove('search-error');
            } catch (e) {
              inputDOM.classList.add('search-error');
              console.log(`error:${e}`);
            }
          }
          li.style.display = 'list-item';
        } else {
          li.style.display = 'none';
        }
      });
    }); 
  }
  inputDOM.classList.remove('search-working');
}

class SearchBar extends HTMLDivElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.target = this.getAttribute('target');
    //console.log(this.getAttribute('target'));
    this.inputId = this.getAttribute('inputid') || `searchbar-input-${Math.random().toString(16).slice(2)}`;
    this.baseColor = this.getAttribute('color') || '#2c2e31ff'; 
    this.shadowColor = this.getAttribute('shadowcolor') || '#11182726';
    this.defaultText = this.getAttribute('default') || '';
    this.placeholderText = this.getAttribute('placeholder') || 'Search...';
    //TODO: 支持多关键词搜索
    this.innerHTML = `<svg style="color:${this.baseColor};height:1.25rem;left:1.25rem;opacity:.6;position:absolute;width:1.25rem;z-index:1;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0"></path></svg><input style="padding:0 .5rem 0 2.5rem !important;width:100%;appearance:none !important;background-color:#f5f5f5;border:none;border-radius:0.75rem;box-shadow:0px -1px 2px ${this.shadowColor};color:${this.baseColor};outline:2px solid transparent !important;min-height:2.25rem !important;font-size:.875rem;line-height:1.25rem;margin:0;padding-block:1px;padding-inline:2px;overflow-clip-margin:0px !important;overflow:clip !important;box-sizing:border-box;" id="${this.inputId}" value="${this.defaultText}" class="searchbar-input" type="text" placeholder="${this.placeholderText}" autocomplete="off">
    `;
    this.inputDOM = this.querySelector('input');
    this.style += "display:flex !important;padding:.25rem .5rem .25rem .5rem;box-sizing:border-box;align-items:center;position:relative;line-height:1.15;display:flex !important;";
    const targetEL = this.target;
    const inputDOMEL = this.inputDOM;
    //console.log(targetEL);
    document.addEventListener('DOMContentLoaded', () => {
      //console.log(targetEL);
      let debounceTimer;
      const targetDOMEL = document.getElementById(targetEL)
      this.inputDOM.addEventListener('input', async (event) => {
        const query = event.target.value;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(async () => {
          await performSearch(query, inputDOMEL, targetDOMEL);
        }, 300);
      });
    });
  }
}

customElements.define('search-bar', SearchBar, { extends: 'div' });


/* Search Widget 
function searchAttach(inputDOM, listDOM) {
  const items = listDOM.querySelectorAll('li');
  function performSearch(query,flags = 'gi') {
    items.forEach((li, index) => {
      const text = (li.dataset.index || li.getAttribute('data-index') || li.textContent || li.innerHTML).trim();
      const queryLower = query.toLowerCase();
      const textLower = text.toLowerCase();
      while(li.innerHTML.includes('<mark class="highlight">')){li.innerHTML = li.innerHTML.replace('<mark class="highlight">','').replace('</mark>','');}
      if (textLower.includes(queryLower)) {
        if (queryLower.length>0) {
          try {
            const regex = new RegExp(query, flags);
            li.innerHTML = li.innerHTML.replace(/(<[^>]+>)|([^<]+)/g, function (_, tag, text) {
              if (tag) return tag; 
              if (!text) return text;
              return text.replace(regex, '<mark class="highlight">$&</mark>');
            });
            inputDOM.classList.remove('search-error');
          } catch (e) {
            inputDOM.classList.add('search-error');
            console.log(`error:${e}`);
          }
        }
        li.style.display = 'list-item';
      } else {
        li.style.display = 'none';
      }
    });
  }
  inputDOM.addEventListener('input', (event) => {
    const query = event.target.value;
    performSearch(query);
  });
}

// 使用示例：
/*
<input id="searchInput" type="text">
<ul id="itemList">
  <li data-data="Apple">Apple</li>
  <li data-data="Banana">Banana</li>
  <li>Cat</li>
  <!-- 更多 li 元素 -->
</ul>
// searchAttach(document.getElementById('searchInput'), document.getElementById('itemList'));
*/

/* Cookie Utils */

function setCookieBool(key,value) {
    var d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    document.cookie = `${key}=${(value ? 'true' : 'false')};expires=${d.toUTCString()};path=/`;
}

function setCookie(key,value) {
    var d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    document.cookie = `${key}=${value};expires=${d.toUTCString()};path=/`;
}

function getCookieBool(key,auto=False) {
    var name = `${key}=`;
    var ca = decodeURIComponent(document.cookie).split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        while (c.charAt(0) == ' ') {c = c.substring(1);}
        if (c.indexOf(name) == 0) {return c.substring(name.length, c.length) === 'true';}
    }
    return auto; // 如果没有找到l项，默认返回False
}

function getCookie(key,auto=null) {
    var name = `${key}=`;
    var ca = decodeURIComponent(document.cookie).split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        while (c.charAt(0) == ' ') {c = c.substring(1);}
        if (c.indexOf(name) == 0) {return c.substring(name.length, c.length);}
    }
    return auto; // 如果没有找到l项，默认返回null
}

/* Sidebar Widget */

function toggleSidebar(id='nav-sidebar',btnid='nav-toggle-button') {
    var sidebar = document.getElementById(id);
    var togbar = document.getElementById(btnid);
    if (sidebar.classList.contains('nav-sidebar-collapsed')) {
        sidebar.classList.remove('nav-sidebar-collapsed');
        togbar.classList.add('nav-sidebar-open');
        sidebar.style.width = '75px'; // 确保边栏展开到完整宽度
        setCol(true);
    } else {
        sidebar.classList.add('nav-sidebar-collapsed');
        togbar.classList.remove('nav-sidebar-open');
        closesub();
        sidebar.style.width = '0px'; // 确保边栏完全收起
        setCol(false); // 旋转展开按钮
    }
}

function toggleSidebarSub(currentid,id='nav-sidebar-sub',wrapperid='nav-sidebar-sub-wrapper') {
    var sidebar = document.getElementById(id);
    var parent = document.getElementById(wrapperid);
    var htm = document.getElementById(currentid);
    if (sidebar.classList.contains('nav-sidebar-collapsed')) {
        sidebar.classList.remove('nav-sidebar-collapsed');
        // 使用 children 遍历所有元素子节点
        for (let i = 0; i < parent.children.length; i++) {
            parent.children[i].style.display = "none";
        }
        htm.style.display = "block";
        sidebar.style.width = '175px'; // 确保边栏展开到完整宽度
    } else {
        if (htm.style.display == "none") {
            for (let i = 0; i < parent.children.length; i++) {
                parent.children[i].style.display = "none";
            }
            htm.style.display = "block";
        } else {
            sidebar.classList.add('nav-sidebar-collapsed');
            sidebar.style.width = '0px'; // 确保边栏完全收起
        }
    }
}

function closeSidebarSub(id='nav-sidebar-sub') {
    var sidebar = document.getElementById(id);
    sidebar.classList.add('nav-sidebar-collapsed');
    sidebar.style.width = '0px'; // 确保边栏完全收起
}

