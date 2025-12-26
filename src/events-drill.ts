import EventEmitter from 'events';

// 1. Create a Custom Emitter
class PizzaShop extends EventEmitter {
  order(size: string, topping: string) {
    console.log(`\n📣 New Order: ${size} ${topping} pizza!`);
    // FIRE THE EVENT! ('order-placed')
    // We pass data (size, topping) to anyone listening.
    this.emit('order-placed', size, topping);
  }
}

const shop = new PizzaShop();

// 2. Setup Listeners (What happens when the event fires?)

// Listener A: The Chef
shop.on('order-placed', (size, topping) => {
  console.log(`👨‍🍳 Chef: Started baking the ${size} ${topping} pizza.`);
});

// Listener B: The Cashier
shop.on('order-placed', (size) => {
  console.log(`💰 Cashier: Added ${size} pizza to the bill.`);
});

// Listener C: One-time listener (Only runs once)
shop.once('order-placed', () => {
  console.log("🎉 First customer of the day! (Free drink)");
});

// 3. Trigger Events
shop.order('Large', 'Pepperoni');
shop.order('Medium', 'Veggie');
shop.order('Small', 'Cheese');
