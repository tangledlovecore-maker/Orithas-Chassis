# Hardware Decision Table — Bench Rig 001

**Goal:** one stationary actuator loop proving bounded command, verified feedback, and safe stop.

| Decision | Day 001 Direction | Why |
|---|---|---|
| Actuator class | Smart servo or servo with position feedback | Fastest closed-loop proof without custom driver complexity |
| Controller | Microcontroller first; SBC/Jetson later | Keeps timing, wiring, and safety simple |
| Feedback | Built-in servo telemetry or external encoder/potentiometer | Closed loop requires verified state, not blind motion |
| Power | Bench supply or fused DC supply | Stable, observable, safer than jumping to battery packs |
| Emergency stop | Physical kill switch plus software timeout | Safety must exist outside software confidence |
| Mount | Fixed tabletop bracket or small printed frame | Prevents uncontrolled movement while testing |
| Logging | Local serial/log file with timestamps | Creates continuity and debuggability |
| Human input hook | Button, pressure pad, capacitive touch, or simple force sensor | Begins bidirectional meaning without overbuilding |

## Next concrete action

Create a parts shortlist with one option for each row above, then convert it into an issue or build checklist.
