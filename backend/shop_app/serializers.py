from rest_framework import serializers # type: ignore
from .models import Product, Cart, CartItem
from django.contrib.auth import get_user_model

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id","name","slug","image","description","category","price"]

class DetailedProductSerializer(serializers.ModelSerializer):
    similar_products = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = ["id", "name", "price", "slug", "image", "description", "similar_products"]
    
    # Get products in the same category, excluding current one
    def get_similar_products(self, product):
        products = Product.objects.filter(category=product.category).exclude(id=product.id)
        serializer = ProductSerializer(products, many=True)
        return serializer.data

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    total = serializers.SerializerMethodField()
    
    class Meta:
        model = CartItem
        fields = ["id", "quantity", "product", "total"]
    
    # Calculate total price for this item (price * quantity)
    def get_total(self, cartitem):
        price = cartitem.product.price * cartitem.quantity
        return price

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(read_only=True,many=True)
    sum_total = serializers.SerializerMethodField()
    num_of_items = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ["id","cart_code", "items", "sum_total", "num_of_items","created_at","modified_at"]
    
    # Total price of all items in cart
    def get_sum_total(self, cart):
        items = cart.items.all()
        total = sum([(item.product.price * item.quantity) for item in items])
        return total
    
    # Total number of items in cart
    def get_num_of_items(self, cart):
        items = cart.items.all()
        total = sum([item.quantity for item in items])
        return total

class SimpleCartSerializer(serializers.ModelSerializer):
    num_of_items = serializers.SerializerMethodField()
    class Meta:
        model = Cart
        fields = ["id", "cart_code", "num_of_items"]
    
    # Total number of items in cart
    def get_num_of_items(self, cart):
        items = cart.items.all()
        num_of_items = sum([item.quantity for item in items])
        return num_of_items

class NewCartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    order_id = serializers.SerializerMethodField()
    order_date = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ["id", "product", "quantity", "order_id", "order_date"]
    
    # Get associated cart code as order ID
    def get_order_id(self, cartitem):
        order_id = cartitem.cart.cart_code
        return order_id
    
    # Get last modified date of cart as order date
    def get_order_date(self, cartitem):
        order_date = cartitem.cart.modified_at
        return order_date

class UserSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = ["id", "username", "first_name", "last_name", "email", "city", "state", "address", "phone", "items"]
    
    # Get up to 10 most recent purchased items
    def get_items(self, user):
        cartitems = CartItem.objects.filter(cart__user=user, cart__paid=True)[:10]
        serializer = NewCartItemSerializer(cartitems,many=True)
        return serializer.data

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = get_user_model()
        fields = ['username', 'email', 'password', 'first_name', 'last_name', 'phone', 'address', 'city', 'state']
    
    # Create a new user using custom user model
    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        return user