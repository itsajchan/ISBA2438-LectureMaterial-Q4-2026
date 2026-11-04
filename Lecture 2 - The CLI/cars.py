class Car:
    def __init__(self, make, model, year, color, price):
        self.make = make
        self.model = model
        self.year = year
        self.color = color
        self.price = price

    def __str__(self):
        return f"{self.year} {self.make} {self.model} ({self.color}) - ${self.price:,.2f}"

    def drive(self, speed=60):
        print(f"The {self.model} is driving at {speed} mph.")

    def park(self):
        print(f"The {self.model} is parked.")

    def fart(self):
        print(f"Pfffrrrt... the {self.model} blames the passenger seat.")

    def honk(self):
        print(f"BEEP BEEP! The {self.model} honks.")

    def open_frunk(self):
        print(f"The {self.model}'s front trunk is open.")


model_s = Car("Tesla", "Model S", 2024, "Pearl White", 74990)
model_3 = Car("Tesla", "Model 3", 2024, "Midnight Silver", 38990)
model_x = Car("Tesla", "Model X", 2024, "Deep Blue", 84990)
model_y = Car("Tesla", "Model Y", 2024, "Solid Black", 44990)
cybertruck = Car("Tesla", "Cybertruck", 2024, "Stainless Steel", 79990)

if __name__ == "__main__":
    import fire

    fire.Fire({
        "Car": Car,
        "model_s": model_s,
        "model_3": model_3,
        "model_x": model_x,
        "model_y": model_y,
        "cybertruck": cybertruck,
    })
