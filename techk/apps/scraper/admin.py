# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import Category
from .models import Book

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)

class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'thumbnail', 'stock', 'product_description', 'category', 'upc')

admin.site.register(Category, CategoryAdmin)
admin.site.register(Book, BookAdmin)

