# MLX

The ManiaLink + JSX runtime.

## HUH?

<!-- deno-fmt-ignore -->
```tsx
import { Frame, Label, ManiaLink, Quad, render } from 'mlx';

function App() {
  const foo = 2 + 2;

  return (
    <>
      <ManiaLink version='3'>
        <Label text={foo.toString()} />
        <Frame
          pos='10 10'
          z-index='0'
        >
          <Quad
            size='10 10'
            bgcolor='F00A'
          />
          <Quad
            pos='-10 0'
            zIndex='0'
            size='10 10'
            bgcolor='00FA'
          />
        </Frame>
      </ManiaLink>
    </>
  );
}

const xml = render(<App />);
```

## How

- Deno has a neat API for transforming JSX.
- MLX is just Preact.
