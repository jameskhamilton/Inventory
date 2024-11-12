from mongoengine import Document, StringField, ListField, DictField, DateField, FloatField, DateTimeField

class Stock(Document):
    meta = {'collection': 'procurement'}

    supplier = StringField(required=True)
    cost = FloatField(required=True)
    procurement_date = DateField(required=True)
    items = ListField(DictField(), required=True)  # List of item dictionaries with item_name and quantity
    created_at = DateTimeField()