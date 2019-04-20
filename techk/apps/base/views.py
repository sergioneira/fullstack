from django.http import HttpResponse
from bs4 import BeautifulSoup
import requests

def index(request):

    source = requests.get('http://books.toscrape.com/index.html').text
    soup = BeautifulSoup(source, 'lxml')

    print(soup.prettify())

    return HttpResponse('Hello, world!')
