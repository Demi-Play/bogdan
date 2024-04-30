from flask import Flask, jsonify, request
from db import User, Product, Category, Buys
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import datetime as datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.db'
DB = SQLAlchemy(app)
CORS(app)

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE'
    return response

@app.route('/', methods=['GET'])
def get_users():
    users = DB.session.query(User).all()
    user_list = []
    for user in users:
        user_dict = {
            'id': user.id,
            'name': user.name,
            'surname': user.surname,
            'number': user.number,
            'isAdmin': user.isAdmin,
            'email': user.email,
        }
        user_list.append(user_dict)
    return jsonify(user_list)

@app.route('/users/<int:user_id>', methods=['GET', 'DELETE'])
def get_delete_user(user_id):
    user = DB.session.query(User).filter_by(id=user_id).first()
    if not user:
        return jsonify({'message': 'Пользователь не найден'}), 404
    if request.method == 'GET':
        return jsonify(user.__dict__)
    elif request.method == 'DELETE':
        DB.session.delete(user)
        DB.session.commit()
        return jsonify({'message': 'Пользователь удален'})
    else:
        return jsonify({'msg': 400})

@app.route('/reg', methods=['POST'])
def reg_user():
    data = request.get_json()
    new_user = User(name=data['name'], surname=data['surname'], number=data['number'], email=data['email'], password=data['password'])
    DB.session.add(new_user)
    DB.session.commit()
    return jsonify({'id': new_user.id})

@app.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    user = DB.session.query(User).filter_by(email=data['email'], password=data['password']).first()
    if user:
        if user.isAdmin == True:
            return jsonify({'id': user.id, 'email': user.email, 'password': user.password, 'isAdmin': True})
        else:
            return jsonify({'id': user.id, 'email': user.email, 'password': user.password})
    else:
        return jsonify({'message': 0})

@app.route('/products', methods=['GET'])
def get_products():
    products = DB.session.query(Product).all()
    product_list = []
    for product in products:
        products_dict = {
            'id': product.id,
            'categoryId': product.categoryId,
            'buyerId': product.buyerId,
            'name': product.name,
            'description': product.description,
            'cost': product.cost,
            'image': product.image,
            'buyed': product.buyerId,
        }
        product_list.append(products_dict)
    return jsonify(product_list)

@app.route('/product/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = DB.session.query(Product).filter_by(id=product_id).first()
    if product is not None:
        return jsonify({
            'buyerId': product.buyerId,
            'categoryId': product.categoryId,
            'name': product.name,
            'description': product.description,
            'cost': product.cost,
            'image': product.image
        })
    else:
        return jsonify({'error': 'Product not found'}), 404

@app.route('/product', methods=['POST'])
def create_product():
    data = request.get_json()
    required_fields = ['buyerId', 'categoryId', 'name', 'description', 'cost', 'image']

    if all(field in data for field in required_fields):
        new_product = Product(
            buyerId=data['buyerId'],
            categoryId=data['categoryId'],
            name=data['name'],
            description=data['description'],
            cost=data['cost'],
            image=data['image'],
        )
        DB.session.add(new_product)
        DB.session.commit()
        return jsonify({'message': 'Продукт успешно добавлен'})
    else:
        return jsonify({'error': 'Отсутствуют необходимые поля в данных'}), 400

@app.route('/product/<int:id>', methods=['PUT'])
def update_product(id):
    data = request.get_json()
    product = DB.session.query(Product).filter_by(id=id).first()
    if product:
        product.buyerId = data.get('buyerId', product.buyerId)
        product.categoryId = data.get('categoryId', product.categoryId)
        product.name = data.get('name', product.name)
        product.description = data.get('description', product.description)
        product.cost = data.get('cost', product.cost)
        product.image = data.get('image', product.image)

        DB.session.commit()
        return jsonify({'message': 'Продукт успешно обновлен'})
    else:
        return jsonify({'error': 'Продукт не найден'}), 404

@app.route('/product/<int:id>/sing', methods=['PUT'])
def update_product_buy(id):
    data = request.get_json()
    product = DB.session.query(Product).filter_by(id=id).first()
    if product:
        product.buyerId = data['buyerId']
        product.buyed = data['buyed']
        DB.session.commit()
        return jsonify({'message': 'Продукт успешно куплен'})
    else:
        return jsonify({'error': 'Продукт не найден'}), 404


@app.route('/product/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    product = DB.session.query(Product).filter_by(id=product_id).first()
    
    if product:
        DB.session.delete(product)
        DB.session.commit()
        return jsonify({'message': 'Product successfully deleted'})
    else:
        return jsonify({'error': 'Product not found'}), 404


# Создание маршрута для получения всех категорий
@app.route('/categories', methods=['GET'])
def get_categories():

    categories = DB.session.query(Category).all()
    categories_list = []
    for category in categories:
        categories_dict = {
            'id': category.id,
            'name': category.name,
            'description': category.description,
        }
        categories_list.append(categories_dict)
    return jsonify(categories_list)

# Добавление новой категории
@app.route('/categories', methods=['POST'])
def add_category():
    data = request.get_json()
    new_category = Category(name=data['name'], description=data['description'])
    DB.session.add(new_category)
    DB.session.commit()
    return jsonify({'message': 'Category added successfully'})

# Обновление категории
@app.route('/categories/<int:category_id>', methods=['PUT'])
def update_category(category_id):
    data = request.get_json()
    category = DB.session.query(Category).filter_by(id=category_id).first()
    category.name = data['name']
    category.description = data['description']
    DB.session.commit()
    return jsonify({'message': 'Category updated successfully'})

# Удаление категории
@app.route('/categories/<int:category_id>', methods=['DELETE'])
def delete_category(category_id):
    category = DB.session.query(Category).filter_by(id=category_id).first()
    DB.session.delete(category)
    DB.session.commit()
    return jsonify({'message': 'Category deleted successfully'})

# Создание маршрута для получения всех покупок
@app.route('/categories/<int:userId>', methods=['GET'])
def get_buys(userId):

    categories = DB.session.query(Buys).all()
    categories_list = []
    for category in categories:
        categories_dict = {
            'id': category.id,
            'name': category.name,
            'description': category.description,
        }
        categories_list.append(categories_dict)
    return jsonify(categories_list)

# Добавление новой покупки
@app.route('/categories', methods=['POST'])
def add_buys():
    data = request.get_json()
    new_category = Buys(name=data['name'], description=data['description'])
    DB.session.add(new_category)
    DB.session.commit()
    return jsonify({'message': 'Buys added successfully'})

# Обновление покупки
@app.route('/categories/<int:userId>', methods=['PUT'])
def update_buys(userId):
    data = request.get_json()
    category = DB.session.query(Buys).filter_by(userId=userId).first()
    category.name = data['name']
    category.description = data['description']
    DB.session.commit()
    return jsonify({'message': 'Buys updated successfully'})

# Удаление покупки
@app.route('/categories/<int:category_id>/<int:buys_id>', methods=['DELETE'])
def delete_buys(category_id, buys_id):
    category = DB.session.query(Buys).filter_by(userId=category_id, buys_id=buys_id).first()
    DB.session.delete(category)
    DB.session.commit()
    return jsonify({'message': 'Buys deleted successfully'})

if __name__ == '__main__':
    with app.app_context():
        DB.create_all()
        DB.session.close()
        app.run(debug=True)