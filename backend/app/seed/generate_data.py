import random
from datetime import datetime, timedelta
from decimal import Decimal

from faker import Faker
from sqlalchemy.orm import Session
from tqdm import tqdm

from app.core.database import SessionLocal
from app.models.business import (
    Supplier,
    Product,
    Order,
    OrderItem,
    Refund,
    Transaction,
)
from app.models.people import Employee


fake = Faker("en_IN")


# ---------------- FINAL LOCKED CONFIG ----------------

NUM_SUPPLIERS = 25
NUM_EMPLOYEES = 150
NUM_ORDERS = 3500

PRODUCT_DISTRIBUTION = {
    "Electronics": 200,
    "Clothing": 150,
    "Home & Kitchen": 150,
    "Sports": 100,
}

CITIES = ["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Bhubaneswar"]


# ---------------- PRODUCT DEFINITIONS ----------------

electronics_brands = ["Samsung", "Apple", "Sony", "Boat", "Dell", "HP"]
electronics_products = {
    "Smartphone": (15000, 90000),
    "Laptop": (35000, 120000),
    "Headphones": (1500, 15000),
    "Smartwatch": (3000, 25000),
    "Tablet": (12000, 60000),
    "Ear Buds": (12000, 60000),
}

clothing_brands = ["Levi's", "Nike","Allen Solly","Converse", "Adidas", "H&M", "Zara", "Puma","Blackberry's"]
clothing_products = {
    "T-Shirt": (500, 3000),
    "Jeans": (1500, 6000),
    "Jacket": (2000, 10000),
    "Sweatshirt": (1200, 5000),
    "Kurta": (800, 4000),
    "Kurti": (800, 4000),
    "Blazer Set": (4000, 15000),
    "Track Pants":(800, 3000),
    "Sports T-shirt":(800, 3500),
}

home_brands = ["Prestige", "Philips", "Bajaj", "Havells", "LG"]
home_products = {
    "Mixer Grinder": (2000, 8000),
    "Cookware Set": (1500, 10000),
    "Induction Cooktop": (2500, 7000),
    "LED Lamp": (300, 2000),
}

sports_brands = ["Nike", "Adidas", "Puma", "SG", "Cosco"]
sports_products = {
    "Football": (500, 4000),
    "Cricket Bat": (1500, 15000),
    "Yoga Mat": (400, 2500),
    "Running shoes": (800, 6000 ),
    "Dumbbells Set": (1000, 6000),
    "Tennis Racket": (1000, 12000),
    "Badminton Racket": (1000, 12000),
    "Basket Ball" : (800, 4500),
    "Volley Ball": (500, 3500),
    
}

CATEGORY_MAP = {
    "Electronics": (electronics_brands, electronics_products),
    "Clothing": (clothing_brands, clothing_products),
    "Home & Kitchen": (home_brands, home_products),
    "Sports": (sports_brands, sports_products),
}


# ---------------- JOB STRUCTURE ----------------

JOB_STRUCTURE = {
    "Product & Technology": [
        "Backend Engineer",
        "Frontend Engineer",
        "Full Stack Developer",
        "Data Engineer",
        "AI/ML Engineer",
        "Product Manager",
        "QA Automation Engineer",
        "DevOps Engineer",
    ],
    "Supply Chain & Operations": [
        "Operations Manager",
        "Supply Chain Analyst",
        "Warehouse Operations Lead",
        "Procurement Specialist",
        "Logistics Coordinator",
    ],
    "Marketplace Growth": [
        "Growth Marketing Manager",
        "Performance Marketing Specialist",
        "SEO Manager",
        "Business Development Executive",
    ],
    "Customer Experience": [
        "Customer Support Executive",
        "CX Operations Manager",
        "Escalation Specialist",
        "Customer Success Manager",
    ],
    "Finance & Compliance": [
        "Financial Analyst",
        "Accounts Manager",
        "Compliance Officer",
        "Revenue Operations Analyst",
    ],
}

SALARY_RANGES = {
    "Product & Technology": (90000, 160000),
    "Supply Chain & Operations": (60000, 110000),
    "Marketplace Growth": (70000, 130000),
    "Customer Experience": (50000, 90000),
    "Finance & Compliance": (80000, 140000),
}


# ---------------- HELPERS ----------------

def random_past_date(days=365):
    return datetime.now() - timedelta(days=random.randint(0, days))


def seasonal_multiplier(date_obj):
    if date_obj.month in [11, 12]:
        return Decimal("1.3")
    return Decimal("1.0")


# ---------------- SEED FUNCTION ----------------

def seed_database():
    db: Session = SessionLocal()

    print("\nSeeding suppliers...")
    suppliers = []
    for _ in tqdm(range(NUM_SUPPLIERS), desc="Suppliers"):
        supplier = Supplier(
            name=fake.company(),
            email=fake.company_email(),
            location=random.choice(CITIES),
            category=random.choice(list(PRODUCT_DISTRIBUTION.keys())),
            rating=Decimal(str(round(random.uniform(3.5, 5.0), 2))),
            status="active",
        )
        db.add(supplier)
        suppliers.append(supplier)

    db.commit()

    print("\nSeeding products...")
    products = []

    for category, count in PRODUCT_DISTRIBUTION.items():
        brands, product_types = CATEGORY_MAP[category]

        for _ in tqdm(range(count), desc=f"{category}"):
            product_type = random.choice(list(product_types.keys()))
            brand = random.choice(brands)

            min_price, max_price = product_types[product_type]
            price = Decimal(str(random.randint(min_price, max_price)))

            product = Product(
                name=f"{product_type} {random.randint(100,999)}",
                brand=brand,
                category=category,
                price=price,
                stock_quantity=random.randint(20, 500),
                supplier_id=random.choice(suppliers).id,
            )

            db.add(product)
            products.append(product)

    db.commit()

    print("\nSeeding employees...")
    departments = list(JOB_STRUCTURE.keys())

    for _ in tqdm(range(NUM_EMPLOYEES), desc="Employees"):
        dept = random.choice(departments)
        min_sal, max_sal = SALARY_RANGES[dept]

        first = fake.first_name()
        last = fake.last_name()

        employee = Employee(
            first_name=first,
            last_name=last,
            email=f"{first.lower()}.{last.lower()}@company.in",
            department=dept,
            job_title=random.choice(JOB_STRUCTURE[dept]),
            location=random.choice(CITIES),
            salary=Decimal(str(random.randint(min_sal, max_sal))),
            hired_at=random_past_date(1200),
            status="active",
        )

        db.add(employee)

    db.commit()

    print("\nSeeding orders...")
    for _ in tqdm(range(NUM_ORDERS), desc="Orders"):
        order_date = random_past_date(365)
        season_factor = seasonal_multiplier(order_date)

        order = Order(
            total_amount=Decimal("0.00"),
            status="completed",
            shipping_city=random.choice(CITIES),
            created_at=order_date,
        )

        db.add(order)
        db.flush()

        total = Decimal("0.00")

        for _ in range(random.randint(1, 3)):
            product = random.choice(products)
            quantity = random.randint(1, 3)

            item_total = product.price * Decimal(quantity) * season_factor
            total += item_total

            db.add(
                OrderItem(
                    order_id=order.id,
                    product_id=product.id,
                    quantity=quantity,
                    unit_price=product.price,
                )
            )

        order.total_amount = total.quantize(Decimal("0.01"))

        db.add(
            Transaction(
                order_id=order.id,
                payment_method=random.choice(["Card", "UPI", "NetBanking"]),
                status="success" if random.random() > 0.05 else "failed",
                amount=order.total_amount,
                processed_at=order_date,
            )
        )

        if random.random() < 0.07:
            db.add(
                Refund(
                    order_id=order.id,
                    reason=random.choice([
                        "Damaged item",
                        "Wrong product delivered",
                        "Customer changed mind",
                        "Late delivery",
                    ]),
                    amount=(order.total_amount * Decimal("0.7")).quantize(Decimal("0.01")),
                    created_at=order_date + timedelta(days=5),
                )
            )

    db.commit()
    db.close()

    print("\nDatabase seeded successfully!\n")


if __name__ == "__main__":
    seed_database()