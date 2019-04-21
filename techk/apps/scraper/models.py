# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name


class Book(models.Model):
    category = models.ForeignKey(Category, on_delete = models.CASCADE)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    product_description = models.TextField()
    stock = models.PositiveIntegerField()
    title = models.CharField(max_length=200)
    thumbnail = models.TextField()
    upc = models.CharField(max_length=50)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ('title',)