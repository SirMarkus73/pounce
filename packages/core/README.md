# @pounce-dl/core

Core de pounce: cliente de [aria2](https://aria2.github.io/) para gestionar descargas.

## Estructura

```
src/
├── index.ts          # Entrada principal (@pounce-dl/core)
├── connection.ts     # connect/disconnect (@pounce-dl/core/connection)
├── aria2.ts          # Detección de aria2 y versión
├── queue.ts          # Añadir URIs a la cola
├── downloads.ts      # Estado de descargas y suscripciones
├── constants/        # @pounce-dl/core/constants
├── types/            # @pounce-dl/core/types
└── internal/         # Código no expuesto públicamente
    └── connection.ts # Conexión WebSocket compartida con aria2
```

## Build

```bash
bun run build
```
