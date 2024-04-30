from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy import create_engine, Column, String, Integer, Boolean, ForeignKey

engine = create_engine('sqlite:///db.db', echo=True)

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)
    surname = Column(String)
    number = Column(String)
    email = Column(String)
    password = Column(String)
    isAdmin = Column(Boolean, default=False)

class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)
    description = Column(String)
    cost = Column(Integer)
    image = Column(String)
    buyed = Column(Boolean, default=False)
    categoryId = Column(Integer, ForeignKey('category.id'))
    buyerId = Column(Integer, ForeignKey('users.id'))

class Buys(Base):
    __tablename__ = 'buys'

    id = Column(Integer, primary_key=True, autoincrement=True)
    buyerId = Column(Integer, ForeignKey('users.id'))
    buysId = Column(Integer, ForeignKey('products.id'))
    
class Category(Base):
    __tablename__ = 'category'
    
    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)

# Создание таблиц в базе данных
Base.metadata.create_all(engine)

# Создание сессии для работы с базой данных
Session = sessionmaker(bind=engine)
session = Session()