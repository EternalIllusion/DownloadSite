function searchAttach(inputDOM, listDOM) {
  const items = listDOM.querySelectorAll('li');
  function performSearch(query) {
    const queryLower = query.toLowerCase();
    items.forEach((li, index) => {
      const text = li.dataset.index|| li.getAttribute('data-index') || li.textContent.trim() || li.innerHTML.trim(); // 搜索索引数据存储在 data-index 属性中,如果没有则使用innertext
      const textLower = text.toLowerCase();
      //console.log(textLower,queryLower);
      if (textLower.includes(queryLower)) {
        /*const matchIndex = textLower.indexOf(queryLower);
        const beforeMatch = text.slice(0, matchIndex);
        const match = text.slice(matchIndex, matchIndex + queryLower.length);
        const afterMatch = text.slice(matchIndex + queryLower.length);
        console.log(matchIndex,beforeMatch,match,afterMatch);
        const highlightedText = `${beforeMatch}<span style="background-color:#ff0;">${match}</span>${afterMatch}`;
        //li.innerHTML = highlightedText;
        */
        li.style.display = 'list-item'; // 显示元素
      } else {
        li.style.display = 'none'; // 隐藏不匹配的元素
      }
    });
    
  }

  // 监听 inputDOM 的输入事件
  inputDOM.addEventListener('input', (event) => {
    const query = event.target.value;
    performSearch(query);
  });
}

// 使用示例：
// 假设我们有以下 DOM 结构
/*
<input id="searchInput" type="text">
<ul id="itemList">
  <li data-data="Apple">Apple</li>
  <li data-data="Banana">Banana</li>
  <!-- 更多 li 元素 -->
</ul>
*/
// 调用函数
// searchAttach(document.getElementById('searchInput'), document.getElementById('itemList'));