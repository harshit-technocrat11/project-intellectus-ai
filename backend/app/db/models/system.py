import uuid
from sqlalchemy import Column, Text, Numeric, TIMESTAMP, Integer, JSON
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from sqlalchemy.sql import func

from app.models.base import Base


class ChatSession(Base):
    __tablename__ = "chat_sessions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), nullable=True)
    created_at = Column(TIMESTAMP, server_default=func.now())


class QueryLog(Base):
    __tablename__ = "query_logs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    session_id = Column(UUID(as_uuid=True))
    user_id = Column(UUID(as_uuid=True), nullable=True)

    query_text = Column(Text)
    route_type = Column(Text)

    generated_sql = Column(Text, nullable=True)
    tables_used = Column(ARRAY(Text), nullable=True)

    latency_ms = Column(Integer)
    confidence_score = Column(Numeric)

    evaluation_json = Column(JSON)
    visualization_type = Column(Text, nullable=True)

    created_at = Column(TIMESTAMP, server_default=func.now())