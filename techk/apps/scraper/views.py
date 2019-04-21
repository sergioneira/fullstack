# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from rest_framework import viewsets
from .models import Category, Book
from .serializers import CategorySerializer, BookSeralizer

# Create your views here.

class CategoryView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

class BookView(viewsets.ModelViewSet):
    serializer_class = BookSeralizer
    queryset = Book.objects.all()
