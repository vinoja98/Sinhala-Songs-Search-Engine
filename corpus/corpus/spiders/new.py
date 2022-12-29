import scrapy
from corpus.items import CorpusItem
from mtranslate import translate
import re
import json

def translation_array(stringArray):
    translated_array = []
    for string in stringArray:
        translated_array.append(translate(string, 'si', 'en'))
    return translated_array

class CorpusSpider(scrapy.Spider):
    for i in range(1,11):
        start_urls = ["https://www.sinhalasongbook.com/tag/new-pop/page/"+str(i)+"/"]

        custom_settings = {
            'FEEDS': { 'data.jsonl': { 'format': 'jsonlines',}}
            }
            
        def parse(self, response):

            for article in response.css('article.product_pod'):
                book_item = BookItem(
                    url = article.css("h3 > a::attr(href)").get(),
                    title = article.css("h3 > a::attr(title)").extract_first(),
                    price = article.css(".price_color::text").extract_first(),
                )
                yield book_item