from mongoengine import Document, StringField, ListField, DictField, DateField

class Stock(Document):
    meta = {'collection': 'procurement'}

    supplier = StringField(required=True)
    cost = StringField(required=True)
    procurement_date = DateField(required=True)
    items = ListField(DictField(), required=True)  # List of item dictionaries with item_name and quantity
