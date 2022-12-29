# Sinhala-Songs-Search-Engine
This project is to build a Text Corpus and a Search Application

## Introduction
The search engine will be developed to search about *Sinhala songs in the new pop genre*. The seach engine will be developed using the **ElasticSearch** framework.

## Building Corpus
- Go to corpus directory & Run `scrapy crawl songs -O data.json` to store the scraped data in json format(& in unicode).
- Go to corpus/corpus directory & Run `python3 -m unicode_converter` to convert unicode to Sinhala characters.

## Main functions of the system
- Search a song by any of the above fields
- Filter querying
- Range querying
