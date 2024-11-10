from mongoengine import Document, StringField, IntField, FloatField, DateField

class Stock(Document):
    meta = {'collection': 'procurement'}

    item_name = StringField(required=True)
    supplier = StringField(required=True)
    quantity = IntField(required=True)
    cost = FloatField(required=True)
    procurement_date = DateField(required=True)