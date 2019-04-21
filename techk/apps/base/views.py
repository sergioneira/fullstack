from django.http import HttpResponse
from bs4 import BeautifulSoup
import requests
from apps.scraper.models import Category
from apps.scraper.models import Book


def index(request):
    charge_books()
    return HttpResponse('Hello, world!')


def charge_books():
    source = requests.get('http://books.toscrape.com/index.html').text

    soup = BeautifulSoup(source, 'lxml')

    list_categories = soup.find('div', class_='side_categories').ul.li.ul

    for category in list_categories.find_all('li'):

        # Category name
        categoryObj = None
        if not Category.objects.filter(name=category.a.text.strip()).exists():
            categoryObj = Category(name=category.a.text.strip())
            categoryObj.save()
        else:
            categoryObj = Category.objects.filter(name=category.a.text.strip()).first()

        review_page = True

        url_page = category.a['href']

        while review_page:

            # Books of the category
            source_two = requests.get('http://books.toscrape.com/' + url_page).text

            soup_two = BeautifulSoup(source_two, 'lxml')

            # the section tag contains all of books
            section = soup_two.section

            # article is equal to book
            for article in section.find_all('article'):

                # detail of the book
                url_article = 'http://books.toscrape.com/catalogue/' + article.h3.a['href'][9:]

                source_three = requests.get(url_article).text
                soup_three = BeautifulSoup(source_three, 'lxml')

                product_main = soup_three.find('div', class_='product_main')

                try:
                    title = product_main.h1.text
                except:
                    title = '------'

                try:
                    stock = product_main.find('p', class_='instock availability').text.strip()
                    stock = stock[stock.find('(') + 1:].split(' ')[0]
                except:
                    stock = 0

                try:
                    price = product_main.find('p', class_='price_color').text[2:]
                except:
                    price = 0

                try:
                    product_description = soup_three.find('div', id='product_description').find_next('p').text
                except:
                    product_description = '------'

                try:
                    thumbnail = product_description[:product_description.find('.') + 1]
                except:
                    thumbnail = '------'

                try:
                    product_information = soup_three.find('table', class_='table')
                    upc = product_information.find('th').find_next('td').text
                except:
                    upc = '------'

                bookObj = None
                if not Book.objects.filter(upc=upc).exists() and categoryObj != None:

                    bookObj = Book(
                        category=categoryObj,
                        price=price,
                        product_description=product_description,
                        stock=stock,
                        title=title,
                        thumbnail=thumbnail,
                        upc=upc
                    )

                    bookObj.save()

            # Looking for a new page
            try:
                aux_array = category.a['href'].split('/')
                aux_array[4] = section.find('li', class_='next').a['href']

                url_page = '/'.join(aux_array)
            except:
                review_page = not review_page