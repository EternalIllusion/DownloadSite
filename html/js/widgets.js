
/* Search Widget */

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
*/
// searchAttach(document.getElementById('searchInput'), document.getElementById('itemList'));

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

function closesub(id='nav-sidebar-sub') {
    var sidebar = document.getElementById(id);
    sidebar.classList.add('nav-sidebar-collapsed');
    sidebar.style.width = '0px'; // 确保边栏完全收起
}

