"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";

// `time` is the stopwatch reading in seconds.
export type Result = { won: boolean; cleared: number; total: number; time: number };

// 83.456 -> "1:23.45"
export function formatTime(seconds: number) {
  const cs = Math.floor(seconds * 100);
  const m = Math.floor(cs / 6000);
  const s = Math.floor((cs % 6000) / 100);
  return `${m}:${String(s).padStart(2, "0")}.${String(cs % 100).padStart(2, "0")}`;
}

const LIVES = 3;
const PADDLE_H = 10;
const PADDLE_BOTTOM = 20;
const BALL_R = 7;
const BRICK_H = 28;
const BRICK_PAD_X = 14;
const GAP = 10;
const EDGE = 16;
const MAX_ANGLE = (60 * Math.PI) / 180;
const SERVE_DELAY = 1;
const POP = 0.2;

type Brick = { label: string; style: number; x: number; y: number; w: number; alive: boolean; pop: number };

// Breakout on a canvas, where the bricks are the skill pills.
// Paddle follows the mouse / touch, or the arrow keys / A D. Escape quits.
// A stopwatch runs from the first launch until the game ends.
export function Breakout({
  skills,
  onFinish,
  onQuit,
}: {
  skills: string[];
  onFinish: (result: Result) => void;
  onQuit: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  const [status, setStatus] = useState({ lives: LIVES, cleared: 0 });
  const finish = useEffectEvent(onFinish);
  const quit = useEffectEvent(onQuit);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const css = getComputedStyle(canvas);
    const token = (name: string) => css.getPropertyValue(name).trim();
    const c = {
      bg: token("--background"),
      fg: token("--foreground"),
      muted: token("--muted"),
      line: token("--line"),
      accent: token("--accent"),
      onAccent: token("--on-accent"),
    };
    // Same four looks as the pills shown before the game starts.
    const brickStyles = [
      { fill: c.bg, text: c.fg, stroke: c.line },
      { fill: c.fg, text: c.bg, stroke: null },
      { fill: c.bg, text: c.fg, stroke: c.line },
      { fill: c.accent, text: c.onAccent, stroke: null },
    ];
    const family = css.fontFamily;
    let fontPx = 14;
    const font = () => `600 ${fontPx}px ${family}`;

    let W = 0;
    let H = 0;
    const bricks: Brick[] = skills.map((label, i) => ({
      label,
      style: i % brickStyles.length,
      x: 0,
      y: 0,
      w: 0,
      alive: true,
      pop: 0,
    }));

    // Wraps the bricks into centred rows from the top, shrinking the text if they'd take up too much of the court.
    const layout = () => {
      for (fontPx = 14; ; fontPx--) {
        ctx.font = font();
        const rows: Brick[][] = [[]];
        let rowW = 0;
        for (const brick of bricks) {
          brick.w = Math.ceil(ctx.measureText(brick.label).width) + BRICK_PAD_X * 2;
          const extra = rows.at(-1)!.length ? GAP + brick.w : brick.w;
          if (rowW + extra > W - EDGE * 2 && rows.at(-1)!.length) {
            rows.push([brick]);
            rowW = brick.w;
          } else {
            rows.at(-1)!.push(brick);
            rowW += extra;
          }
        }
        const bottom = EDGE + rows.length * (BRICK_H + GAP);
        if (bottom <= H * 0.55 || fontPx <= 11) {
          rows.forEach((row, r) => {
            const total = row.reduce((sum, b) => sum + b.w, 0) + GAP * (row.length - 1);
            let x = (W - total) / 2;
            for (const brick of row) {
              brick.x = x;
              brick.y = EDGE + r * (BRICK_H + GAP);
              x += brick.w + GAP;
            }
          });
          return;
        }
      }
    };

    const paddle = { x: 0, w: 0, target: null as number | null };
    const ball = { x: 0, y: 0, vx: 0, vy: 0, speed: 0 };
    let lives = LIVES;
    let cleared = 0;
    let serveTimer = SERVE_DELAY;
    let over = false;
    let elapsed = 0;
    let timing = false;
    const keys = new Set<"left" | "right">();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      W = rect.width;
      H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paddle.w = Math.max(64, W * 0.16);
      layout();
    };
    resize();
    paddle.x = W / 2 - paddle.w / 2;

    const paddleY = () => H - PADDLE_BOTTOM - PADDLE_H;
    const baseSpeed = () => Math.max(260, H * 0.85);

    // Ball sits on the paddle for a moment, then launches.
    const serve = () => {
      serveTimer = SERVE_DELAY;
      ball.vx = 0;
      ball.vy = 0;
    };

    const launch = () => {
      timing = true;
      const angle = (Math.random() * 2 - 1) * (MAX_ANGLE / 2);
      ball.speed = baseSpeed();
      ball.vx = Math.sin(angle) * ball.speed;
      ball.vy = -Math.cos(angle) * ball.speed;
    };

    const end = (won: boolean) => {
      over = true;
      timing = false;
      finish({ won, cleared, total: bricks.length, time: elapsed });
    };

    const update = (dt: number) => {
      for (const brick of bricks) if (!brick.alive && brick.pop > 0) brick.pop = Math.max(0, brick.pop - dt);

      if (paddle.target !== null) paddle.x = paddle.target - paddle.w / 2;
      if (keys.has("left")) paddle.x -= W * 1.2 * dt;
      if (keys.has("right")) paddle.x += W * 1.2 * dt;
      paddle.x = Math.max(0, Math.min(W - paddle.w, paddle.x));

      if (serveTimer > 0) {
        ball.x = paddle.x + paddle.w / 2;
        ball.y = paddleY() - BALL_R;
        serveTimer -= dt;
        if (serveTimer <= 0) launch();
        return;
      }

      ball.x += ball.vx * dt;
      ball.y += ball.vy * dt;

      if (ball.x < BALL_R) {
        ball.x = BALL_R;
        ball.vx = Math.abs(ball.vx);
      } else if (ball.x > W - BALL_R) {
        ball.x = W - BALL_R;
        ball.vx = -Math.abs(ball.vx);
      }
      if (ball.y < BALL_R) {
        ball.y = BALL_R;
        ball.vy = Math.abs(ball.vy);
      }

      // Paddle: where the ball lands sets the angle it goes back up at.
      const py = paddleY();
      if (
        ball.vy > 0 &&
        ball.y + BALL_R >= py &&
        ball.y - BALL_R <= py + PADDLE_H &&
        ball.x >= paddle.x - BALL_R &&
        ball.x <= paddle.x + paddle.w + BALL_R
      ) {
        const rel = Math.max(-1, Math.min(1, (ball.x - (paddle.x + paddle.w / 2)) / (paddle.w / 2)));
        const angle = rel * MAX_ANGLE;
        ball.vx = Math.sin(angle) * ball.speed;
        ball.vy = -Math.cos(angle) * ball.speed;
        ball.y = py - BALL_R;
      }

      // Bricks: one hit per frame, bounce off whichever side the ball went in least.
      for (const brick of bricks) {
        if (!brick.alive) continue;
        const nx = Math.max(brick.x, Math.min(ball.x, brick.x + brick.w));
        const ny = Math.max(brick.y, Math.min(ball.y, brick.y + BRICK_H));
        if ((ball.x - nx) ** 2 + (ball.y - ny) ** 2 > BALL_R ** 2) continue;

        const overlapX = Math.min(ball.x + BALL_R - brick.x, brick.x + brick.w - (ball.x - BALL_R));
        const overlapY = Math.min(ball.y + BALL_R - brick.y, brick.y + BRICK_H - (ball.y - BALL_R));
        if (overlapX < overlapY) ball.vx = ball.x < brick.x + brick.w / 2 ? -Math.abs(ball.vx) : Math.abs(ball.vx);
        else ball.vy = ball.y < brick.y + BRICK_H / 2 ? -Math.abs(ball.vy) : Math.abs(ball.vy);

        brick.alive = false;
        brick.pop = POP;
        cleared += 1;
        // Speed up a touch with every brick, up to a cap.
        const nextSpeed = Math.min(ball.speed * 1.025, baseSpeed() * 1.6);
        ball.vx *= nextSpeed / ball.speed;
        ball.vy *= nextSpeed / ball.speed;
        ball.speed = nextSpeed;
        setStatus({ lives, cleared });
        if (cleared === bricks.length) end(true);
        break;
      }

      if (ball.y - BALL_R > H) {
        lives -= 1;
        setStatus({ lives, cleared });
        if (lives === 0) end(false);
        else serve();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.font = font();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (const brick of bricks) {
        if (!brick.alive && brick.pop === 0) continue;
        const t = brick.alive ? 1 : brick.pop / POP;
        const s = brickStyles[brick.style];
        ctx.save();
        ctx.globalAlpha = t;
        ctx.translate(brick.x + brick.w / 2, brick.y + BRICK_H / 2);
        ctx.scale(0.6 + 0.4 * t, 0.6 + 0.4 * t);
        ctx.beginPath();
        ctx.roundRect(-brick.w / 2, -BRICK_H / 2, brick.w, BRICK_H, BRICK_H / 2);
        ctx.fillStyle = s.fill;
        ctx.fill();
        if (s.stroke) {
          ctx.strokeStyle = s.stroke;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        ctx.fillStyle = s.text;
        ctx.fillText(brick.label, 0, 1);
        ctx.restore();
      }

      ctx.fillStyle = c.accent;
      ctx.beginPath();
      ctx.roundRect(paddle.x, paddleY(), paddle.w, PADDLE_H, PADDLE_H / 2);
      ctx.fill();

      ctx.fillStyle = c.fg;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, BALL_R, 0, Math.PI * 2);
      ctx.fill();
    };

    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      // Clamp the step so switching tabs doesn't teleport the ball.
      const real = (now - last) / 1000;
      const dt = Math.min(real, 1 / 30);
      last = now;
      // The stopwatch uses real time so slow devices aren't timed slower, but ignores long gaps like a hidden tab.
      if (timing) elapsed += Math.min(real, 0.25);
      update(dt);
      // Written straight to the DOM so the clock doesn't re-render React every frame.
      if (clockRef.current) clockRef.current.textContent = formatTime(elapsed);
      draw();
      if (!over) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const keyFor = (e: KeyboardEvent) =>
      e.key === "ArrowLeft" || e.key === "a" || e.key === "A"
        ? "left"
        : e.key === "ArrowRight" || e.key === "d" || e.key === "D"
          ? "right"
          : null;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") return quit();
      const key = keyFor(e);
      if (!key) return;
      e.preventDefault();
      keys.add(key);
      paddle.target = null;
    };
    const onKeyUp = (e: KeyboardEvent) => {
      const key = keyFor(e);
      if (key) keys.delete(key);
    };
    const onPointer = (e: PointerEvent) => {
      paddle.target = e.clientX - canvas.getBoundingClientRect().left;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    canvas.addEventListener("pointermove", onPointer);
    canvas.addEventListener("pointerdown", onPointer);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      canvas.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("pointerdown", onPointer);
    };
  }, [skills]);

  return (
    <>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Breakout game where the bricks are skills. Move the paddle with the mouse, touch, or the left and right arrow keys."
        className="block size-full cursor-none touch-none"
      />
      <div aria-hidden className="pointer-events-none absolute right-3 bottom-1 font-mono text-xs text-muted tabular-nums">
        {"●".repeat(status.lives) + "○".repeat(LIVES - status.lives)} · {status.cleared}/{skills.length} ·{" "}
        <span ref={clockRef}>{formatTime(0)}</span>
      </div>
      <p className="sr-only" aria-live="polite">
        Lives left: {status.lives}. Skills broken: {status.cleared} of {skills.length}.
      </p>
    </>
  );
}
