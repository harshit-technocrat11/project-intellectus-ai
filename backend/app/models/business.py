import uuid
from sqlalchemy import (
    Column,
    Text,
    Numeric,
    Integer,
    ForeignKey,
    TIMESTAMP,
    String,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.models.base import Base


# ---------------- SUPPLIERS ----------------

class Supplier(Base):
    __tablename__ = "suppliers"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True)  # Added
    location = Column(String(100))
    category = Column(String(50))
    rating = Column(Numeric(3, 2))
    status = Column(String(20), default="active")
    created_at = Column(TIMESTAMP, server_default=func.now())

    products = relationship("Product", back_populates="supplier", cascade="all, delete")


# ---------------- PRODUCTS ----------------

class Product(Base):
    __tablename__ = "products"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    name = Column(String(255), nullable=False)  # e.g., Galaxy A15
    brand = Column(String(100), index=True)    # e.g., Samsung (NEW)
    category = Column(String(100), index=True)

    price = Column(Numeric(12, 2))
    stock_quantity = Column(Integer, default=0)

    supplier_id = Column(UUID(as_uuid=True), ForeignKey("suppliers.id"))
    created_at = Column(TIMESTAMP, server_default=func.now())

    supplier = relationship("Supplier", back_populates="products")
    order_items = relationship("OrderItem", back_populates="product")


# ---------------- ORDERS ----------------

class Order(Base):
    __tablename__ = "orders"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    total_amount = Column(Numeric(12, 2))
    status = Column(String(50), index=True)
    shipping_city = Column(String(100))
    created_at = Column(TIMESTAMP, server_default=func.now(), index=True)

    items = relationship("OrderItem", back_populates="order")
    transactions = relationship("Transaction", back_populates="order")
    refunds = relationship("Refund", back_populates="order")


# ---------------- ORDER ITEMS ----------------

class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id"))
    product_id = Column(UUID(as_uuid=True), ForeignKey("products.id"))
    quantity = Column(Integer)
    unit_price = Column(Numeric(12, 2))

    order = relationship("Order", back_populates="items")
    product = relationship("Product", back_populates="order_items")


# ---------------- REFUNDS ----------------

class Refund(Base):
    __tablename__ = "refunds"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id"))
    reason = Column(Text)
    amount = Column(Numeric(12, 2))
    created_at = Column(TIMESTAMP, server_default=func.now())

    order = relationship("Order", back_populates="refunds")


# ---------------- TRANSACTIONS ----------------

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id"))

    payment_method = Column(String(50))
    status = Column(String(20))
    amount = Column(Numeric(12, 2))
    processed_at = Column(TIMESTAMP)

    order = relationship("Order", back_populates="transactions")