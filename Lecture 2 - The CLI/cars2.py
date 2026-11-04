import argparse


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

    def describe(self):
        print(self)


CARS = {
    "model_s": Car("Tesla", "Model S", 2024, "Pearl White", 74990),
    "model_3": Car("Tesla", "Model 3", 2024, "Midnight Silver", 38990),
    "model_x": Car("Tesla", "Model X", 2024, "Deep Blue", 84990),
    "model_y": Car("Tesla", "Model Y", 2024, "Solid Black", 44990),
    "cybertruck": Car("Tesla", "Cybertruck", 2024, "Stainless Steel", 79990),
}

COMMANDS = ["drive", "park", "fart", "honk", "open_frunk", "describe"]


def run_command(car, command, speed=60):
    if command == "drive":
        car.drive(speed)
    elif command == "park":
        car.park()
    elif command == "fart":
        car.fart()
    elif command == "honk":
        car.honk()
    elif command == "open_frunk":
        car.open_frunk()
    elif command == "describe":
        car.describe()


def interactive_menu():
    print("Welcome to the Tesla CLI (type 'quit' to exit)")
    while True:
        print("\nAvailable cars:", ", ".join(sorted(CARS)))
        name = input("Pick a car: ").strip().lower()
        if name == "quit":
            print("Goodbye!")
            break
        if name not in CARS:
            print(f"Unknown car: {name}")
            continue
        car = CARS[name]
        while True:
            command = input(f"  Command for {car.model} {COMMANDS + ['back']}: ").strip().lower()
            if command == "back":
                break
            if command == "quit":
                return
            if command not in COMMANDS:
                print(f"Unknown command: {command}")
                continue
            run_command(car, command)


def main():
    parser = argparse.ArgumentParser(description="Tesla car CLI (standard library)")
    parser.add_argument("car", nargs="?", choices=sorted(CARS), help="car to interact with")
    parser.add_argument("command", nargs="?", choices=COMMANDS, help="action to perform")
    parser.add_argument("--speed", type=int, default=60, help="speed for the drive command")
    parser.add_argument("--menu", action="store_true", help="launch the interactive menu")
    args = parser.parse_args()

    if args.menu or (args.car is None and args.command is None):
        interactive_menu()
    elif args.car and args.command:
        run_command(CARS[args.car], args.command, args.speed)
    else:
        parser.error("provide both a car and a command, or neither for the interactive menu")


if __name__ == "__main__":
    main()
