# Sinhala-Songs-Search-Engine
This project is to build a Text Corpus and a Search Application

## Introduction
The search engine will be developed to search about *Sinhala songs in the new pop genre*. The seach engine will be developed using the **ElasticSearch** framework.

## Building Corpus
- Install scrapy using `pip install Scrapy` and run `pip install Twisted==22.8.0`
- Refer https://docs.scrapy.org/en/latest/intro/tutorial.html to set up a new scrapy project.
- Go to corpus directory & Run `scrapy crawl songs -O data.json` to store the scraped data in json format(& in unicode).
- Go to corpus/corpus directory & Run `python3 -m unicode_converter` to convert unicode to Sinhala characters.

## Indexing
- Use POST songs and add content in search/tokenize.json in Kibana Console to create index
- Use POST _bulk and add content in corpus/song1.txt to add documents to the index

## Main functions of the system
- **Full Text Search**\
    Search a song by name of the artist\
    Example - සුනිල් එදිරිසිංහ ගැයු ගීත, සුනිල් එදිරිසිංහ කිව් ගී
- **Faceted Search**\
    Filter search results based on the music composer and the lyricist
- **Sort by Views**

![search](/images/search.png)
