import random
import uuid
from datetime import datetime, timedelta

from faker import Faker
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.business import Supplier, Product, Order, OrderItem, Refund, Transaction
from app.models.people import Employee

fake = Faker()

# ---------- CONFIG ----------
NUM_SUPPLIERS = 20
NUM_PRODUCTS = 100
NUM_EMPLOYEES = 50
NUM_ORDERS = 3000


# ---------- HELPERS ----------

def random_past_date(days=365):
    return datetime.now() - timedelta(days=random.randint(0, days))


# ---------- SEED FUNCTION ----------

def seed_database():
    db: Session = SessionLocal()

    print("Seeding suppliers...")
    suppliers = []
    locations = [
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Bhubaneswar",
    "Pune"
    ]

    for _ in range(NUM_SUPPLIERS):
        supplier = Supplier(
            name=fake.company(),
            location=random.choice(locations),
            rating=round(random.uniform(3.0, 5.0), 2),
        )
        db.add(supplier)
        suppliers.append(supplier)

    db.commit()

    print("Seeding products...")
    categories = ["Electronics", "Clothing", "Home", "Sports"]

    products = []
    for _ in range(NUM_PRODUCTS):
        product = Product(
            name=fake.word().capitalize(),
            category=random.choice(categories),
            price=round(random.uniform(500, 50000), 2),
            supplier_id=random.choice(suppliers).id,
        )
        db.add(product)
        products.append(product)

    db.commit()

    print("Seeding employees...")
    departments = ["Engineering", "Sales", "HR", "Finance"]

    for _ in range(NUM_EMPLOYEES):
        dept = random.choice(departments)

        base_salary = {
            "Engineering": random.randint(80000, 160000),
            "Sales": random.randint(60000, 120000),
            "HR": random.randint(50000, 90000),
            "Finance": random.randint(70000, 130000),
        }

        employee = Employee(
            name=fake.name(),
            department=dept,
            job_title=fake.job(),
            location=random.choice(locations),
            salary=base_salary[dept],
            hired_at=random_past_date(1000),
            status="active",
        )

        db.add(employee)

    db.commit()

    print("Seeding orders + transactions...")
    for _ in range(NUM_ORDERS):

        order_date = random_past_date(365)

        order = Order(
            total_amount=0,
            status="completed",
            created_at=order_date,
        )

        db.add(order)
        db.flush()  # to get order.id

        total = 0

        # each order has 1–3 items
        for _ in range(random.randint(1, 3)):
            product = random.choice(products)
            quantity = random.randint(1, 3)
            total += product.price * quantity

            order_item = OrderItem(
                order_id=order.id,
                product_id=product.id,
                quantity=quantity,
                unit_price=product.price,
            )

            db.add(order_item)

        order.total_amount = total

        # Transaction
        payment_method = random.choice(["Card", "UPI", "NetBanking"])
        status = "success" if random.random() > 0.05 else "failed"

        transaction = Transaction(
            order_id=order.id,
            payment_method=payment_method,
            status=status,
            amount=total,
            processed_at=order_date,
        )

        db.add(transaction)

        # Refund logic (Electronics higher rate)
        if random.random() < 0.08:
            refund = Refund(
                order_id=order.id,
                amount=round(total * random.uniform(0.5, 1.0), 2),
                created_at=order_date + timedelta(days=5),
            )
            db.add(refund)

    db.commit()
    db.close()

    print("Database seeding completed!")


if __name__ == "__main__":
    seed_database()