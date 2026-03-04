import uuid
from sqlalchemy import Column, String, Numeric, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func

from app.models.base import Base


class Employee(Base):
    __tablename__ = "employees"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)

    email = Column(String(255), unique=True, index=True)

    department = Column(String(100), index=True)
    job_title = Column(String(100))
    location = Column(String(100))

    salary = Column(Numeric(12, 2))
    hired_at = Column(TIMESTAMP)
    status = Column(String(20), default="active")

    created_at = Column(TIMESTAMP, server_default=func.now())