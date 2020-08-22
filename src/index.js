const $keyword = document.querySelector('.keyword');
const $keywords = document.querySelector('.keywords');
const $searchResults = document.querySelector('.search-results');

$keyword.addEventListener('keyup', e => {
  const { value } = e.target;
  const { key } = e;

  if (value) {
    const recomend = async () => {
      var url = `https://jf3iw5iguk.execute-api.ap-northeast-2.amazonaws.com/dev/api/cats/keywords?q=${value}`;
      return fetch(url).then(function(response) {
        return response.json();
      });
    };

    async function getRecomend() {
      var list = await recomend();
      let result = '';
      if (list) {
        result += `<ul>`;
        result += list.map(a => `<li>${a}</li>`).join('');
        result += `</ul>`;
        $keywords.innerHTML = result;
        $keywords.style.display = 'block';
      }
    }
    getRecomend();
  }

  if (key === 'Enter') {
    const search = async () => {
      return await fetch(
        `https://jf3iw5iguk.execute-api.ap-northeast-2.amazonaws.com/dev/api/cats/search?q=${value}`,
      ).then(res => res.json());
    };

    async function getSearch() {
      const res = await search();
      console.log(res);
      if (res) {
        $searchResults.innerHTML = res.data
          .map(cat => `<article><img src="${cat.url}" /></article>`)
          .join('');
      }
    }

    getSearch();
  }
});

$keywords.addEventListener('click', e => {
  console.log(e);
});
