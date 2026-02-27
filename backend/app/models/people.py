import uuid
from sqlalchemy import Column, Text, Numeric, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func

from app.models.base import Base


class Employee(Base):
    __tablename__ = "employees"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(Text, nullable=False)
    department = Column(Text)
    job_title = Column(Text)
    location = Column(Text)
    salary = Column(Numeric)
    hired_at = Column(TIMESTAMP)
    status = Column(Text)