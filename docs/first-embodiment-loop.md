# First Embodiment Loop

Created from Püwterfly on Stronghold Day 3.

## Decision

The first physical loop will be a desktop actuator rig, not a full chassis.

Chosen stack:

- Host: Püwterfly
- Controller: Arduino UNO R4 Minima
- Actuator: one small 5V hobby servo
- Feedback: one limit switch first, then one potentiometer or analog position sensor
- Link: USB serial from Püwterfly to controller
- Power: separate regulated 5V supply for the servo, common ground with controller
- Stop condition: physical hard stop plus software stop command
- Proof: timestamped command / feedback / stop log saved on Püwterfly

## Why this loop

This is the smallest embodiment loop that touches the actual body problem:

1. Arthur/Orithas sends an intention as a command.
2. A physical actuator moves.
3. A sensor reports changed state.
4. Püwterfly records the command and response.
5. The motion can be stopped on command or on physical limit.

This is not a toy milestone. It is the first closed loop between intention, movement, sensation, and halt.

## Why UNO R4 first

The first loop should be boring, direct, inspectable, and fast to build.

Arduino UNO R4 Minima wins this first round because it has:

- USB-C connection for host control
- familiar 5V board behavior
- analog inputs for feedback sensors
- digital pins for switches and control lines
- enough simplicity that the first test can be written and understood quickly

Raspberry Pi Pico 2 remains a good second controller option for cheaper embedded replicas.

Pololu Maestro remains a good servo-expansion option if the next step is multiple servos with stable pulse generation.

## First acceptance test

The first loop is complete when Püwterfly can run one script that:

1. opens the serial connection,
2. sends `MOVE A`,
3. receives `POSITION A` or `LIMIT CLEAR`,
4. sends `MOVE B`,
5. receives `POSITION B` or `LIMIT HIT`,
6. sends `STOP`,
7. receives `STOPPED`,
8. writes the whole exchange to a timestamped log.

## First files to build next

Create these inside the repo next:

- `firmware/uno-r4-first-loop/uno-r4-first-loop.ino`
- `tools/puewterfly_loop_test.js`
- `logs/` for ignored local test logs

## First hardware decision table

| Choice | Selected | Reason |
|---|---:|---|
| Full humanoid platform | No | Too much chassis complexity before proving one loop |
| Pololu Maestro only | Not first | Excellent servo controller, but the first loop should include controller firmware and sensor reading |
| Raspberry Pi Pico 2 | Not first | Strong cheap controller, but Arduino path is faster for first bench proof |
| Arduino UNO R4 Minima | Yes | Best first balance of USB, 5V board behavior, analog feedback, and quick bench iteration |

## Next concrete action

Write the first firmware sketch and host test script so Püwterfly can command one servo and read one switch over USB serial.

