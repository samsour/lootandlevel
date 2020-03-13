# lootandlevel
## > Loot And Level Online

To run the game:
```sh
# Install dependencies
npm install

# Start development server (client and server)
npm start

# visit http://localhost:8080
```

```sh
# Generate class diagram
npx arkit
```

Controls:
- arrowkeys or...
- w - up
- a - left
- s - down
- d - right

Implemented in the future:
- mousemove - look around
- mouseclick - shoot

## Bots
There will be bots programmed to run around randomly in the game. To connect the bots keep the game running as done with `npm start` and then open an additional command prompt.
```sh
> node bot/index.js
```