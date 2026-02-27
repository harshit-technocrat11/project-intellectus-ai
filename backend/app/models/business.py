import uuid
from sqlalchemy import Column, Text, Numeric, Integer, ForeignKey, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func

from app.models.base import Base


class Supplier(Base):
    __tablename__ = "suppliers"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(Text, nullable=False)
    location = Column(Text)
    rating = Column(Numeric)
    created_at = Column(TIMESTAMP, server_default=func.now())


class Product(Base):
    __tablename__ = "products"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(Text, nullable=False)
    category = Column(Text)
    price = Column(Numeric)
    supplier_id = Column(UUID(as_uuid=True), ForeignKey("suppliers.id"))
    created_at = Column(TIMESTAMP, server_default=func.now())


class Order(Base):
    __tablename__ = "orders"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    total_amount = Column(Numeric)
    status = Column(Text)
    created_at = Column(TIMESTAMP, server_default=func.now())


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id"))
    product_id = Column(UUID(as_uuid=True), ForeignKey("products.id"))
    quantity = Column(Integer)
    unit_price = Column(Numeric)


class Refund(Base):
    __tablename__ = "refunds"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id"))
    amount = Column(Numeric)
    created_at = Column(TIMESTAMP, server_default=func.now())


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id"))
    payment_method = Column(Text)
    status = Column(Text)
    amount = Column(Numeric)
    processed_at = Column(TIMESTAMP)