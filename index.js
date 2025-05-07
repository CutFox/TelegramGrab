const axios = require('axios');
const cheerio = require('cheerio');

const targetUrl = 'https://food.ru/search?material=recipe&type_meal_ids=195'; // Замените на нужный URL

async function scrapeLinksByClass() {
  try {
    // 1. Загружаем HTML страницы
    const { data } = await axios.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    // 2. Загружаем HTML в cheerio
    const $ = cheerio.load(data);




    
    // 3. Ищем все элементы с классом `card_card__YG0I9` и извлекаем ссылки
    const links = [];
    const headings = [];
    $('.card_card__YG0I9').each((i, element) => {
      const href = $(element).attr('href');
      if (href) {
        links.push({
          href: href.startsWith('http') ? href : new URL(href, targetUrl).href
        });
      }
    });

    $('h3').each((i, element) => {
        headings.push({
          text: $(element).text().trim()
        });
      });

    // 4. Выводим результаты
    console.log(`Найдено ссылок: ${links.length}`);
    // console.log(links);
    // console.log(headings);

    console.log('first', headings[0],links[0])

    // (Опционально) Сохраняем в JSON
    // require('fs').writeFileSync('links.json', JSON.stringify(links, null, 2));

  } catch (error) {
    console.error('Ошибка при парсинге:', error.message);
  }
}

// Запускаем скрипт
scrapeLinksByClass();