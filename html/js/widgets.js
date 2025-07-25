/*              _____                _____                    _____                    _____          
 *             /\    \              /\    \                  /\    \                  /\    \         
 *            /::\    \            /::\    \                /::\    \                /::\    \        
 *           /::::\    \           \:::\    \              /::::\    \              /::::\    \       
 *          /::::::\    \           \:::\    \            /::::::\    \            /::::::\    \      
 *         /:::/\:::\    \           \:::\    \          /:::/\:::\    \          /:::/\:::\    \     
 *        /:::/__\:::\    \           \:::\    \        /:::/__\:::\    \        /:::/  \:::\    \    
 *       /::::\   \:::\    \          /::::\    \       \:::\   \:::\    \      /:::/    \:::\    \   
 *      /::::::\   \:::\    \        /::::::\    \    ___\:::\   \:::\    \    /:::/    / \:::\    \  
 *     /:::/\:::\   \:::\    \      /:::/\:::\    \  /\   \:::\   \:::\    \  /:::/    /   \:::\ ___\ 
 *    /:::/__\:::\   \:::\____\    /:::/  \:::\____\/::\   \:::\   \:::\____\/:::/____/     \:::|    |
 *    \:::\   \:::\   \::/    /   /:::/    \::/    /\:::\   \:::\   \::/    /\:::\    \     /:::|____|
 *     \:::\   \:::\   \/____/   /:::/    / \/____/  \:::\   \:::\   \/____/  \:::\    \   /:::/    / 
 *      \:::\   \:::\    \      /:::/    /            \:::\   \:::\    \       \:::\    \ /:::/    /  
 *       \:::\   \:::\____\    /:::/    /              \:::\   \:::\____\       \:::\    /:::/    /   
 *        \:::\   \::/    /    \::/    /                \:::\  /:::/    /        \:::\  /:::/    /    
 *         \:::\   \/____/      \/____/                  \:::\/:::/    /          \:::\/:::/    /     
 *          \:::\    \                                    \::::::/    /            \::::::/    /      
 *           \:::\____\                                    \::::/    /              \::::/    /       
 *            \::/    /                                     \::/    /                \::/____/        
 *             \/____/                                       \/____/                  ~~ 
 * 
 * EternalIllusion's Download Site - [ETSD]
 * Github.com/EternalIllusion/DownloadSite
 * 
 * A Python library to build a website in one-time generation.
 * Capable for most CI/CD+Pages services such as GitHub & Cloudflare.
 * 
 * Created by EternalIllusion and all codes with [ETSD] sign 
 * are not allowed to upload to GitCode/GitLab/CSDN 
 * or any platform requires login to view contents.
 */

/***
 *      /$$$$$$                                     /$$     
 *     /$$__  $$                                   | $$     
 *    | $$  \__/ /$$$$$$  /$$$$$$  /$$$$$$  /$$$$$$| $$$$$$$
 *    |  $$$$$$ /$$__  $$|____  $$/$$__  $$/$$_____| $$__  $$
 *     \____  $| $$$$$$$$ /$$$$$$| $$  \__| $$     | $$  \ $$
 *     /$$  \ $| $$_____//$$__  $| $$     | $$     | $$  | $$
 *    |  $$$$$$|  $$$$$$|  $$$$$$| $$     |  $$$$$$| $$  | $$
 *     \______/ \_______/\_______|__/      \_______|__/  |__/
 */

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
    this.inputId = this.getAttribute('inputid') || `searchbar-input-${Math.random().toString(16).slice(2)}`;
    this.baseColor = this.getAttribute('color') || '#2c2e31ff'; 
    this.shadowColor = this.getAttribute('shadowcolor') || '#11182726';
    this.defaultText = this.getAttribute('default') || '';
    this.placeholderText = this.getAttribute('placeholder') || 'Search...';
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

function getCookieBool(key,auto=false) {
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

/***
 *      /$$$$$$  /$$       /$$           /$$$$$$$                     
 *     /$$__  $$|__/      | $$          | $$__  $$                    
 *    | $$  \__/ /$$  /$$$$$$$  /$$$$$$ | $$  \ $$  /$$$$$$   /$$$$$$ 
 *    |  $$$$$$ | $$ /$$__  $$ /$$__  $$| $$$$$$$  |____  $$ /$$__  $$
 *     \____  $$| $$| $$  | $$| $$$$$$$$| $$__  $$  /$$$$$$$| $$  \__/
 *     /$$  \ $$| $$| $$  | $$| $$_____/| $$  \ $$ /$$__  $$| $$      
 *    |  $$$$$$/| $$|  $$$$$$$|  $$$$$$$| $$$$$$$/|  $$$$$$$| $$      
 *     \______/ |__/ \_______/ \_______/|_______/  \_______/|__/
 */
/* Sidebar Widget */

function toggleSidebar(id='nav-sidebar',toggleBtn='nav-toggle-button') {
    var sidebar = document.getElementById(id);
    var tbtn = document.getElementById(toggleBtn);
    if (sidebar.classList.contains('nav-sidebar-collapsed')) {
        sidebar.classList.remove('nav-sidebar-collapsed');
        tbtn.classList.remove('nav-sidebar-collapsed-btn');
        setCookieBool('navsidebar',true);
    } else {
        sidebar.classList.add('nav-sidebar-collapsed');
        tbtn.classList.add('nav-sidebar-collapsed-btn');
        closeSidebarSub();
        setCookieBool('navsidebar',false);
    }
    refreshSidebarBtn();
}

function toggleSidebarSub(currentid,id='nav-sidebar-sub',wrapperid='nav-sidebar-sub-wrapper',toggleBtn='nav-toggle-button') {
    var sidebar = document.getElementById(id);
    var parent = document.getElementById(wrapperid);
    var htm = document.getElementById(currentid);
    var tbtn = document.getElementById(toggleBtn);
    if (sidebar.classList.contains('nav-sidebar-collapsed')) {
        sidebar.classList.remove('nav-sidebar-collapsed');
        for (let i = 0; i < parent.children.length; i++) {
            parent.children[i].style.display = "none";
        }
        htm.style.display = "block";
        sidebar.classList.remove('nav-sidebar-collapsed');
        tbtn.classList.remove('nav-sidebar-sub-collapsed-btn');
    } else {
        if (htm.style.display == "none") {
            for (let i = 0; i < parent.children.length; i++) {
                console.log(parent.children[i]);
                parent.children[i].style.display = "none";
            }
            htm.style.display = "block";
        } else {
            sidebar.classList.add('nav-sidebar-collapsed');
            tbtn.classList.add('nav-sidebar-sub-collapsed-btn');
        }
    }
    refreshSidebarBtn();
}

function closeSidebarSub(id='nav-sidebar-sub') {
    var sidebar = document.getElementById(id);
    sidebar.classList.add('nav-sidebar-collapsed');
    refreshSidebarBtn();
}

function refreshSidebarBtn(id='nav-toggle-button',sidebarid='nav-sidebar',sidebarsubid='nav-sidebar-sub') {
    var sidebar = document.getElementById(sidebarid);
    var sidebarsub = document.getElementById(sidebarsubid);
    var tbtn = document.getElementById(id);
    tbtn.classList.toggle('nav-sidebar-collapsed-btn',sidebar.classList.contains('nav-sidebar-collapsed'));
    tbtn.classList.toggle('nav-sidebar-sub-collapsed-btn',sidebarsub.classList.contains('nav-sidebar-collapsed'));
}

document.addEventListener('DOMContentLoaded', () => {refreshSidebarBtn();});

/***
 *     /$$      /$$                              
 *    | $$$    /$$$                              
 *    | $$$$  /$$$$  /$$$$$$  /$$$$$$$  /$$   /$$
 *    | $$ $$/$$ $$ /$$__  $$| $$__  $$| $$  | $$
 *    | $$  $$$| $$| $$$$$$$$| $$  \ $$| $$  | $$
 *    | $$\  $ | $$| $$_____/| $$  | $$| $$  | $$
 *    | $$ \/  | $$|  $$$$$$$| $$  | $$|  $$$$$$/
 *    |__/     |__/ \_______/|__/  |__/ \______/ 
 */
document.addEventListener("DOMContentLoaded", function () {

    var selectors = [
        '.post-content', 
        '.content',
        '.main',
        'body .container',
        'body'
    ];

    var content = null;

    // 根据选择器找到实际的文章内容容器
    for (var i = 0; i < selectors.length; i++) {
        content = document.querySelector(selectors[i]);
        if (content) break;
    }

    // 如果没有找到文章内容容器，则输出错误信息
    if (!content) {
        console.error("目录生成器无法找到内容容器。");
        return;
    }

    var headings = Array.from(content.querySelectorAll('h1, h2, h3, h4, h5, h6')).filter(function (heading) {
        return !heading.closest('#nav-sidebar, #nav-sidebar-sub, .card, .card-gallery');
    });
    
    var tocList = document.querySelector('#nav-sidebar-toc-list');
    tocList.innerHTML = '';

    // 计算目录中最小的标题等级（如h1、h2、h3等）
    let minLevel = 7;
    headings.forEach((heading) => {
        let level = parseInt(heading.tagName.substring(1));
        if (level < minLevel) {
            minLevel = level;
        }
    });
    headings.forEach(function (heading, index) {
        var id = 'nav-menu-heading-' + index;
        heading.id = id;

        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#' + id;
        a.textContent = heading.textContent;
        a.classList.add('nav-object');
        li.appendChild(a);
        var level = parseInt(heading.tagName.substring(1));
        li.style.marginLeft = (level - minLevel) * 0.6 + 'rem';
        tocList.appendChild(li);
    });

    tocList.addEventListener('click', function (event) {
        if (event.target.tagName.toLowerCase() === 'a') {
            event.preventDefault();
            var targetId = event.target.getAttribute('href').substring(1);
            var targetElement = document.getElementById(targetId);

            if (targetElement) {
                // 平滑滚动到目标元素
                window.scrollTo({
                    top: targetElement.offsetTop, 
                    behavior: 'smooth'
                });

                // 更新浏览器历史记录
                history.pushState(null, null, '#' + targetId);
            }
        }
    });

    function highlightCurrentHeading() {
        let currentHeadingId = null;
        const offset = 100;  // 滚动时的偏移量

        // 查找当前视口中的标题
        for (let i = 0; i < headings.length; i++) {
            const rect = headings[i].getBoundingClientRect();
            if (rect.top <= offset) {
                currentHeadingId = headings[i].id;
            } else {
                break;
            }
        }

        // 高亮当前标题的目录项
        tocList.querySelectorAll('a').forEach(function (a) {
            if (a.getAttribute('href').substring(1) === currentHeadingId) {
                a.classList.add('nav-active');
            } else {
                a.classList.remove('nav-active');
            }
        });
    }

    // 监听滚动事件以更新当前高亮的目录项
    window.addEventListener('scroll', highlightCurrentHeading);
    highlightCurrentHeading();  // 初始化高亮

});


//TODO: banner