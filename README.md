# lootandlevel
## > Loot And Level Online

This is a 2D game based on the nengi-2d-csp template including lag compensation techniques and PIXI.js for rendering.

nengi client side prediction includes:
- predicted movement
- predicted shots
- reconciliation from incorrect movement
- rewind-style lag compensation of shots on the server
- server-side smoothed movement via two entities per client (only applies during severe lag)
- interpolation

To run the game:
```sh
# Install dependencies
npm install

# Start development server (client and server)
npm start

# visit http://localhost:8080
```

The controls are
- arrowkeys or...
- w - up
- a - left
- s - down
- d - right
- mousemove - look around
- mouseclick - shoot

## Bots
There are bots programmed to run around randomly in the game. To connect the bots keep the game running as done with `npm start` and then open an additional command prompt.
```sh
> node bot/index.js
```